import { IsString } from 'class-validator';

export class AddPaymentMethodDto {
  @IsString()
  custNo: string;

  @IsString()
  paymentTokenId: string;
}
