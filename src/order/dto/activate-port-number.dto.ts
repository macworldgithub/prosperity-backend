import { IsString, IsEmail, IsObject, IsOptional, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

class Cust {
  @IsString()
  custNo: string;

  @IsString()
  suburb: string;

  @IsString()
  postcode: string;

  @IsString()
  address: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  dob: string;

  @IsOptional()
  @IsString()
  arn: string;
}

export class ActivatePortNumberDto {
  @IsString()
  number: string;

  @IsString()
  @IsIn(['prepaid', 'postpaid'])
  numType: string;

  @IsObject()
  @Type(() => Cust)
  cust: Cust;

  @IsString()
  planNo: string;

  @IsOptional()
  @IsString()
  simNo: string;
}
