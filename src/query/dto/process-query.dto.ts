import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProcessQueryDto {
  @ApiProperty({ description: 'The query string to process' })
  @IsString()
  query: string;

  @ApiProperty({ description: 'Context of the query (billQuery, addressUpdate, coverageCheck)' })
  @IsString()
  context: string;
}