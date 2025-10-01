import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class CreateCoverageDto {
  @ApiProperty({ description: 'ZIP code for the coverage area' })
  @IsString()
  zip: string;

  @ApiProperty({ description: 'Display address for the coverage area' })
  @IsString()
  displayAddress: string;

  @ApiProperty({ description: 'Availability status (e.g., Available, Limited)' })
  @IsString()
  availability: string;

  @ApiProperty({ description: 'List of available network types (e.g., 4G, 5G)' })
  @IsArray()
  @IsString({ each: true })
  networkTypes: string[];

  @ApiProperty({ description: 'Maximum speed (e.g., 100 Mbps)' })
  @IsString()
  maxSpeed: string;

  @ApiProperty({ description: 'Planned expansion date (e.g., 2026-01-01)' })
  @IsString()
  expansionDate: string;
}