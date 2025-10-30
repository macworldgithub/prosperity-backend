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

@Injectable()
export class PaymentService {
  constructor(
    private apiClient: ApiClientService,
    private configService: ConfigService,
    private httpService: HttpService, // Injected for direct HTTP calls
  ) {}

  async addPaymentMethod(addPaymentMethodDto: AddPaymentMethodDto) {
    if (!addPaymentMethodDto.custNo || !addPaymentMethodDto.paymentTokenId)
      throw new AppError(
        'Customer number and payment token ID are required',
        400,
      );
    return await this.apiClient.apiCall(
      `/api/v1/group/${this.configService.get('groupNo')}/customer/${addPaymentMethodDto.custNo}/payment-method`,
      {
        paymentProvider: 'QS',
        paymentTokenId: addPaymentMethodDto.paymentTokenId,
      },
    );
  }

  async makePayment(makePaymentDto: MakePaymentDto) {
    if (
      !makePaymentDto.custNo ||
      !makePaymentDto.amount ||
      !makePaymentDto.paymentId
    )
      throw new AppError('Invalid payment data provided', 400);
    return await this.apiClient.apiCall(
      `/api/v1/group/${this.configService.get('groupNo')}/customer/${makePaymentDto.custNo}/transaction/payment/`,
      {
        transactionType: 'P',
        paymentTokenId: makePaymentDto.paymentId,
        amount: makePaymentDto.amount,
        receiptEmail: makePaymentDto.email,
        comment: makePaymentDto.comment,
        allowDuplicates: true,
      },
    );
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
