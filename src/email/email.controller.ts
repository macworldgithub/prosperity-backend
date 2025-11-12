import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { EmailService } from './email.service';
import { SendTemplateEmailDto } from './dto/send-template-email.dto';
import { SendWelcomeEmailDto } from './dto/send-welcome-email.dto';
import { formatResponse } from '../common/utils/response-formatter';

@ApiTags('Emails')
@Controller('api/v1/emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('template')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Send email using a SendGrid dynamic template',
    description:
      'Sends an email using SendGrid with a dynamic template and data substitution.',
  })
  @ApiBody({ type: SendTemplateEmailDto })
  @ApiResponse({
    status: 200,
    description: 'Email sent successfully',
    schema: {
      example: {
        success: true,
        data: {
          success: true,
          messageId: '1234567890',
          status: 202,
        },
        message: 'Email sent successfully',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({
    status: 500,
    description: 'SendGrid API error or misconfiguration',
  })
  async sendTemplateEmail(@Body() body: SendTemplateEmailDto) {
    const result = await this.emailService.sendTemplateEmail(
      body.toEmail,
      body.templateId,
      body.templateData,
      body.fromEmail ?? null,
    );
    return formatResponse(result, 'Email sent successfully');
  }

  @Post('template/welcome')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Send welcome email using pre-configured template',
    description:
      'Sends a welcome email using the configured SendGrid welcome template ID.',
  })
  @ApiBody({ type: SendWelcomeEmailDto })
  @ApiResponse({
    status: 200,
    description: 'Welcome email sent successfully',
    schema: {
      example: {
        success: true,
        data: {
          success: true,
          messageId: '9876543210',
          status: 202,
        },
        message: 'Welcome Email sent successfully',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({
    status: 500,
    description: 'Template ID not configured or SendGrid error',
  })
  async sendWelcomeTemplateEmail(@Body() body: SendWelcomeEmailDto) {
    const result = await this.emailService.sendWelcomeTemplateEmail(
      body.toEmail,
      body.templateData,
    );
    return formatResponse(result, 'Welcome Email sent successfully');
  }
}
