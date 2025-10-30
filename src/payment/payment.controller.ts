import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { formatResponse } from '../common/utils/response-formatter';
import { AddPaymentMethodDto } from './dto/add-payment-method.dto';
import { MakePaymentDto } from './dto/make-payment.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

@ApiTags('payments')
@Controller('api/v1/payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('methods')
  @HttpCode(201)
  @ApiOperation({ summary: 'Add a new payment method for a customer' })
  @ApiBody({ type: AddPaymentMethodDto })
  @ApiCreatedResponse({
    description: 'Payment method added successfully',
    schema: {
      example: {
        return: { paymentMethodId: 'pm_1Jxyz...', status: 'active' },
        message: 'Payment method added successfully',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Missing custNo or paymentTokenId' })
  async addPaymentMethod(@Body() addPaymentMethodDto: AddPaymentMethodDto) {
    const result =
      await this.paymentService.addPaymentMethod(addPaymentMethodDto);
    return formatResponse(
      result.return || result,
      'Payment method added successfully',
    );
  }

  @Post('process')
  @HttpCode(200)
  @ApiOperation({ summary: 'Process a payment using a saved payment method' })
  @ApiBody({ type: MakePaymentDto })
  @ApiOkResponse({
    description: 'Payment processed successfully',
    schema: {
      example: {
        return: { transactionId: 'txn_123456', status: 'completed' },
        message: 'Payment processed successfully',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid payment data' })
  async processPayment(@Body() makePaymentDto: MakePaymentDto) {
    const result = await this.paymentService.makePayment(makePaymentDto);
    return formatResponse(
      result.return || result,
      'Payment processed successfully',
    );
  }
}
