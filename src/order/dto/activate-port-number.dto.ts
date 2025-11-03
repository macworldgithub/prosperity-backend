import { IsString, IsEmail, IsObject, IsOptional, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class Cust {
  @ApiProperty({ example: 'CUST12345' })
  @IsString()
  custNo: string;

  @ApiProperty({ example: 'Sydney' })
  @IsString()
  suburb: string;

  @ApiProperty({ example: '2000' })
  @IsString()
  postcode: string;

  @ApiProperty({ example: '123 George St, Unit 5' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'Date of birth (required for prepaid)',
    example: '1985-06-15',
  })
  @IsOptional()
  @IsString()
  dob?: string;

  @ApiPropertyOptional({
    description: 'Account Reference Number (required for postpaid)',
    example: 'ARN987654',
  })
  @IsOptional()
  @IsString()
  arn?: string;
}

class PortResponse {
  @ApiProperty({ example: 'ORD789012' })
  orderId: string;

  @ApiProperty({ example: null, nullable: true })
  errorMessage?: string;
}

export class ActivatePortNumberDto {
  @ApiProperty({ example: '0412345678' })
  @IsString()
  number: string;

  @ApiProperty({
    enum: ['prepaid', 'postpaid'],
    example: 'postpaid',
  })
  @IsString()
  @IsIn(['prepaid', 'postpaid'])
  numType: string;

  @ApiProperty({ type: () => Cust })
  @IsObject()
  @Type(() => Cust)
  cust: Cust;

  @ApiProperty({ example: 'PLAN001' })
  @IsString()
  planNo: string;

  @ApiPropertyOptional({ example: '8934567890123456789' })
  @IsOptional()
  @IsString()
  simNo?: string;

  static ResponseExample = {
    success: true,
    message: 'Ported number activated successfully',
    data: { return: { orderId: 'ORD789012', errorMessage: null } },
  };
}
