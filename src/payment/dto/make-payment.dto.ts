import { IsString, IsEmail, IsOptional } from 'class-validator';

export class MakePaymentDto {
  @IsString()
  custNo: string;

  @IsString()
  amount: string;

  @IsString()
  paymentId: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  comment: string;
}
