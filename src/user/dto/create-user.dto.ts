// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

// export class CreateUserDto {
//   @ApiProperty({ description: 'Full name of the user' })
//   @IsString()
//   name: string;

//   @ApiProperty({ description: 'Email address of the user' })
//   @IsEmail()
//   email: string;

//   @ApiProperty({ description: 'PIN for user authentication' })
//   @IsString()
//   pin: string;

//   @ApiProperty({ description: 'Street address' })
//   @IsString()
//   street: string;

//   @ApiProperty({ description: 'City' })
//   @IsString()
//   city: string;

//   @ApiProperty({ description: 'State' })
//   @IsString()
//   state: string;

//   @ApiProperty({ description: 'ZIP code' })
//   @IsString()
//   zip: string;

//   @ApiPropertyOptional({ description: 'Whether biometric authentication is enrolled' })
//   @IsOptional()
//   @IsBoolean()
//   biometricEnrolled?: boolean;
// }
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Full name of the user' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email address of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'PIN for user authentication' })
  @IsString()
  pin: string;

  @ApiPropertyOptional({ description: 'Street address' })
  @IsOptional()
  @IsString()
  street?: string;

  @ApiPropertyOptional({ description: 'Suburb' })
  @IsOptional()
  @IsString()
  suburb?: string;

  @ApiPropertyOptional({ description: 'State' })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiPropertyOptional({ description: 'Postcode' })
  @IsOptional()
  @IsString()
  postcode?: string;

  @ApiPropertyOptional({
    description: 'Whether biometric authentication is enrolled',
  })
  @IsOptional()
  @IsBoolean()
  biometricEnrolled?: boolean;
}
