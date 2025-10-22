// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppError } from '../common/errors/app-error';

@Injectable()
export class EmailService {
  private apiKey: string | undefined;
  private baseUrl = 'https://api.sendgrid.com/v3/mail/send';
  private defaultFromEmail: string | undefined;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get('SENDGRID_API_KEY');
    this.defaultFromEmail =
      this.configService.get('SENDGRID_FROM_EMAIL') || 'bele@justmobile.ai';
  }

  async sendTemplateEmail(
    toEmail: string,
    templateId: string,
    templateData = {},
    fromEmail: string | null = null,
  ) {
    if (!toEmail || !templateId)
      throw new AppError('Recipient email and template ID are required', 400);
    if (!this.apiKey)
      throw new AppError('SendGrid API key not configured', 500);

    const emailData = {
      from: { email: fromEmail || this.defaultFromEmail },
      template_id: templateId,
      personalizations: [
        { to: [{ email: toEmail }], dynamic_template_data: templateData },
      ],
    };

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok)
      throw new AppError(
        `SendGrid API error: ${response.statusText}`,
        response.status,
      );
    return {
      success: true,
      messageId: response.headers.get('x-message-id'),
      status: response.status,
    };
  }

  async sendWelcomeTemplateEmail(toEmail: string, templateData = {}) {
    const templateId = this.configService.get('SENDGRID_WELCOME_EMAIL_ID');
    if (!templateId) {
      throw new AppError('SENDGRID_WELCOME_EMAIL_ID not configured', 500);
    }
    return await this.sendTemplateEmail(toEmail, templateId, templateData);
  }
}
