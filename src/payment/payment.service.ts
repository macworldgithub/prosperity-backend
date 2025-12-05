// import { Injectable } from '@nestjs/common';
// import { ApiClientService } from '../api-client/api-client.service';
// import { AppError } from '../common/errors/app-error';
// import { AddPaymentMethodDto } from './dto/add-payment-method.dto';
// import { MakePaymentDto } from './dto/make-payment.dto';
// import { ConfigService } from '@nestjs/config';

// @Injectable()
// export class PaymentService {
//   constructor(
//     private apiClient: ApiClientService,
//     private configService: ConfigService,
//   ) {}

//   async addPaymentMethod(addPaymentMethodDto: AddPaymentMethodDto) {
//     if (!addPaymentMethodDto.custNo || !addPaymentMethodDto.paymentTokenId)
//       throw new AppError(
//         'Customer number and payment token ID are required',
//         400,
//       );
//     return await this.apiClient.apiCall(
//       `/api/v1/group/${this.configService.get('groupNo')}/customer/${addPaymentMethodDto.custNo}/payment-method`,
//       {
//         paymentProvider: 'QS',
//         paymentTokenId: addPaymentMethodDto.paymentTokenId,
//       },
//     );
//   }

//   async makePayment(makePaymentDto: MakePaymentDto) {
//     if (
//       !makePaymentDto.custNo ||
//       !makePaymentDto.amount ||
//       !makePaymentDto.paymentId
//     )
//       throw new AppError('Invalid payment data provided', 400);
//     return await this.apiClient.apiCall(
//       `/api/v1/group/${this.configService.get('groupNo')}/customer/${makePaymentDto.custNo}/transaction/payment/`,
//       {
//         transactionType: 'P',
//         paymentTokenId: makePaymentDto.paymentId,
//         amount: makePaymentDto.amount,
//         receiptEmail: makePaymentDto.email,
//         comment: makePaymentDto.comment,
//         allowDuplicates: true,
//       },
//     );
//   }
// }

import { Injectable } from '@nestjs/common';
import { ApiClientService } from '../api-client/api-client.service';
import { AppError } from '../common/errors/app-error';
import { AddPaymentMethodDto } from './dto/add-payment-method.dto';
import { MakePaymentDto } from './dto/make-payment.dto';
import { ProcessRecurringPaymentDto } from './dto/process-recurring-payment.dto'; // New DTO
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios'; // Add this
import { firstValueFrom } from 'rxjs'; // For handling observables
import { map } from 'rxjs/operators';
import { GoogleSheetsService } from 'src/google-sheets/google-sheets.service';
import { InjectModel } from '@nestjs/mongoose';
import { Payment } from 'src/schemas/payment.schema';
import { Model } from 'mongoose';
import { EmailService } from 'src/common/services/email.service';
@Injectable()
export class PaymentService {
  constructor(
    private apiClient: ApiClientService,
    private configService: ConfigService,
    private httpService: HttpService, // Injected for direct HTTP calls
    private emailService: EmailService,
    private googleSheetsService: GoogleSheetsService, // Injected for direct HTTP calls
    @InjectModel(Payment.name) private paymentModel: Model<Payment>, // ← NEW
  ) {}
  // async addPaymentMethod(addPaymentMethodDto: AddPaymentMethodDto) {
  //   const { custNo, paymentTokenId } = addPaymentMethodDto;

  //   if (!custNo || !paymentTokenId) {
  //     throw new AppError('custNo and paymentTokenId are required', 400);
  //   }

  //   const response = await this.apiClient.apiCall(
  //     `/api/v1/group/${this.configService.get('groupNo')}/customer/${custNo}/payment-method`,
  //     {
  //       paymentProvider: 'QS',
  //       paymentTokenId,
  //     },
  //   );

  //   // SUCCESS: Save paymentTokenId to Google Sheets (Column X = paymentToken)
  //   this.googleSheetsService
  //     .updateCustomerRowByCustNo(custNo, {
  //       paymentTokenId, // This will go to column X
  //     })
  //     .catch((err) => {
  //       console.error('Failed to save payment token to Google Sheets', {
  //         custNo,
  //         paymentTokenId,
  //         error: err.message,
  //       });
  //     });

  //   return response;
  // }

  // async makePayment(makePaymentDto: MakePaymentDto) {
  //   const { custNo, amount, paymentId, email, comment } = makePaymentDto;

  //   if (!custNo || !amount || !paymentId) {
  //     throw new AppError('custNo, amount, and paymentId are required', 400);
  //   }

  //   const response = await this.apiClient.apiCall(
  //     `/api/v1/group/${this.configService.get('groupNo')}/customer/${custNo}/transaction/payment/`,
  //     {
  //       transactionType: 'P',
  //       paymentTokenId: paymentId,
  //       amount,
  //       receiptEmail: email,
  //       comment: comment || 'One-time payment',
  //       allowDuplicates: true,
  //     },
  //   );

  //   // Optional: You can also log this payment in Sheets if you want
  //   // (e.g. add a "Last Payment Date" or "Payment Status" column later)
  //   await this.paymentModel.create({
  //     custNo,
  //     amount: Number(amount), // stored as number (in smallest unit)
  //     paymentTokenId: paymentId,
  //     status: response.status === 'success' ? 'completed' : 'failed', // adjust based on actual response
  //     createdAt: new Date(),
  //   });

  //   return response;
  // }
  async addPaymentMethod(addPaymentMethodDto: AddPaymentMethodDto) {
    try {
      const { custNo, paymentTokenId } = addPaymentMethodDto;

      if (!custNo || !paymentTokenId) {
        throw new AppError('custNo and paymentTokenId are required', 400);
      }

      const response = await this.apiClient.apiCall(
        `/api/v1/group/${this.configService.get('groupNo')}/customer/${custNo}/payment-method`,
        {
          paymentProvider: 'QS',
          paymentTokenId,
        },
      );

      // SUCCESS: Save paymentTokenId to Google Sheets (Column X = paymentToken)
      this.googleSheetsService
        .updateCustomerRowByCustNo(custNo, {
          paymentTokenId, // This will go to column X
        })
        .catch((err) => {
          console.error('Failed to save payment token to Google Sheets', {
            custNo,
            paymentTokenId,
            error: err.message,
          });
        });

      return response;
    } catch (error) {
      await this.emailService.sendFailureEmail(
        'addPaymentMethod',
        error.message || 'Unknown error',
        { addPaymentMethodDto },
      );
      throw error;
    }
  }

  async makePayment(makePaymentDto: MakePaymentDto) {
    try {
      const { custNo, amount, paymentId, email, comment } = makePaymentDto;

      if (!custNo || !amount || !paymentId) {
        throw new AppError('custNo, amount, and paymentId are required', 400);
      }

      const response = await this.apiClient.apiCall(
        `/api/v1/group/${this.configService.get('groupNo')}/customer/${custNo}/transaction/payment/`,
        {
          transactionType: 'P',
          paymentTokenId: paymentId,
          amount,
          receiptEmail: email,
          comment: comment || 'One-time payment',
          allowDuplicates: true,
        },
      );

      // Optional: You can also log this payment in Sheets if you want
      // (e.g. add a "Last Payment Date" or "Payment Status" column later)
      await this.paymentModel.create({
        custNo,
        amount: Number(amount), // stored as number (in smallest unit)
        paymentTokenId: paymentId,
        status: response.status === 'success' ? 'completed' : 'failed', // adjust based on actual response
        createdAt: new Date(),
      });

      return response;
    } catch (error) {
      await this.emailService.sendFailureEmail(
        'makePayment',
        error.message || 'Unknown error',
        { makePaymentDto },
      );
      throw error;
    }
  }

  async processRecurringPayment(dto: ProcessRecurringPaymentDto) {
    if (!dto.singleUseTokenId || !dto.amount) {
      throw new AppError('Invalid recurring payment data provided', 400);
    }

    console.log('Processing recurring payment with DTO:', dto);

    const url =
      'https://api.quickstream.support.qvalent.com/rest/v1/transactions';
    const apiKey = this.configService.get<string>('quickstreamApiKey');
    if (!apiKey) {
      throw new AppError('Quickstream API key not configured', 500);
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + Buffer.from(`${apiKey}:`).toString('base64'),
    };

    const body = {
      transactionType: 'PAYMENT',
      singleUseTokenId: dto.singleUseTokenId,
      supplierBusinessCode: 'C01967', // ← Hardcoded
      principalAmount: dto.amount,
      currency: 'AUD', // ← Hardcoded
      eci: 'RECURRING',
      storedCredentialData: {
        entryMode: 'STORED_CREDENTIAL',
        usage: 'RECURRING',
      },
    };

    try {
      const response = await firstValueFrom(
        this.httpService
          .post(url, body, { headers })
          .pipe(map((resp) => resp.data)),
      );
      console.log('Quickstream response:', response);
      return response;
    } catch (error) {
      console.error(
        'Quickstream error:',
        error.response?.data || error.message,
      );
      throw new AppError(`Payment processing failed: ${error.message}`, 500);
    }
  }
}
