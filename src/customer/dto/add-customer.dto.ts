// import { IsObject, IsString, IsEmail, Equals } from 'class-validator';
// import { Type } from 'class-transformer';

// class CustomerData {
//   @IsString()
//   address: string;

//   @IsString()
//   postcode: string;

//   @IsString()
//   state: string;

//   @IsString()
//   suburb: string;

//   @Equals('R')
//   custType: string;

//   @IsEmail()
//   email: string;

//   @IsString()
//   dob: string;

//   @IsString()
//   firstName: string;

//   @IsString()
//   surname: string;

//   @IsString()
//   phone: string;

//   @IsString()
//   notes: string;

//   @Equals('Email')
//   preferredContactMethod: string;
// }

// export class AddCustomerDto {
//   @IsObject()
//   @Type(() => CustomerData)
//   customer: CustomerData;
// }

// import {
//   IsObject,
//   IsString,
//   IsEmail,
//   Equals,
//   ValidateNested,
// } from 'class-validator';
// import { Type } from 'class-transformer';
// import { ApiProperty } from '@nestjs/swagger';

// class CustomerData {
//   @ApiProperty({ example: '123 Example St', description: 'Street address' })
//   @IsString()
//   address: string;

//   @ApiProperty({ example: '3000', description: 'Postal code' })
//   @IsString()
//   postcode: string;

//   @ApiProperty({ example: 'VIC', description: 'State' })
//   @IsString()
//   state: string;

//   @ApiProperty({ example: 'Melbourne', description: 'Suburb/Town' })
//   @IsString()
//   suburb: string;

//   @ApiProperty({
//     example: 'R',
//     description: 'Customer type. Must be "R" for Residential',
//   })
//   @Equals('R')
//   custType: string;

//   @ApiProperty({
//     example: 'john.doe@example.com',
//     description: 'Email address',
//   })
//   @IsEmail()
//   email: string;

//   @ApiProperty({
//     example: '1985-06-15',
//     description: 'Date of birth (YYYY-MM-DD)',
//   })
//   @IsString()
//   dob: string;

//   @ApiProperty({ example: 'John', description: 'First name' })
//   @IsString()
//   firstName: string;

//   @ApiProperty({ example: 'Doe', description: 'Surname' })
//   @IsString()
//   surname: string;

//   @ApiProperty({ example: '0412345678', description: 'Phone number' })
//   @IsString()
//   phone: string;

//   @ApiProperty({ example: 'Preferred email contact', description: 'Notes' })
//   @IsString()
//   notes: string;

//   @ApiProperty({
//     example: 'Email',
//     description: 'Preferred contact method. Must be "Email"',
//   })
//   @Equals('Email')
//   preferredContactMethod: string;
// }

// export class AddCustomerDto {
//   @ApiProperty({
//     type: CustomerData,
//     description: 'Customer information object',
//   })
//   @IsObject()
//   @ValidateNested()
//   @Type(() => CustomerData)
//   customer: CustomerData;
// }

import {
  IsObject,
  IsString,
  IsEmail,
  Equals,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class CustomerData {
  @ApiProperty({ example: '123 Example St', description: 'Street address' })
  @IsString()
  address: string;

  @ApiProperty({ example: '3000', description: 'Postal code' })
  @IsString()
  postcode: string;

  @ApiProperty({ example: 'VIC', description: 'State' })
  @IsString()
  state: string;

  @ApiProperty({ example: 'Melbourne', description: 'Suburb/Town' })
  @IsString()
  suburb: string;

  @ApiProperty({
    example: 'R',
    description: 'Customer type. Must be "R" for Residential',
  })
  @Equals('R')
  custType: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email address',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '1985-06-15',
    description: 'Date of birth (YYYY-MM-DD)',
  })
  @IsString()
  dob: string;

  @ApiProperty({
    example: '',
    description: 'Porting date or port-related DOB (optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  dob_port?: string;

  @ApiProperty({ example: 'John', description: 'First name' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Surname' })
  @IsString()
  surname: string;

  @ApiProperty({ example: '0412345678', description: 'Phone number' })
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'Preferred email contact',
    description: 'Notes (optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    example: 'Email',
    description: 'Must be "Email"',
  })
  @Equals('Email')
  preferredContactMethod: string;

  // New / added fields from your sample JSON:
  @ApiProperty({
    example: 'Mr',
    description: 'Salutation (e.g. Mr, Mrs) (optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  sal?: string;

  @ApiProperty({
    example: 'john.notify@example.com',
    description:
      'Order notification email (optional) — if not present, email is used',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  orderNotificationEmail?: string;

  @ApiProperty({
    example: 'PA',
    description: 'Customer authority type (optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  custAuthorityType?: string;

  @ApiProperty({
    example: '1212',
    description: 'Customer authority number (optional)',
    required: false,
  })
  @IsOptional()
  @IsString()
  custAuthorityNo?: string;
  @ApiProperty({
    example: 'AGT001',
    description: 'Agent ID who created this customer',
  })
  @IsString()
  @IsOptional() // or remove @IsOptional() if you want it required
  agent_id?: string;
}

export class AddCustomerDto {
  @ApiProperty({
    type: CustomerData,
    description: 'Customer information object',
  })
  @IsObject()
  @ValidateNested()
  @Type(() => CustomerData)
  customer: CustomerData;
}
