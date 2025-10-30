import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddPaymentMethodDto {
  @ApiProperty({
    description: 'Customer number (as registered with the payment provider)',
    example: 'CUST-12345',
  })
  @IsString()
  custNo: string;

  @ApiProperty({
    description: 'Payment token returned by the provider (e.g., Stripe token)',
    example: 'tok_1JxyzAbCDefGhIJKLmnOPQRs',
  })
  @IsString()
  paymentTokenId: string;
}
