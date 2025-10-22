import { IsObject, IsString, IsEmail, Equals } from 'class-validator';
import { Type } from 'class-transformer';

class CustomerData {
  @IsString()
  address: string;

  @IsString()
  postcode: string;

  @IsString()
  state: string;

  @IsString()
  suburb: string;

  @Equals('R')
  custType: string;

  @IsEmail()
  email: string;

  @IsString()
  dob: string;

  @IsString()
  firstName: string;

  @IsString()
  surname: string;

  @IsString()
  phone: string;

  @IsString()
  notes: string;

  @Equals('Email')
  preferredContactMethod: string;
}

export class AddCustomerDto {
  @IsObject()
  @Type(() => CustomerData)
  customer: CustomerData;
}
