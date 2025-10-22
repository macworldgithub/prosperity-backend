// import { Controller, Post, Body } from '@nestjs/common';
// import { EmailService } from './email.service';
// import { formatResponse } from '../common/utils/response-formatter';
// import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

// @ApiTags('emails')
// @Controller('api/v1/emails')
// export class EmailController {
//   constructor(private emailService: EmailService) {}

//   @Post('template')
//   @ApiOperation({ summary: 'Send email using SendGrid template' })
//   @ApiBody({
//     type: Object,
//     description:
//       '{ toEmail: string, templateId: string, templateData: object, fromEmail: string }',
//   })
//   @ApiResponse({ status: 200, description: 'Email sent successfully' })
//   async sendTemplateEmail(
//     @Body()
//     body: {
//       toEmail: string;
//       templateId: string;
//       templateData: object;
//       fromEmail?: string;
//     },
//   ) {
//     const result = await this.emailService.sendTemplateEmail(
//       body.toEmail,
//       body.templateId,
//       body.templateData,
//       body.fromEmail,
//     );
//     return formatResponse(result, 'Email sent successfully');
//   }

//   @Post('template/welcome')
//   @ApiOperation({ summary: 'Send welcome email using SendGrid template' })
//   @ApiBody({
//     type: Object,
//     description: '{ toEmail: string, templateData: object }',
//   })
//   @ApiResponse({ status: 200, description: 'Welcome Email sent successfully' })
//   async sendWelcomeTemplateEmail(
//     @Body() body: { toEmail: string; templateData: object },
//   ) {
//     const result = await this.emailService.sendWelcomeTemplateEmail(
//       body.toEmail,
//       body.templateData,
//     );
//     return formatResponse(result, 'Welcome Email sent successfully');
//   }
// }
// src/email/email.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { formatResponse } from '../common/utils/response-formatter';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('emails')
@Controller('api/v1/emails')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post('template')
  @ApiOperation({ summary: 'Send email using SendGrid template' })
  @ApiBody({
    type: Object,
    description:
      '{ toEmail: string, templateId: string, templateData: object, fromEmail: string }',
  })
  @ApiResponse({ status: 200, description: 'Email sent successfully' })
  async sendTemplateEmail(
    @Body()
    body: {
      toEmail: string;
      templateId: string;
      templateData: object;
      fromEmail?: string;
    },
  ) {
    const result = await this.emailService.sendTemplateEmail(
      body.toEmail,
      body.templateId,
      body.templateData,
      body.fromEmail ?? null,
    );
    return formatResponse(result, 'Email sent successfully');
  }

  @Post('template/welcome')
  @ApiOperation({ summary: 'Send welcome email using SendGrid template' })
  @ApiBody({
    type: Object,
    description: '{ toEmail: string, templateData: object }',
  })
  @ApiResponse({ status: 200, description: 'Welcome Email sent successfully' })
  async sendWelcomeTemplateEmail(
    @Body() body: { toEmail: string; templateData: object },
  ) {
    const result = await this.emailService.sendWelcomeTemplateEmail(
      body.toEmail,
      body.templateData,
    );
    return formatResponse(result, 'Welcome Email sent successfully');
  }
}
