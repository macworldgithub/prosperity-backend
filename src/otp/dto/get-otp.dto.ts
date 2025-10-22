import { IsString } from 'class-validator';

export class GetOtpDto {
  @IsString()
  custNo: string;

  @IsString()
  destination: string;
}
