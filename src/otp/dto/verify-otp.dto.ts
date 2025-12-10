// src/otp/dto/verify-otp.dto.ts
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  @ApiProperty({
    description: 'OTP code received',
    example: '483920',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: 'Transaction ID returned from getOTP call',
    example: 'ABC50111-DE56-440F-G5H2-8603684C123I',
  })
  @IsString()
  transactionId: string;
}
