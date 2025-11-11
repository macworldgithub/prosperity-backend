// ─────────────────────────────────────────────────────────────────────────────
// src/order/dto/update-plan.dto.ts
// ─────────────────────────────────────────────────────────────────────────────
import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlanDto {
  @ApiProperty({
    description: 'New plan number (must exist in the plan catalogue)',
    example: 'PLAN002',
  })
  @IsString()
  planNo: string;

  @ApiProperty({
    description: 'Line sequence number of the subscription to change',
    example: '1',
    required: false,
    default: '1',
  })
  @IsString()
  @IsOptional()
  lineSeqNo?: string = '1';

  /** Swagger example that will be shown in the UI */
  static ResponseExample = {
    success: true,
    message: 'Plan updated successfully',
    data: { return: {} },
  };
}