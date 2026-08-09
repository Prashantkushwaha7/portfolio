import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure dotenv is loaded BEFORE the transporter is created
dotenv.config({ path: path.join(__dirname, '../../.env') });


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

// Verify Transporter configuration on server startup
export const verifyTransporter = async () => {
  if (!process.env.SMTP_USER || process.env.SMTP_USER.includes('your-email')) {
    console.log('ℹ️  SMTP info: Using placeholder credentials in .env. Real email delivery will require valid SMTP_USER & SMTP_PASSWORD.');
    return;
  }

  try {
    await transporter.verify();
    console.log('✅ SMTP Server Connection Verified Successfully!');
  } catch (error) {
    console.warn('⚠️  SMTP Connection Warning:', error.message);
  }
};

// HTML Email Template Generator
const createHtmlTemplate = ({ name, email, subject, message, timestamp }) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #060712; color: #f3f4f6; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #0c0e1b; border: 1px solid #8b5cf6; border-radius: 12px; padding: 30px; }
          .header { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px; margin-bottom: 20px; }
          .title { font-size: 20px; font-weight: 700; color: #06b6d4; margin: 0; }
          .field { margin-bottom: 15px; }
          .label { font-size: 11px; font-weight: 700; letter-spacing: 1px; color: #9ca3af; text-transform: uppercase; margin-bottom: 4px; }
          .value { font-size: 15px; color: #ffffff; line-height: 1.5; background: rgba(255,255,255,0.04); padding: 10px 14px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.06); }
          .footer { font-size: 12px; color: #6b7280; text-align: center; margin-top: 25px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 15px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="title">NEW PORTFOLIO MESSAGE</h1>
          </div>
          
          <div class="field">
            <div class="label">SENDER NAME</div>
            <div class="value">${name}</div>
          </div>

          <div class="field">
            <div class="label">SENDER EMAIL</div>
            <div class="value">${email}</div>
          </div>

          <div class="field">
            <div class="label">SUBJECT</div>
            <div class="value">${subject}</div>
          </div>

          <div class="field">
            <div class="label">MESSAGE CONTENT</div>
            <div class="value" style="white-space: pre-wrap;">${message}</div>
          </div>

          <div class="footer">
            Received: ${timestamp} • Prashant Kushwaha Portfolio
          </div>
        </div>
      </body>
    </html>
  `;
};

// Send Email Function
export const sendContactEmail = async ({ name, email, subject, message }) => {
  const receiver = process.env.CONTACT_RECEIVER || process.env.SMTP_USER;
  const timestamp = new Date().toLocaleString();

  const mailOptions = {
    from: `"Portfolio Contact Form" <${process.env.SMTP_USER || 'no-reply@portfolio.com'}>`,
    to: receiver,
    replyTo: email, // Directly reply to visitor when clicking Reply
    subject: `[Portfolio Contact] ${subject}`,
    text: `New Portfolio Message\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\nReceived: ${timestamp}`,
    html: createHtmlTemplate({ name, email, subject, message, timestamp }),
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};
