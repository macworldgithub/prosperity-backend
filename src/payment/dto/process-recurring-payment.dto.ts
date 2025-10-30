import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class ProcessRecurringPaymentDto {
  @ApiProperty({
    description: 'Quickstream single-use token ID (from frontend card input)',
    example: '7cd8cf13-6f9d-4f73-9197-a1c94c03e02d',
  })
  @IsString()
  singleUseTokenId: string;

  @ApiProperty({
    description: 'Payment amount',
    example: 49.99,
  })
  @IsNumber()
  amount: number;
}
