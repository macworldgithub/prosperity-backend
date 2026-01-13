// import { Injectable } from '@nestjs/common';
// import * as nodemailer from 'nodemailer';

// @Injectable()
// export class EmailService {
//   private transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT || 587,
//     secure: process.env.SMTP_SECURE === 'true',
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   async sendPinResetEmail(email: string, newPin: string) {
//     await this.transporter.sendMail({
//       from: `"Prosperity Tech" <${process.env.SMTP_USER_EMAIL}>`,
//       to: email,
//       subject: 'Your New 4-Digit PIN',
//       html: `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>Your New PIN - Prosperity Tech</title>
//         <style>
//           body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa; margin: 0; padding: 0; }
//           .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.08); }
//           .header {
//             background: linear-gradient(135deg, #145374, #0f3f5a);
//             padding: 60px 20px;
//             text-align: center;
//           }
//           .brand-title {
//             color: white;
//             font-size: 52px;
//             font-weight: 900;
//             margin: 0;
//             letter-spacing: 3px;
//             text-shadow: 0 5px 15px rgba(0,0,0,0.4);
//           }
//           .content {
//             padding: 60px 40px;
//             text-align: center;
//             color: #333;
//           }
//           .pin-box {
//             display: inline-block;
//             background: #145374;
//             color: white;
//             font-size: 56px;
//             font-weight: bold;
//             letter-spacing: 20px;
//             padding: 30px 45px;
//             border-radius: 20px;
//             margin: 40px 0;
//             box-shadow: 0 15px 35px rgba(20, 83, 116, 0.4);
//           }
//           .alert-box {
//             background: #e8f4f8;
//             border: 3px solid #145374;
//             border-radius: 16px;
//             padding: 25px;
//             margin: 35px 0;
//             font-size: 17px;
//             line-height: 1.6;
//           }
//           .btn {
//             display: inline-block;
//             background: #145374;
//             color: white;
//             font-weight: bold;
//             font-size: 20px;
//             padding: 20px 60px;
//             text-decoration: none;
//             border-radius: 60px;
//             margin: 30px 0;
//             box-shadow: 0 12px 30px rgba(20, 83, 116, 0.45);
//             transition: all 0.3s;
//           }
//           .btn:hover {
//             background: #0f3f5a;
//             transform: translateY(-4px);
//             box-shadow: 0 18px 40px rgba(20, 83, 116, 0.55);
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h1 class="brand-title">Prosperity Tech</h1>
//           </div>

//           <div class="content">
//             <h2 style="color: #145374; margin-bottom: 15px; font-size: 28px;">
//               Your New 4-Digit PIN
//             </h2>
//             <p style="font-size: 19px; color: #555; margin-bottom: 40px;">
//               Use this PIN to log in to your Prosperity Tech account
//             </p>

//             <div class="pin-box">${newPin}</div>

//             <!-- Login Button -->
//             <a href="https://prosperitytech.omnisuiteai.com/login" class="btn">

//               Log In Now
//             </a>

//             <p style="margin-top: 50px; color: #888; font-size: 16px;">
//               — The Prosperity Tech Team
//             </p>
//           </div>
//         </div>
//       </body>
//       </html>
//       `,
//     });
//   }

//   async sendPinChangedEmail(email: string) {
//     await this.transporter.sendMail({
//       from: `"Prosperity Tech" <${process.env.SMTP_USER_EMAIL}>`,
//       to: email,
//       subject: 'Your PIN Has Been Changed',
//       html: `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>PIN Changed - Prosperity Tech</title>
//         <style>
//           body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa; margin: 0; padding: 0; }
//           .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.08); }
//           .header { background: linear-gradient(135deg, #145374, #0f3f5a); padding: 60px 20px; text-align: center; }
//           .brand-title { color: white; font-size: 52px; font-weight: 900; margin: 0; letter-spacing: 3px; text-shadow: 0 5px 15px rgba(0,0,0,0.4); }
//           .content { padding: 60px 40px; text-align: center; }
//           .success-box {
//             background: linear-gradient(135deg, #e8f4f8, #d0eaef);
//             border: 3px solid #145374;
//             border-radius: 16px;
//             padding: 35px;
//             margin: 40px 0;
//             font-size: 18px;
//           }
//           .btn {
//             background: #145374;
//             color: white;
//             padding: 20px 60px;
//             border-radius: 60px;
//             text-decoration: none;
//             font-weight: bold;
//             font-size: 19px;
//             display: inline-block;
//             box-shadow: 0 12px 30px rgba(20,83,116,0.45);
//             transition: all 0.3s;
//           }
//           .btn:hover {
//             background: #0f3f5a;
//             transform: translateY(-4px);
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h1 class="brand-title">Prosperity Tech</h1>
//           </div>
//           <div class="content">
//             <h2 style="color: #145374; font-size: 28px;">PIN Changed Successfully</h2>

//             <div class="success-box">
//               <p style="margin:0; line-height: 1.7;">
//                 Your account PIN was successfully updated on<br>
//                 <strong style="font-size: 22px; color: #145374;">
//                   ${new Date().toLocaleString('en-NZ', {
//                     weekday: 'long',
//                     day: 'numeric',
//                     month: 'long',
//                     year: 'numeric',
//                     hour: 'numeric',
//                     minute: '2-digit',
//                   })}
//                 </strong>
//               </p>
//             </div>

//             <p style="font-size: 18px; color: #555; margin: 30px 0;">
//               If you didn't make this change, please secure your account immediately.
//             </p>

//             <a href="https://prosperitytech.omnisuiteai.com/login" class="btn">
//               Go to Login
//             </a>

//             <p style="margin-top: 50px; color: #888; font-size: 16px;">
//               — The Prosperity Tech Team
//             </p>
//           </div>
//         </div>
//       </body>
//       </html>
//       `,
//     });
//   }
//   async sendFailureEmail(
//     functionName: string,
//     errorMessage: string,
//     details?: any,
//   ) {
//     const detailsStr = details
//       ? `<pre style="background: #f8f9fa; padding: 15px; border-radius: 8px; overflow: auto;">${JSON.stringify(details, null, 2)}</pre>`
//       : '';
//     await this.transporter.sendMail({
//       from: `"Prosperity Tech" <${process.env.SMTP_USER_EMAIL}>`,
//       to: 'brian@bele.ai, lee@bele.ai, karimjawwad09@gmail.com',
//       // to: `karimjawwad09@gmail.com`,
//       subject: `Failure in ${functionName}`,
//       html: `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>Function Failure - Prosperity Tech</title>
//         <style>
//           body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa; margin: 0; padding: 0; }
//           .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.08); }
//           .header {
//             background: linear-gradient(135deg, #145374, #0f3f5a);
//             padding: 60px 20px;
//             text-align: center;
//           }
//           .brand-title {
//             color: white;
//             font-size: 52px;
//             font-weight: 900;
//             margin: 0;
//             letter-spacing: 3px;
//             text-shadow: 0 5px 15px rgba(0,0,0,0.4);
//           }
//           .content {
//             padding: 60px 40px;
//             text-align: center;
//             color: #333;
//           }
//           .error-box {
//             background: #ffebee;
//             border: 3px solid #d32f2f;
//             border-radius: 16px;
//             padding: 25px;
//             margin: 35px 0;
//             font-size: 17px;
//             line-height: 1.6;
//             color: #c62828;
//           }
//           .details-box {
//             background: #e8f4f8;
//             border: 3px solid #145374;
//             border-radius: 16px;
//             padding: 25px;
//             margin: 35px 0;
//             font-size: 15px;
//             text-align: left;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h1 class="brand-title">Prosperity Tech</h1>
//           </div>
//           <div class="content">
//             <h2 style="color: #d32f2f; margin-bottom: 15px; font-size: 28px;">
//               Failure in ${functionName}
//             </h2>
//             <p style="font-size: 19px; color: #555; margin-bottom: 40px;">
//               An error occurred during the execution of ${functionName} at ${new Date().toLocaleString(
//                 'en-NZ',
//                 {
//                   weekday: 'long',
//                   day: 'numeric',
//                   month: 'long',
//                   year: 'numeric',
//                   hour: 'numeric',
//                   minute: '2-digit',
//                 },
//               )}.
//             </p>
//             <div class="error-box">
//               <strong>Error Message:</strong><br>
//               ${errorMessage}
//             </div>
//             ${
//               details
//                 ? `
//             <div class="details-box">
//               <strong>Additional Details:</strong><br>
//               ${detailsStr}
//             </div>
//             `
//                 : ''
//             }
//             <p style="margin-top: 50px; color: #888; font-size: 16px;">
//               — The Prosperity Tech Team
//             </p>
//           </div>
//         </div>
//       </body>
//       </html>
//       `,
//     });
//   }
//   async sendOrderCompletionEmail(customerEmail: string, orderId: string) {
//     await this.transporter.sendMail({
//       from: `"Prosperity Tech" <${process.env.SMTP_USER_EMAIL}>`,
//       to: `lee@bele.ai, brian@bele.ai, karimjawwad09@gmail.com, ${customerEmail}`,
//       // to: `karimjawwad09@gmail.com`,
//       subject: 'Your Order Has Been Completed',
//       html: `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>Order Completed - Prosperity Tech</title>
//         <style>
//           body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa; margin: 0; padding: 0; }
//           .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.08); }
//           .header { background: linear-gradient(135deg, #145374, #0f3f5a); padding: 60px 20px; text-align: center; }
//           .brand-title { color: white; font-size: 52px; font-weight: 900; margin: 0; letter-spacing: 3px; text-shadow: 0 5px 15px rgba(0,0,0,0.4); }
//           .content { padding: 60px 40px; text-align: center; }
//           .success-box {
//             background: linear-gradient(135deg, #e8f4f8, #d0eaef);
//             border: 3px solid #145374;
//             border-radius: 16px;
//             padding: 35px;
//             margin: 40px 0;
//             font-size: 18px;
//           }
//           .btn {
//             background: #145374;
//             color: white;
//             padding: 20px 60px;
//             border-radius: 60px;
//             text-decoration: none;
//             font-weight: bold;
//             font-size: 19px;
//             display: inline-block;
//             box-shadow: 0 12px 30px rgba(20,83,116,0.45);
//             transition: all 0.3s;
//           }
//           .btn:hover {
//             background: #0f3f5a;
//             transform: translateY(-4px);
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h1 class="brand-title">Prosperity Tech</h1>
//           </div>
//           <div class="content">
//             <h2 style="color: #145374; font-size: 28px;">Order Completed Successfully</h2>

//             <div class="success-box">
//               <p style="margin:0; line-height: 1.7;">
//                 Your order (ID: ${orderId}) was successfully completed on<br>
//                 <strong style="font-size: 22px; color: #145374;">
//                   ${new Date().toLocaleString('en-NZ', {
//                     weekday: 'long',
//                     day: 'numeric',
//                     month: 'long',
//                     year: 'numeric',
//                     hour: 'numeric',
//                     minute: '2-digit',
//                   })}
//                 </strong>
//               </p>
//               <p style="margin-top: 20px;">Your services are now available.</p>
//             </div>
//             <a href="https://prosperitytech.omnisuiteai.com/login" class="btn">
//               Log In to View Details
//             </a>
//             <p style="margin-top: 50px; color: #888; font-size: 16px;">
//               — The Prosperity Tech Team
//             </p>
//           </div>
//         </div>
//       </body>
//       </html>
//       `,
//     });
//   }
//   async sendOrderFailureEmail(
//     customerEmail: string,
//     orderId: string,
//     reason: string,
//   ) {
//     await this.transporter.sendMail({
//       from: `"Prosperity Tech" <${process.env.SMTP_USER_EMAIL}>`,
//       to: `lee@bele.ai, brian@bele.ai, karimjawwad09@gmail.com, ${customerEmail}`,
//       // to: `karimjawwad09@gmail.com`,
//       subject: `Order ${orderId} Failed or Rejected`,
//       html: `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>Order Failed - Prosperity Tech</title>
//         <style>
//           body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa; margin: 0; padding: 0; }
//           .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.08); }
//           .header { background: linear-gradient(135deg, #d32f2f, #b71c1c); padding: 60px 20px; text-align: center; }
//           .brand-title { color: white; font-size: 52px; font-weight: 900; margin: 0; letter-spacing: 3px; text-shadow: 0 5px 15px rgba(0,0,0,0.4); }
//           .content { padding: 60px 40px; text-align: center; color: #333; }
//           .error-box {
//             background: #ffebee;
//             border: 3px solid #d32f2f;
//             border-radius: 16px;
//             padding: 35px;
//             margin: 40px 0;
//             font-size: 18px;
//             color: #c62828;
//           }
//           .btn {
//             background: #d32f2f;
//             color: white;
//             padding: 20px 60px;
//             border-radius: 60px;
//             text-decoration: none;
//             font-weight: bold;
//             font-size: 19px;
//             display: inline-block;
//             box-shadow: 0 12px 30px rgba(211,47,47,0.45);
//             transition: all 0.3s;
//           }
//           .btn:hover {
//             background: #b71c1c;
//             transform: translateY(-4px);
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h1 class="brand-title">Prosperity Tech</h1>
//           </div>
//           <div class="content">
//             <h2 style="color: #d32f2f; font-size: 28px;">Order Failed or Rejected</h2>

//             <div class="error-box">
//               <p style="margin:0; line-height: 1.7;">
//                 Your order (ID: ${orderId}) has failed or been rejected on<br>
//                 <strong style="font-size: 22px; color: #d32f2f;">
//                   ${new Date().toLocaleString('en-NZ', {
//                     weekday: 'long',
//                     day: 'numeric',
//                     month: 'long',
//                     year: 'numeric',
//                     hour: 'numeric',
//                     minute: '2-digit',
//                   })}
//                 </strong>
//               </p>
//               <p style="margin-top: 20px;">Reason: ${reason}</p>
//             </div>
//             <a href="https://prosperitytech.omnisuiteai.com/login" class="btn">
//               Log In to View Details
//             </a>
//             <p style="margin-top: 50px; color: #888; font-size: 16px;">
//               — The Prosperity Tech Team
//             </p>
//           </div>
//         </div>
//       </body>
//       </html>
//       `,
//     });
//   }
//   async sendPhysicalSimActivationEmail(params: {
//   to: string;
//   fullName: string;
//   phoneNumber: string;
//   customerNumber: string;
// }) {
//   const { to, fullName, phoneNumber, customerNumber } = params;

//   await this.transporter.sendMail({
//     from: `"Prosperity Tech" <${process.env.SMTP_USER_EMAIL}>`,
//     to: `${to}, lee@bele.ai, brian@bele.ai, karimjawwad09@gmail.com`,
//     subject: 'Your SIM Card is Now Active!',
//     html: `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <title>Your SIM is Active - Prosperity Tech</title>
//         <style>
//           body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f8f9fa; margin: 0; padding: 0; }
//           .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.08); }
//           .header { background: linear-gradient(135deg, #145374, #0f3f5a); padding: 60px 20px; text-align: center; }
//           .brand-title { color: white; font-size: 52px; font-weight: 900; margin: 0; letter-spacing: 3px; text-shadow: 0 5px 15px rgba(0,0,0,0.4); }
//           .content { padding: 60px 40px; color: #333; line-height: 1.7; }
//           .info-table { width: 100%; border-collapse: collapse; margin: 30px 0; }
//           .info-table td { padding: 12px 0; border-bottom: 1px solid #eee; }
//           .label { font-weight: bold; color: #145374; width: 180px; }
//           .value { color: #333; }
//           .important-box { background: #e8f4f8; border-left: 5px solid #145374; padding: 25px; margin: 35px 0; border-radius: 8px; }
//           .btn { display: inline-block; background: #145374; color: white; padding: 18px 50px; text-decoration: none; border-radius: 60px; font-weight: bold; font-size: 18px; margin: 20px 0; box-shadow: 0 10px 25px rgba(20,83,116,0.4); }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <div class="header">
//             <h1 class="brand-title">Prosperity Tech</h1>
//           </div>
//           <div class="content">
//             <h2 style="color: #145374; font-size: 28px;">Dear ${fullName},</h2>
//             <p style="font-size: 18px;">
//               Thank you for requesting your SIM activation — <strong>this is now active and ready to use</strong>.
//             </p>

//             <h3 style="color: #145374; margin-top: 40px;">Account Information</h3>
//             <table class="info-table">
//               <tr>
//                 <td class="label">Customer Name:</td>
//                 <td class="value">${fullName}</td>
//               </tr>
//               <tr>
//                 <td class="label">Phone Number:</td>
//                 <td class="value">${phoneNumber}</td>
//               </tr>
//               <tr>
//                 <td class="label">Customer Number:</td>
//                 <td class="value">${customerNumber}</td>
//               </tr>
//             </table>

//             <div class="important-box">
//               <h3 style="color: #145374; margin-top: 0;">Getting Started</h3>
//               <p><strong>Reinsert the SIM card then restart the phone</strong> to start using your new SIM card.</p>

//               <h3 style="color: #145374; margin-top: 25px;">Your First Bill</h3>
//               <p>
//                 Your first bill will be higher than your monthly plan price.<br>
//                 We bill in advance, so your first bill will be for the remainder of this month plus next month.<br>
//                 <em>For example: if you activate mid-December, you will be charged pro-rata for December + full January in advance.</em>
//               </p>

//               <h3 style="color: #145374; margin-top: 25px;">Direct Debit</h3>
//               <p>
//                 You have direct debit set up.<br>
//                 We will use the bank account or credit card details you provided.<br>
//                 An invoice will be sent at the start of each month showing the amount to be debited.<br>
//                 <strong>No action is required</strong> — it's all automatic.
//               </p>
//             </div>

//             <p style="text-align: center;">
//               <a href="https://prosperitytech.omnisuiteai.com/login" class="btn">
//                 Log In to Your Account
//               </a>
//             </p>

//             <p style="margin-top: 50px; color: #888; font-size: 16px; text-align: center;">
//               Thank you from the team at<br>
//               <strong>Prosperity Tech</strong>
//             </p>
//           </div>
//         </div>
//       </body>
//       </html>
//     `,
//   });
// }
// }

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
                Your account PIN was successfully updated.
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
      to: 'brian@bele.ai, lee@bele.ai, karimjawwad09@gmail.com',
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
          An error occurred during the execution of ${functionName}.
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
      to: `lee@bele.ai, brian@bele.ai, karimjawwad09@gmail.com, ${customerEmail}`,
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
                Your order (ID: ${orderId}) was successfully completed.
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
      to: `lee@bele.ai, brian@bele.ai, karimjawwad09@gmail.com, ${customerEmail}`,
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
                Your order (ID: ${orderId}) has failed or been rejected.
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

  async sendPhysicalSimActivationEmail(params: {
    to: string;
    fullName: string;
    phoneNumber: string;
    customerNumber: string;
  }) {
    const { to, fullName, phoneNumber, customerNumber } = params;

    await this.transporter.sendMail({
      from: `"Prosperity Tech" <${process.env.SMTP_USER_EMAIL}>`,
      to: `${to}, lee@bele.ai, brian@bele.ai, karimjawwad09@gmail.com`,
      subject: 'Your SIM Card is Now Active!',
      html: `
      <!doctype html>
      <html lang="en">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <title>Your SIM is Active</title>
        <style>
          /* Basic reset */
          body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
          table { border-collapse: collapse !important; }
          img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; display: block; }
          a { color: #1a73e8; text-decoration: none; }

          /* Container */
          .email-wrapper { width: 100%; background: #ffffff; padding: 0; margin: 0; }

          /* The inner content table -- max width for desktop */
          .email-container { width: 100%; max-width: 720px; margin: 0 auto; }

          /* Logo */
          .logo { width: 160px; max-width: 40%; height: auto; display: block; margin: 36px auto 18px auto; }

          /* Content cell */
          .content { font-family: Arial, Helvetica, sans-serif; color: #111111; font-size: 14px; line-height: 20px; padding: 0 110px 40px 110px; text-align: left; }

          /* Headings and paragraphs */
          .greeting { margin: 12px 0 22px 0; }
          .section-heading { margin-top: 18px; margin-bottom: 8px; font-size: 13px; font-weight: 700; color: #000; text-transform: uppercase; letter-spacing: 0.3px; }
          .body-paragraph { margin: 8px 0 12px 0; }
          .small-gap { height: 14px; }
          .footer { text-align: center; padding: 28px 0 40px 0; font-size: 12px; color: #1a73e8; }

          /* Make phone numbers, customer numbers break nicely on small screens */
          .break-word { word-break: break-word; }

          /* Responsive rules */
          @media only screen and (max-width: 600px) {
            .content { padding: 0 20px 30px 20px !important; font-size: 15px !important; line-height: 22px !important; }
            .logo { width: 120px !important; margin-top: 24px !important; margin-bottom: 14px !important; }
            .section-heading { font-size: 12px !important; }
            .footer { padding: 20px 0 30px 0 !important; font-size: 13px !important; }
          }

          /* Outlook fallback to ensure fixed width */
          @media all and (min-width:721px) {
            .gmail-hide { display: none !important; }
          }
        </style>
      </head>

      <body style="margin:0; padding:0; background:#ffffff;">
        <!-- outer wrapper -->
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="email-wrapper">
          <tr>
            <td align="center">
              <!--[if mso]>
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="720"><tr><td>
              <![endif]-->

              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="email-container">
                <!-- logo row -->
                <tr>
                  <td align="center">
                    <img src="cid:belar_logo" alt="Belar logo" class="logo" style="display:block; width:160px; max-width:40%; height:auto;" />
                  </td>
                </tr>

                <!-- content row -->
                <tr>
                  <td class="content" style="font-family: Arial, Helvetica, sans-serif; color:#111111; font-size:14px; line-height:20px; padding:0 110px 40px 110px; text-align:left;">
                    <p class="greeting" style="margin:12px 0 22px 0;">Dear ${fullName || ''},</p>

                    <p class="body-paragraph" style="margin:8px 0 12px 0;">
                      Thank you for requesting your SIM activation, this is now active and ready to use.
                    </p>

                    <div class="section">
                      <div class="section-heading" style="margin-top:18px; margin-bottom:8px; font-size:13px; font-weight:700; color:#000; text-transform:uppercase; letter-spacing:0.3px;">ACCOUNT INFORMATION</div>

                      <div class="body-paragraph break-word" style="margin:8px 0 12px 0;">
                        Customer Name:<br>
                        ${fullName || ''}
                      </div>

                      <div class="body-paragraph break-word" style="margin:8px 0 12px 0;">
                        Phone Number:<br>
                        ${phoneNumber || ''}
                      </div>

                      <div class="body-paragraph break-word" style="margin:8px 0 12px 0;">
                        Customer Number:<br>
                        ${customerNumber || ''}
                      </div>
                    </div>

                    <div class="section">
                      <div class="section-heading" style="margin-top:18px; margin-bottom:8px; font-size:13px; font-weight:700; color:#000; text-transform:uppercase; letter-spacing:0.3px;">IMPORTANT INFORMATION</div>

                      <div class="body-paragraph" style="margin:8px 0 12px 0; font-weight:700;">Getting started</div>

                      <div class="body-paragraph" style="margin:8px 0 12px 0;">
                        Reinsert the SIM card then restart the phone to start using your new SIM card.
                      </div>

                      <div class="body-paragraph" style="margin:8px 0 12px 0; font-weight:700;">Your first bill will be higher than your monthly plan price</div>

                      <div class="body-paragraph" style="margin:8px 0 12px 0;">
                        We bill in advance, so your first bill will be for the remainder of this month plus next month. For<br style="display:none;"/> 
                        example, if you activate on mid December then you will be charged A) the pro rata for the rest of<br style="display:none;"/> 
                        December plus B) January in advance.
                      </div>


                      <div class="body-paragraph" style="margin:8px 0 12px 0;">
                        We will use the bank account or credit card details you provided in your activation request form.<br>
                        An invoice will be sent to you at the start of each month showing you how much money will be<br>
                        direct debited from your account. No action is required as you have direct debit setup.
                      </div>
                    </div>

                    <div style="height:8px;"></div>

                    <div class="footer" style="text-align:center; padding:28px 0 40px 0; font-size:12px; color:#1a73e8;">
                      <a href="#" style="color:#1a73e8; text-decoration:none;">Unsubscribe</a> - <a href="#" style="color:#1a73e8; text-decoration:none;">Unsubscribe Preferences</a>
                    </div>
                  </td>
                </tr>
              </table>

              <!--[if mso]>
              </td></tr></table>
              <![endif]-->
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
      attachments: [
        {
          filename: 'belar.png',
          path: 'capture.png', // keep or change to your logo path
          cid: 'belar_logo',
        },
      ],
    });
  }
}
