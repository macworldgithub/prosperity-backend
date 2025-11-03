// src/plan/dto/create-plan.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional, IsIn } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty({ example: 11144153 })
  @IsNumber()
  planNo: number;

  @ApiProperty({ example: 'JM 10GB Auto' })
  @IsString()
  planName: string;

  @ApiProperty({ example: 'MB' })
  @IsString()
  usageType: string;

  @ApiProperty({ example: 20.54 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: '4G', enum: ['4G', '5G'], required: false })
  @IsOptional()
  @IsIn(['4G', '5G'])
  network?: '4G' | '5G';

  @ApiProperty({ example: '922' })
  @IsString()
  groupNo: string;

  @ApiProperty({ example: 'Just Mobile' })
  @IsString()
  groupName: string;
}
