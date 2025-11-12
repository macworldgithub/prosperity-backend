import { IsEmail, IsObject, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

export class SendWelcomeEmailDto {
  @ApiProperty({
    description: 'Recipient email address',
    example: 'newuser@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  toEmail: string;

  @ApiProperty({
    description: 'Dynamic data for welcome template (any key-value pairs)',
    example: { name: 'Alice', company: 'JustMobile' },
    type: 'object',
    additionalProperties: true,
  } as ApiPropertyOptions)
  @IsObject()
  @IsOptional()
  templateData?: Record<string, any>;
}
