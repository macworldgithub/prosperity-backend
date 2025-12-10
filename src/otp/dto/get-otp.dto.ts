// src/otp/dto/get-otp.dto.ts
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetOtpDto {
  @ApiProperty({
    description: 'Customer number',
    example: '512345',
  })
  @IsString()
  custNo: string;

  @ApiProperty({
    description: 'Phone number to receive OTP',
    example: '0412121212',
  })
  @IsString()
  destination: string;
}
