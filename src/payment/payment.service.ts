import { Injectable } from '@nestjs/common';
import { ApiClientService } from '../api-client/api-client.service';
import { AppError } from '../common/errors/app-error';
import { AddPaymentMethodDto } from './dto/add-payment-method.dto';
import { MakePaymentDto } from './dto/make-payment.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentService {
  constructor(
    private apiClient: ApiClientService,
    private configService: ConfigService,
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
}
