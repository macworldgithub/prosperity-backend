import { IsString } from 'class-validator';

export class UpdatePlanDto {
  @IsString()
  planNo: string;

  @IsString()
  lineSeqNo: string = '1'; // default
}
