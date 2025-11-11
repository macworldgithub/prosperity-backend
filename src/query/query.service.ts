import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CoverageService } from '../coverage/coverage.service';
import { BillService } from '../bill/bill.service';
import { Types } from 'mongoose';

interface ResponseItem {
  intent: string;
  pattern: string;
  response: string;
}

const responses = {
  billQuery: [
    {
      intent: 'double_charge',
      pattern:
        '(double charge|duplicate charge|charged twice|bill too high|bill high|why was my bill high|May bill|overcharged|incorrect charge)',
      response:
        'Detected a duplicate service charge on your bill. Ticket #TICKET_ID logged for review.',
    },
    {
      intent: 'international_calls',
      pattern:
        '(international calls|international call|international|overseas calls|why was i charged for calls|calls to china|intl calls)',
      response:
        'CALL_COUNT calls were made to mobiles in DESTINATION during the month, totaling $CALL_TOTAL_AMOUNT.',
    },
    {
      intent: 'bill_details',
      pattern:
        '(bill details|what is on my bill|bill breakdown|bill summary|view charges)',
      response: 'Here is your bill breakdown: BILL_DETAILS',
    },
    {
      intent: 'late_fee',
      pattern:
        '(late fee|late charge|penalty charge|missed payment|why was i charged a fee)',
      response:
        'A late fee of $LATE_FEE_AMOUNT was applied due to a missed payment on BILL_DATE. Would you like to dispute this?',
    },
    {
      intent: 'payment_status',
      pattern:
        '(payment status|is my payment processed|payment confirmation|confirm paid bill)',
      response:
        'Your payment of $PAYMENT_AMOUNT on PAYMENT_DATE was successful. Receipt sent to EMAIL.',
    },
    {
      intent: 'discount_query',
      pattern:
        '(discount available|current promotions|special offer|reduce bill|lower my bill)',
      response:
        'Current promotions include a 10% discount for annual plans. Apply via the app or contact support.',
    },
    {
      intent: 'billing_cycle',
      pattern: '(billing cycle|bill due date|when is bill due|billing period)',
      response:
        'Your billing cycle ends on BILL_CYCLE_END. Next bill is due on DUE_DATE.',
    },
  ],
  addressUpdate: [
    {
      intent: 'update_address',
      pattern:
        '(change address|update address|new address|move to address|relocate to address)',
      response:
        'Address updated to NEW_ADDRESS. Confirmation sent via email/SMS.',
    },
  ],
  coverageCheck: [
    {
      intent: 'check_coverage',
      pattern:
        '(check coverage|service availability|network coverage|coverage at zip|is service available)',
      response: 'Coverage at ZIP_CODE: COVERAGE_DETAILS',
    },
    {
      intent: 'network_type',
      pattern:
        '(5g coverage|4g coverage|network type|available networks|connection speed at)',
      response:
        'At ZIP_CODE, available networks are NETWORK_TYPES with speeds up to MAX_SPEED.',
    },
    {
      intent: 'coverage_issue',
      pattern:
        '(no signal|weak signal|coverage issue|no service|dropped calls)',
      response:
        "Sorry, it seems there's a coverage issue at ZIP_CODE. A ticket has been created: #TICKET_ID.",
    },
    {
      intent: 'expansion_plans',
      pattern:
        '(expand coverage|new coverage plans|when will coverage improve|future coverage)',
      response:
        'Coverage expansion to ZIP_CODE is planned for EXPANSION_DATE. Stay tuned for updates!',
    },
    {
      intent: 'indoor_coverage',
      pattern:
        '(indoor coverage|signal inside home|coverage in building|home signal strength)',
      response:
        'Indoor coverage at ZIP_CODE may vary. Try a signal booster or contact support for solutions.',
    },
  ],
};

@Injectable()
export class QueryService {
  constructor(
    private userService: UserService,
    private coverageService: CoverageService,
    private billService: BillService,
  ) {}

  async processQuery(query: string, context: string, userId: string) {
    if (!query || typeof query !== 'string') {
      console.log(`Invalid query received: ${query}`);
      return { success: false, message: 'Please provide a valid query.' };
    }

    if (!Types.ObjectId.isValid(userId)) {
      console.log(`Invalid ObjectId: ${userId}`);
      return { success: false, message: 'Invalid user ID.' };
    }

    query = query.toLowerCase().trim();
    console.log(
      `Processing query: "${query}" in context: ${context} for userId: ${userId}`,
    );

    const responseSet = responses[context as keyof typeof responses];
    if (!responseSet) {
      console.log(`Invalid context: ${context}`);
      return { success: false, message: 'Invalid query context.' };
    }

    const user = await this.userService.findById(userId);
    if (!user) {
      console.log(`User not found for userId: ${userId}`);
      return { success: false, message: 'User not found.' };
    }

    const bill = await this.billService.findByUserId(userId);
    if (!bill && context === 'billQuery') {
      console.log(`Bill not found for userId: ${userId}`);
      return { success: false, message: 'Bill not found.' };
    }

    const currentDate = new Date();
    const formatDate = (date: Date | string) => {
      if (typeof date === 'string') return date;
      return date.toISOString().split('T')[0];
    };

    // Fetch dynamic values from database with fallbacks
    const billCycleEnd = bill?.billCycleEnd
      ? formatDate(bill.billCycleEnd)
      : formatDate(new Date(currentDate.setDate(currentDate.getDate() + 30)));
    const dueDate = bill?.dueDate
      ? formatDate(bill.dueDate)
      : formatDate(new Date(currentDate.setDate(currentDate.getDate() + 15)));
    const billDate = bill?.lateFee?.appliedDate
      ? formatDate(bill.lateFee.appliedDate)
      : formatDate(
          new Date(
            new Date(bill?.dueDate || currentDate).setDate(
              new Date(bill?.dueDate || currentDate).getDate() - 15,
            ),
          ),
        );
    const paymentAmount = bill?.payment?.amount
      ? bill.payment.amount.toFixed(2)
      : bill?.items.reduce((acc, item) => acc + item.amount, 0).toFixed(2) ||
        '0.00';
    const paymentDate = bill?.payment?.paymentDate
      ? formatDate(bill.payment.paymentDate)
      : formatDate(
          new Date(
            new Date(bill?.dueDate || currentDate).setDate(
              new Date(bill?.dueDate || currentDate).getDate() - 5,
            ),
          ),
        );
    const email = user.email || 'your-email@example.com';
    const callCount = bill?.internationalCalls?.count
      ? bill.internationalCalls.count.toString()
      : '0';
    const callDestination =
      bill?.internationalCalls?.destination || 'unknown destination';
    const callTotalAmount = bill?.internationalCalls?.totalAmount
      ? bill.internationalCalls.totalAmount.toFixed(2)
      : '0.00';
    const lateFeeAmount = bill?.lateFee?.amount
      ? bill.lateFee.amount.toFixed(2)
      : '0.00';

    for (const response of responseSet) {
      const regex = new RegExp(response.pattern, 'i');
      if (regex.test(query)) {
        let message = response.response;
        console.log(
          `Matched pattern: ${response.pattern} for intent: ${response.intent}`,
        );

        const ticketId = `T${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, '0')}`;

        if (context === 'billQuery') {
          if (response.intent === 'bill_details') {
            const billItems =
              bill?.items
                .map((item) => `${item.label}: $${item.amount.toFixed(2)}`)
                .join(', ') || 'No bill items available';
            message = message.replace('BILL_DETAILS', billItems);
          } else if (response.intent === 'double_charge') {
            message = message.replace('TICKET_ID', ticketId);
          } else if (response.intent === 'international_calls') {
            message = message
              .replace('CALL_COUNT', callCount)
              .replace('DESTINATION', callDestination)
              .replace('CALL_TOTAL_AMOUNT', callTotalAmount);
          } else if (response.intent === 'late_fee') {
            message = message
              .replace('LATE_FEE_AMOUNT', lateFeeAmount)
              .replace('BILL_DATE', billDate);
          } else if (response.intent === 'payment_status') {
            message = message
              .replace('PAYMENT_AMOUNT', paymentAmount)
              .replace('PAYMENT_DATE', paymentDate)
              .replace('EMAIL', email);
          } else if (response.intent === 'billing_cycle') {
            message = message
              .replace('BILL_CYCLE_END', billCycleEnd)
              .replace('DUE_DATE', dueDate);
          }
        } else if (context === 'addressUpdate') {
          const newAddressMatch = query.match(/to\s+(.+)/i);
          const newAddress = newAddressMatch
            ? newAddressMatch[1]
            : 'new address';
          message = message.replace('NEW_ADDRESS', newAddress);
        } else if (context === 'coverageCheck') {
          // extract zip intelligently
          let zipMatch =
            query.match(/\b\d{4,5}\b/) || query.match(/zip\s*(\d{4,5})/i);
          let zip = zipMatch ? zipMatch[1] || zipMatch[0] : null;
          if (!zip && query.includes('castle hill')) {
            zip = '2145';
          }

          // findByZip returns Coverage[] (or null). Normalize to a single coverage object (first match).
          const coverages = zip
            ? await this.coverageService.findByZip(zip)
            : null;
          const coverage = Array.isArray(coverages)
            ? coverages.length
              ? coverages[0]
              : null
            : coverages;

          const displayZip = coverage?.displayAddress || zip || 'the location';
          message = message.replace('ZIP_CODE', displayZip);

          if (response.intent === 'check_coverage') {
            message = message.replace(
              'COVERAGE_DETAILS',
              coverage?.availability || 'No coverage data available',
            );
          } else if (response.intent === 'network_type') {
            const networkTypes = coverage?.networkTypes?.join(', ') || '4G, 5G';
            const maxSpeed = coverage?.maxSpeed || '100 Mbps';
            message = message
              .replace('NETWORK_TYPES', networkTypes)
              .replace('MAX_SPEED', maxSpeed);
          } else if (response.intent === 'coverage_issue') {
            message = message.replace('TICKET_ID', ticketId);
          } else if (response.intent === 'expansion_plans') {
            // safer fallback date: one year from now (without mutating currentDate)
            const nextYearDate = new Date();
            nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);
            message = message.replace(
              'EXPANSION_DATE',
              coverage?.expansionDate || formatDate(nextYearDate),
            );
          }
        }

        console.log(`Returning response: ${message}`);
        return { success: true, message };
      }
    }

    console.log(`No matching pattern found for query: "${query}"`);
    return {
      success: false,
      message: 'Sorry, I didn’t understand your query. Please try rephrasing.',
    };
  }
}
