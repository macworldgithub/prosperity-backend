import {
  IsEmail,
  IsObject,
  IsOptional,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

export class SendTemplateEmailDto {
  @ApiProperty({
    description: 'Recipient email address',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  toEmail: string;

  @ApiProperty({
    description: 'SendGrid dynamic template ID',
    example: 'd-1234567890abcdef1234567890abcdef',
  })
  @IsString()
  @IsNotEmpty()
  templateId: string;

  @ApiProperty({
    description:
      'Dynamic data to inject into the template (any key-value pairs)',
    example: {
      name: 'John Doe',
      verificationUrl: 'https://example.com/verify',
    },
    type: 'object',
    additionalProperties: true, // This allows any key
  } as ApiPropertyOptions)
  @IsObject()
  @IsOptional()
  templateData?: Record<string, any>;

  @ApiProperty({
    description: 'Optional sender email (defaults to configured from email)',
    example: 'no-reply@justmobile.ai',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  fromEmail?: string;
}
