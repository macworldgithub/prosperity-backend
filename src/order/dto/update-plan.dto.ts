import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlanDto {
  @ApiProperty({ description: 'New plan number', example: 'PLAN002' })
  @IsString()
  planNo: string;

  @ApiProperty({
    description: 'Line sequence number',
    example: '1',
    default: '1',
  })
  @IsString()
  lineSeqNo?: string = '1';

  static ResponseExample = {
    success: true,
    message: 'Plan updated successfully',
    data: { return: {} },
  };
}
