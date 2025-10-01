import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { BillDto } from '../../bill/dto/bill.dto';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'Service plan (e.g., Basic Plan)' })
  @IsOptional()
  @IsString()
  plan?: string;

  @ApiPropertyOptional({ description: 'Connection speed (e.g., Up to 25 Mbps)' })
  @IsOptional()
  @IsString()
  speed?: string;

  @ApiPropertyOptional({ description: 'Account status (e.g., Active)' })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiPropertyOptional({ description: 'Plan expiry date (e.g., October 10, 2025)' })
  @IsOptional()
  @IsString()
  expiry?: string;

  @ApiPropertyOptional({ description: 'Data used in GB' })
  @IsOptional()
  @IsNumber()
  dataUsed?: number;

  @ApiPropertyOptional({ description: 'Data limit in GB' })
  @IsOptional()
  @IsNumber()
  dataLimit?: number;

  @ApiPropertyOptional({ description: 'Whether biometric authentication is enrolled' })
  @IsOptional()
  @IsBoolean()
  biometricEnrolled?: boolean;

  @ApiPropertyOptional({ description: 'Profile image URL' })
  @IsOptional()
  @IsString()
  image?: string;
}