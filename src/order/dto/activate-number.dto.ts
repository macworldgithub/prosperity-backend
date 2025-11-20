import { IsString, IsEmail, IsObject, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Embedded Customer schema
class Cust {
  @ApiProperty({ description: 'Customer number', example: 'CUST12345' })
  @IsString()
  custNo: string;

  @ApiProperty({ description: 'Suburb', example: 'Sydney' })
  @IsString()
  suburb: string;

  @ApiProperty({ description: 'Postcode', example: '2000' })
  @IsString()
  postcode: string;

  @ApiProperty({
    description: 'Full address',
    example: '123 George St, Unit 5',
  })
  @IsString()
  address: string;

  @ApiProperty({ description: 'Customer email', example: 'john@example.com' })
  @IsEmail()
  email: string;
}

// Response schema embedded
class ActivateNumberResponse {
  @ApiProperty({ example: 'ORD123456' })
  orderId: string;

  @ApiProperty({ example: null, nullable: true })
  errorMessage?: string;
}

export class ActivateNumberDto {
  @ApiProperty({
    description: 'Phone number to activate',
    example: '0412345678',
  })
  @IsString()
  number: string;

  @ApiProperty({ type: () => Cust })
  @IsObject()
  @Type(() => Cust)
  cust: Cust;

  @ApiProperty({ description: 'Plan number', example: 'PLAN001' })
  @IsString()
  planNo: string;

  @ApiPropertyOptional({
    description: 'Physical SIM number (optional, omit for eSIM)',
    example: '8934567890123456789',
  })
  @IsOptional()
  @IsString()
  simNo?: string;

  // ADD THIS
  @ApiPropertyOptional({
    description: 'Agent ID who is activating this number',
    example: 'AGT001',
  })
  @IsOptional()
  @IsString()
  agentId?: string;

  // Hidden from Swagger input but used for response
  static ResponseExample = {
    success: true,
    message: 'Number activated successfully',
    data: { return: { orderId: 'ORD123456', errorMessage: null } },
  };
}
