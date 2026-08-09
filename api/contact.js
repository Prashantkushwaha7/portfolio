// api/contact.js — Vercel Serverless Function
// Handles POST /api/contact: validates input, sends email via Nodemailer.
// No app.listen() — Vercel invokes this handler directly.

import nodemailer from 'nodemailer';

// ---------------------------------------------------------------------------
// Inline validation (mirrors server/middleware/validation.js)
// ---------------------------------------------------------------------------
function validateContactInput({ name, email, subject, message }) {
  name    = typeof name    === 'string' ? name.trim()    : '';
  email   = typeof email   === 'string' ? email.trim()   : '';
  subject = typeof subject === 'string' ? subject.trim() : '';
  message = typeof message === 'string' ? message.trim() : '';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || name.length < 2 || name.length > 100) {
    return {
      valid: false,
      status: 400,
      message: 'Please provide your name (between 2 and 100 characters).',
    };
  }

  if (!email || !emailRegex.test(email) || email.length > 200) {
    return {
      valid: false,
      status: 400,
      message: 'Please provide a valid email address.',
    };
  }

  if (!subject || subject.length < 2) {
    subject = 'Portfolio Contact Form Message';
  }

  if (!message || message.length < 10 || message.length > 5000) {
    return {
      valid: false,
      status: 400,
      message: 'Message must contain between 10 and 5000 characters.',
    };
  }

  return { valid: true, data: { name, email, subject, message } };
}

// ---------------------------------------------------------------------------
// Inline HTML email template (mirrors server/services/emailService.js)
// ---------------------------------------------------------------------------
function createHtmlTemplate({ name, email, subject, message, timestamp }) {
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
}

// ---------------------------------------------------------------------------
// Nodemailer transporter (created per invocation — no module-level singleton)
// Vercel injects environment variables automatically; dotenv is NOT needed.
// ---------------------------------------------------------------------------
function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
}

// ---------------------------------------------------------------------------
// In-memory rate limiter (resets on cold start — acceptable for serverless)
// ---------------------------------------------------------------------------
const rateLimitMap = new Map(); // IP -> { count, resetAt }
const RATE_LIMIT_MAX     = 5;
const RATE_LIMIT_WINDOW  = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip) {
  const now  = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

// ---------------------------------------------------------------------------
// Vercel Serverless Function Handler
// ---------------------------------------------------------------------------
export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed.' });
  }

  // Derive client IP for rate limiting
  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(ip)) {
    console.warn('RATE LIMITER REJECTION for IP:', ip);
    return res.status(429).json({
      success: false,
      message: 'Too many messages. Please try again later.',
    });
  }

  // Parse body (Vercel auto-parses JSON when Content-Type is application/json)
  const body = req.body || {};

  // Validate
  const validation = validateContactInput({
    name:    body.name,
    email:   body.email,
    subject: body.subject,
    message: body.message,
  });

  if (!validation.valid) {
    return res.status(validation.status).json({
      success: false,
      message: validation.message,
    });
  }

  const { name, email, subject, message } = validation.data;

  console.log('CONTACT REQUEST RECEIVED — IP:', ip);

  // Send email
  try {
    const receiver  = process.env.CONTACT_RECEIVER || process.env.SMTP_USER;
    const timestamp = new Date().toLocaleString();

    const mailOptions = {
      from:    `"Portfolio Contact Form" <${process.env.SMTP_USER || 'no-reply@portfolio.com'}>`,
      to:      receiver,
      replyTo: email,
      subject: `[Portfolio Contact] ${subject}`,
      text:    `New Portfolio Message\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}\n\nReceived: ${timestamp}`,
      html:    createHtmlTemplate({ name, email, subject, message, timestamp }),
    };

    const transporter = createTransporter();
    const info = await transporter.sendMail(mailOptions);
    console.log('NODEMAILER SENDMAIL RESULT:', info?.messageId || 'Sent successfully');

    return res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('❌ Email Delivery Failure:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Unable to send your message right now. Please try again later.',
    });
  }
}
