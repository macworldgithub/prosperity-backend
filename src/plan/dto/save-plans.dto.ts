// src/plan/dto/save-plans.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class PlanItemDto {
  @ApiProperty({ example: 11144153 })
  @IsNumber()
  planNo: number;

  @ApiProperty({ example: 'JM 10GB Auto' })
  @IsString()
  planName: string;

  @ApiProperty({ example: 'MB' })
  @IsString()
  usageType: string;
}

export class SavePlansDto {
  @ApiProperty({ type: [PlanItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlanItemDto)
  plans: PlanItemDto[];

  @ApiProperty({ example: '922' })
  @IsString()
  groupNo: string;

  @ApiProperty({ example: 'Just Mobile' })
  @IsString()
  groupName: string;
}
