// import { IsString, IsEmail } from 'class-validator';
// import { ApiProperty } from '@nestjs/swagger';

// export class LoginDto {
//   @ApiProperty({ description: 'Email address of the user' })
//   @IsEmail()
//   email: string;

//   @ApiProperty({ description: 'User PIN' })
//   @IsString()
//   pin: string;
// }
// src/user/dto/login.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email address OR Customer Number (custNo)',
    example: 'john@example.com or CUST12345',
  })
  @IsString()
  identifier: string;

  @ApiProperty({
    description: 'Your 4-digit PIN',
    example: '2589',
  })
  @IsString({ message: 'PIN must be a string' })
  @Length(4, 4, { message: 'PIN must be exactly 4 digits' })
  @Matches(/^[0-9]{4}$/, { message: 'PIN must contain exactly 4 digits (0-9)' })
  pin: string;
}
