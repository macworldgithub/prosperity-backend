import { Injectable } from '@nestjs/common';
import { ApiClientService } from '../api-client/api-client.service';
import { AppError } from '../common/errors/app-error';
import { GetOtpDto } from './dto/get-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class OtpService {
  constructor(private apiClient: ApiClientService) {}

  async getOTP(getOtpDto: GetOtpDto) {
    if (!getOtpDto.custNo || !getOtpDto.destination)
      throw new AppError('Customer number and destination are required', 400);
    return await this.apiClient.soapCall(
      '/UtbOTP',
      {
        manageOtpRequest: {
          requestType: 'getOtp',
          getOtp: {
            custNo: getOtpDto.custNo,
            destination: getOtpDto.destination,
            destinationCategory: 'Phone (Bh)',
            destinationType: 'Primary Account Holder',
            method: 'SMS',
            operationType: 'Port',
            reason: 'R8',
          },
        },
      },
      'manageOtp',
    );
  }

  async verifyOTP(verifyOtpDto: VerifyOtpDto) {
    if (!verifyOtpDto.code || !verifyOtpDto.transactionId)
      throw new AppError('Code and transaction ID are required', 400);
    return await this.apiClient.soapCall(
      '/UtbOTP',
      {
        manageOtpRequest: {
          requestType: 'verifyOtp',
          verifyOtp: {
            code: verifyOtpDto.code,
            transactionId: verifyOtpDto.transactionId,
          },
        },
      },
      'manageOtp',
    );
  }
}
