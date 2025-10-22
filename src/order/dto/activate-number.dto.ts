import {
  IsString,
  IsEmail,
  IsObject,
  IsBoolean,
  IsOptional,
} from 'class-validator';
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
}

export class ActivateNumberDto {
  @IsString()
  number: string;

  @IsObject()
  @Type(() => Cust)
  cust: Cust;

  @IsString()
  planNo: string;

  @IsOptional()
  @IsString()
  simNo: string;
}
