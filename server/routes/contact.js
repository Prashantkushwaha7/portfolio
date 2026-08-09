import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import { validateContactInput } from '../middleware/validation.js';
import { sendContactEmail } from '../services/emailService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Rate limiter: 5 requests per 15 minutes per IP (In-memory store resets on server restart)
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // 5 requests per 15 minutes per IP
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    console.warn("RATE LIMITER REJECTION triggered for IP:", req.ip);
    res.status(429).json({
      success: false,
      message: 'Too many messages. Please try again later.',
    });
  },
});

// Health check endpoint (No rate limiter applied)
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Portfolio API is running.',
  });
});

// GET /api/resume-data endpoint (Returns base64 encoded PDF string to bypass IDM extension interception)
router.get('/resume-data', (req, res) => {
  try {
    const filePath = path.join(__dirname, '../../public/prashant_resume.pdf');
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'Resume PDF file not found.' });
    }
    const pdfBuffer = fs.readFileSync(filePath);
    const base64Data = pdfBuffer.toString('base64');
    return res.status(200).json({
      success: true,
      data: base64Data,
    });
  } catch (err) {
    console.error('Error reading resume PDF data:', err);
    return res.status(500).json({ success: false, message: 'Failed to read resume PDF data.' });
  }
});

// POST /api/contact endpoint
router.post('/contact', contactLimiter, validateContactInput, async (req, res) => {
  console.log("CONTACT REQUEST RECEIVED");
  console.log("CONTACT REQUEST IP:", req.ip);

  try {
    const { name, email, subject, message } = req.body;

    const info = await sendContactEmail({ name, email, subject, message });
    console.log("NODEMAILER SENDMAIL RESULT:", info?.messageId || info || "Sent successfully");

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully.',
    });
  } catch (error) {
    console.error('❌ Email Delivery Failure Error:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Unable to send your message right now. Please try again later.',
    });
  }
});

export default router;
