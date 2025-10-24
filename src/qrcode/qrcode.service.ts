import { Injectable } from '@nestjs/common';
import { ApiClientService } from '../api-client/api-client.service';
import { AppError } from '../common/errors/app-error';

@Injectable()
export class QrCodeService {
  constructor(private apiClient: ApiClientService) {}

  // async getQRCode(number: string) {
  //   if (!number) throw new AppError('Number is required', 400);
  //   const response = await this.apiClient.apiCall(
  //     '/api/v1/mobile/resource/getEsimDetails',
  //     {
  //       requestType: 'QR Code',
  //       msn: number,
  //     },
  //   );
  //   if (response.error)
  //     throw new AppError(
  //       response.error.message || 'Failed to generate QR code',
  //       400,
  //     );
  //   return response;
  // }

  // async getQRFromOrderId(orderId: string) {
  //   if (!orderId) throw new AppError('Order ID is required', 400);
  //   const response = await this.apiClient.apiCall(
  //     '/api/v1/mobile/resource/getEsimDetails',
  //     {
  //       requestType: 'QR Code',
  //       orderId: orderId,
  //     },
  //   );
  //   if (response.error)
  //     throw new AppError(
  //       response.error.message || 'Failed to generate QR code from order ID',
  //       400,
  //     );
  //   return response;
  // }
}
