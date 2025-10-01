import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, IsArray, IsNumber, IsOptional } from 'class-validator';

export class BillItemDto {
  @ApiProperty({ description: 'Label of the bill item' })
  @IsString()
  label: string;

  @ApiProperty({ description: 'Amount for the bill item' })
  @IsNumber()
  amount: number;

  @ApiPropertyOptional({ description: 'Whether to highlight the item' })
  @IsOptional()
  @IsBoolean()
  highlight?: boolean;
}

export class InternationalCallDto {
  @ApiProperty({ description: 'Number of international calls' })
  @IsNumber()
  count: number;

  @ApiProperty({ description: 'Destination of international calls (e.g., China)' })
  @IsString()
  destination: string;

  @ApiProperty({ description: 'Total amount for international calls' })
  @IsNumber()
  totalAmount: number;
}

export class LateFeeDto {
  @ApiProperty({ description: 'Late fee amount' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Date the late fee was applied (e.g., 2025-09-25)' })
  @IsString()
  appliedDate: string;
}

export class PaymentDto {
  @ApiProperty({ description: 'Payment amount' })
  @IsNumber()
  amount: number;

  @ApiProperty({ description: 'Date of payment (e.g., 2025-10-05)' })
  @IsString()
  paymentDate: string;
}

export class BillDto {
  @ApiProperty({ description: 'Billing month (e.g., September 2025)' })
  @IsString()
  month: string;

  @ApiProperty({ type: [BillItemDto], description: 'List of bill items' })
  @IsArray()
  items: BillItemDto[];

  @ApiProperty({ description: 'Due date for the bill (e.g., October 10, 2025)' })
  @IsString()
  dueDate: string;

  @ApiProperty({ description: 'Billing cycle end date (e.g., October 31, 2025)' })
  @IsString()
  billCycleEnd: string;

  @ApiProperty({ description: 'Whether there is a dispute notice' })
  @IsBoolean()
  disputeNotice: boolean;

  @ApiPropertyOptional({ description: 'International call details' })
  @IsOptional()
  internationalCalls?: InternationalCallDto;

  @ApiPropertyOptional({ description: 'Late fee details' })
  @IsOptional()
  lateFee?: LateFeeDto;

  @ApiPropertyOptional({ description: 'Payment details' })
  @IsOptional()
  payment?: PaymentDto;
}