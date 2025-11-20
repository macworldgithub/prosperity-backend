// src/auth/dto/forgot-pin.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ForgotPinDto {
  @ApiProperty({ description: 'Email or Customer Number' })
  @IsString()
  identifier: string;
}
