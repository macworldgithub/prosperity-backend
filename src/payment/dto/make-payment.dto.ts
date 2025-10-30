import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class MakePaymentDto {
  @ApiProperty({
    description: 'Customer number',
    example: 'CUST-12345',
  })
  @IsString()
  custNo: string;

  @ApiProperty({
    description:
      'Amount in the smallest currency unit (e.g., cents). Sent as string to preserve precision.',
    example: '2500', // $25.00
  })
  @IsString()
  amount: string;

  @ApiProperty({
    description: 'Saved payment method token ID',
    example: 'tok_1JxyzAbCDefGhIJKLmnOPQRs',
  })
  @IsString()
  paymentId: string;

  @ApiPropertyOptional({
    description: 'Email to send receipt to',
    example: 'customer@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Optional comment for the transaction',
    example: 'Order #1001',
  })
  @IsOptional()
  @IsString()
  comment?: string;
}
