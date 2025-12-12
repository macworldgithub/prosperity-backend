import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  async sendPinResetEmail(email: string, newPin: string) {
    await this.transporter.sendMail({
      from: `"Prosperity Tech" <${process.env.SMTP_USER_EMAIL}>`,
      to: email,
      subject: 'Your New 4-Digit PIN',
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your New PIN - Prosperity Tech</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.08); }
          .header { 
            background: linear-gradient(135deg, #145374, #0f3f5a); 
            padding: 60px 20px; 
            text-align: center; 
          }
          .brand-title {
            color: white;
            font-size: 52px;
            font-weight: 900;
            margin: 0;
            letter-spacing: 3px;
            text-shadow: 0 5px 15px rgba(0,0,0,0.4);
          }
          .content { 
            padding: 60px 40px; 
            text-align: center; 
            color: #333; 
          }
          .pin-box {
            display: inline-block;
            background: #145374;
            color: white;
            font-size: 56px;
            font-weight: bold;
            letter-spacing: 20px;
            padding: 30px 45px;
            border-radius: 20px;
            margin: 40px 0;
            box-shadow: 0 15px 35px rgba(20, 83, 116, 0.4);
          }
          .alert-box {
            background: #e8f4f8;
            border: 3px solid #145374;
            border-radius: 16px;
            padding: 25px;
            margin: 35px 0;
            font-size: 17px;
            line-height: 1.6;
          }
          .btn {
            display: inline-block;
            background: #145374;
            color: white;
            font-weight: bold;
            font-size: 20px;
            padding: 20px 60px;
            text-decoration: none;
            border-radius: 60px;
            margin: 30px 0;
            box-shadow: 0 12px 30px rgba(20, 83, 116, 0.45);
            transition: all 0.3s;
          }
          .btn:hover {
            background: #0f3f5a;
            transform: translateY(-4px);
            box-shadow: 0 18px 40px rgba(20, 83, 116, 0.55);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="brand-title">Prosperity Tech</h1>
          </div>

          <div class="content">
            <h2 style="color: #145374; margin-bottom: 15px; font-size: 28px;">
              Your New 4-Digit PIN
            </h2>
            <p style="font-size: 19px; color: #555; margin-bottom: 40px;">
              Use this PIN to log in to your Prosperity Tech account
            </p>

            <div class="pin-box">${newPin}</div>

           

            <!-- Login Button -->
            <a href="https://prosperitytech.omnisuiteai.com/login" class="btn">

              Log In Now
            </a>

            <p style="margin-top: 50px; color: #888; font-size: 16px;">
              — The Prosperity Tech Team
            </p>
          </div>
        </div>
      </body>
      </html>
      `,
    });
  }

  async sendPinChangedEmail(email: string) {
    await this.transporter.sendMail({
      from: `"Prosperity Tech" <${process.env.SMTP_USER_EMAIL}>`,
      to: email,
      subject: 'Your PIN Has Been Changed',
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>PIN Changed - Prosperity Tech</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.08); }
          .header { background: linear-gradient(135deg, #145374, #0f3f5a); padding: 60px 20px; text-align: center; }
          .brand-title { color: white; font-size: 52px; font-weight: 900; margin: 0; letter-spacing: 3px; text-shadow: 0 5px 15px rgba(0,0,0,0.4); }
          .content { padding: 60px 40px; text-align: center; }
          .success-box { 
            background: linear-gradient(135deg, #e8f4f8, #d0eaef); 
            border: 3px solid #145374; 
            border-radius: 16px; 
            padding: 35px; 
            margin: 40px 0; 
            font-size: 18px;
          }
          .btn { 
            background: #145374; 
            color: white; 
            padding: 20px 60px; 
            border-radius: 60px; 
            text-decoration: none; 
            font-weight: bold; 
            font-size: 19px; 
            display: inline-block; 
            box-shadow: 0 12px 30px rgba(20,83,116,0.45);
            transition: all 0.3s;
          }
          .btn:hover {
            background: #0f3f5a;
            transform: translateY(-4px);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="brand-title">Prosperity Tech</h1>
          </div>
          <div class="content">
            <h2 style="color: #145374; font-size: 28px;">PIN Changed Successfully</h2>
            
            <div class="success-box">
              <p style="margin:0; line-height: 1.7;">
                Your account PIN was successfully updated on<br>
                <strong style="font-size: 22px; color: #145374;">
                  ${new Date().toLocaleString('en-NZ', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </strong>
              </p>
            </div>

            <p style="font-size: 18px; color: #555; margin: 30px 0;">
              If you didn't make this change, please secure your account immediately.
            </p>

            <a href="https://prosperitytech.omnisuiteai.com/login" class="btn">
              Go to Login
            </a>

            <p style="margin-top: 50px; color: #888; font-size: 16px;">
              — The Prosperity Tech Team
            </p>
          </div>
        </div>
      </body>
      </html>
      `,
    });
  }
  async sendFailureEmail(
    functionName: string,
    errorMessage: string,
    details?: any,
  ) {
    const detailsStr = details
      ? `<pre style="background: #f8f9fa; padding: 15px; border-radius: 8px; overflow: auto;">${JSON.stringify(details, null, 2)}</pre>`
      : '';
    await this.transporter.sendMail({
      from: `"Prosperity Tech" <${process.env.SMTP_USER_EMAIL}>`,
      to: 'brian@bele.ai, lee@bele.ai',
      // to: `karimjawwad09@gmail.com`,
      subject: `Failure in ${functionName}`,
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Function Failure - Prosperity Tech</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.08); }
          .header {
            background: linear-gradient(135deg, #145374, #0f3f5a);
            padding: 60px 20px;
            text-align: center;
          }
          .brand-title {
            color: white;
            font-size: 52px;
            font-weight: 900;
            margin: 0;
            letter-spacing: 3px;
            text-shadow: 0 5px 15px rgba(0,0,0,0.4);
          }
          .content {
            padding: 60px 40px;
            text-align: center;
            color: #333;
          }
          .error-box {
            background: #ffebee;
            border: 3px solid #d32f2f;
            border-radius: 16px;
            padding: 25px;
            margin: 35px 0;
            font-size: 17px;
            line-height: 1.6;
            color: #c62828;
          }
          .details-box {
            background: #e8f4f8;
            border: 3px solid #145374;
            border-radius: 16px;
            padding: 25px;
            margin: 35px 0;
            font-size: 15px;
            text-align: left;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="brand-title">Prosperity Tech</h1>
          </div>
          <div class="content">
            <h2 style="color: #d32f2f; margin-bottom: 15px; font-size: 28px;">
              Failure in ${functionName}
            </h2>
            <p style="font-size: 19px; color: #555; margin-bottom: 40px;">
              An error occurred during the execution of ${functionName} at ${new Date().toLocaleString(
                'en-NZ',
                {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                },
              )}.
            </p>
            <div class="error-box">
              <strong>Error Message:</strong><br>
              ${errorMessage}
            </div>
            ${
              details
                ? `
            <div class="details-box">
              <strong>Additional Details:</strong><br>
              ${detailsStr}
            </div>
            `
                : ''
            }
            <p style="margin-top: 50px; color: #888; font-size: 16px;">
              — The Prosperity Tech Team
            </p>
          </div>
        </div>
      </body>
      </html>
      `,
    });
  }
  async sendOrderCompletionEmail(customerEmail: string, orderId: string) {
    await this.transporter.sendMail({
      from: `"Prosperity Tech" <${process.env.SMTP_USER_EMAIL}>`,
      to: `lee@bele.ai, brian@bele.ai, ${customerEmail}`,
      // to: `karimjawwad09@gmail.com`,
      subject: 'Your Order Has Been Completed',
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Order Completed - Prosperity Tech</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.08); }
          .header { background: linear-gradient(135deg, #145374, #0f3f5a); padding: 60px 20px; text-align: center; }
          .brand-title { color: white; font-size: 52px; font-weight: 900; margin: 0; letter-spacing: 3px; text-shadow: 0 5px 15px rgba(0,0,0,0.4); }
          .content { padding: 60px 40px; text-align: center; }
          .success-box {
            background: linear-gradient(135deg, #e8f4f8, #d0eaef);
            border: 3px solid #145374;
            border-radius: 16px;
            padding: 35px;
            margin: 40px 0;
            font-size: 18px;
          }
          .btn {
            background: #145374;
            color: white;
            padding: 20px 60px;
            border-radius: 60px;
            text-decoration: none;
            font-weight: bold;
            font-size: 19px;
            display: inline-block;
            box-shadow: 0 12px 30px rgba(20,83,116,0.45);
            transition: all 0.3s;
          }
          .btn:hover {
            background: #0f3f5a;
            transform: translateY(-4px);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="brand-title">Prosperity Tech</h1>
          </div>
          <div class="content">
            <h2 style="color: #145374; font-size: 28px;">Order Completed Successfully</h2>
          
            <div class="success-box">
              <p style="margin:0; line-height: 1.7;">
                Your order (ID: ${orderId}) was successfully completed on<br>
                <strong style="font-size: 22px; color: #145374;">
                  ${new Date().toLocaleString('en-NZ', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </strong>
              </p>
              <p style="margin-top: 20px;">Your services are now available.</p>
            </div>
            <a href="https://prosperitytech.omnisuiteai.com/login" class="btn">
              Log In to View Details
            </a>
            <p style="margin-top: 50px; color: #888; font-size: 16px;">
              — The Prosperity Tech Team
            </p>
          </div>
        </div>
      </body>
      </html>
      `,
    });
  }
  async sendOrderFailureEmail(
    customerEmail: string,
    orderId: string,
    reason: string,
  ) {
    await this.transporter.sendMail({
      from: `"Prosperity Tech" <${process.env.SMTP_USER_EMAIL}>`,
      to: `lee@bele.ai, brian@bele.ai, ${customerEmail}`,
      // to: `karimjawwad09@gmail.com`,
      subject: `Order ${orderId} Failed or Rejected`,
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Order Failed - Prosperity Tech</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.08); }
          .header { background: linear-gradient(135deg, #d32f2f, #b71c1c); padding: 60px 20px; text-align: center; }
          .brand-title { color: white; font-size: 52px; font-weight: 900; margin: 0; letter-spacing: 3px; text-shadow: 0 5px 15px rgba(0,0,0,0.4); }
          .content { padding: 60px 40px; text-align: center; color: #333; }
          .error-box {
            background: #ffebee;
            border: 3px solid #d32f2f;
            border-radius: 16px;
            padding: 35px;
            margin: 40px 0;
            font-size: 18px;
            color: #c62828;
          }
          .btn {
            background: #d32f2f;
            color: white;
            padding: 20px 60px;
            border-radius: 60px;
            text-decoration: none;
            font-weight: bold;
            font-size: 19px;
            display: inline-block;
            box-shadow: 0 12px 30px rgba(211,47,47,0.45);
            transition: all 0.3s;
          }
          .btn:hover {
            background: #b71c1c;
            transform: translateY(-4px);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="brand-title">Prosperity Tech</h1>
          </div>
          <div class="content">
            <h2 style="color: #d32f2f; font-size: 28px;">Order Failed or Rejected</h2>
          
            <div class="error-box">
              <p style="margin:0; line-height: 1.7;">
                Your order (ID: ${orderId}) has failed or been rejected on<br>
                <strong style="font-size: 22px; color: #d32f2f;">
                  ${new Date().toLocaleString('en-NZ', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </strong>
              </p>
              <p style="margin-top: 20px;">Reason: ${reason}</p>
            </div>
            <a href="https://prosperitytech.omnisuiteai.com/login" class="btn">
              Log In to View Details
            </a>
            <p style="margin-top: 50px; color: #888; font-size: 16px;">
              — The Prosperity Tech Team
            </p>
          </div>
        </div>
      </body>
      </html>
      `,
    });
  }
}
