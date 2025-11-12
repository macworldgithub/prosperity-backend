import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppError } from '../common/errors/app-error';

@Injectable()
export class EmailService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.sendgrid.com/v3/mail/send';
  private readonly defaultFromEmail: string;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('SENDGRID_API_KEY');
    if (!apiKey) {
      throw new AppError('SENDGRID_API_KEY is not configured', 500);
    }
    this.apiKey = apiKey;

    this.defaultFromEmail =
      this.configService.get<string>('SENDGRID_FROM_EMAIL') ||
      'bele@justmobile.ai';
  }

  async sendTemplateEmail(
    toEmail: string,
    templateId: string,
    templateData: Record<string, any> = {},
    fromEmail: string | null = null,
  ) {
    if (!toEmail || !templateId) {
      throw new AppError('Recipient email and template ID are required', 400);
    }

    const emailData = {
      from: { email: fromEmail || this.defaultFromEmail },
      personalizations: [
        {
          to: [{ email: toEmail }],
          dynamic_template_data: templateData,
        },
      ],
      template_id: templateId,
    };

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      let errorMessage = response.statusText;
      try {
        const errorBody = await response.json();
        errorMessage += ` - ${JSON.stringify(errorBody)}`;
      } catch {
        // ignore
      }
      throw new AppError(
        `SendGrid API error: ${response.status} ${errorMessage}`,
        response.status,
      );
    }

    return {
      success: true,
      messageId: response.headers.get('x-message-id'),
      status: response.status,
    };
  }

  async sendWelcomeTemplateEmail(
    toEmail: string,
    templateData: Record<string, any> = {},
  ) {
    const templateId = this.configService.get<string>(
      'SENDGRID_WELCOME_EMAIL_ID',
    );
    if (!templateId) {
      throw new AppError('SENDGRID_WELCOME_EMAIL_ID not configured', 500);
    }

    return this.sendTemplateEmail(toEmail, templateId, templateData);
  }
}
