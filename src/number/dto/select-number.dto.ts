import { IsString } from 'class-validator';

export class SelectNumberDto {
  @IsString()
  number: string;
}
