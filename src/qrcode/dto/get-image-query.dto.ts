// src/qrcode/dto/get-image-query.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetQrImageQueryDto {
  @ApiPropertyOptional({
    description: 'Base64-encoded QR code image data',
    example: 'iVBORw0KGgoAAAANSUhEUgAA...',
  })
  @IsString()
  data?: string;

  @ApiPropertyOptional({
    description: 'Set to any value (e.g., "true") to trigger file download',
    example: 'true',
    type: 'string',
  })
  @IsOptional()
  @IsString()
  download?: string;
}
