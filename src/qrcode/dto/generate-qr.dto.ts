// src/qrcode/dto/generate-qr.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class GenerateQrDto {
  @ApiProperty({
    description: 'Mobile number (MSN) to generate QR code for',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  number: string;
}
