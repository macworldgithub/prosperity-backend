// src/auth/dto/change-pin.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class ChangePinDto {
  @ApiProperty({ description: 'Current 4-digit PIN', example: '1234' })
  @IsString()
  @Length(4, 4)
  @Matches(/^[0-9]{4}$/)
  oldPin: string;

  @ApiProperty({ description: 'New 4-digit PIN', example: '5678' })
  @IsString()
  @Length(4, 4, { message: 'New PIN must be exactly 4 digits' })
  @Matches(/^[0-9]{4}$/, { message: 'New PIN must contain only digits' })
  newPin: string;
}
