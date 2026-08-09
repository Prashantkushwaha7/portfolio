import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contact.js';
import { verifyTransporter } from './services/emailService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed Origins for CORS during development & production
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:5176',
  'http://localhost:5177',
  'http://localhost:5178',
  'http://localhost:5179',
  'http://localhost:5180',
  'http://localhost:5181',
  'http://localhost:5182',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser tools (e.g., curl, Postman) with no origin
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('CORS policy restriction'));
    },
    credentials: true,
  })
);

// JSON Body Parser Middleware
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Serve static public assets with explicit inline headers for PDF files
const publicDir = path.join(__dirname, '../public');
app.use(
  express.static(publicDir, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.pdf')) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="prashant_resume.pdf"');
        res.setHeader('Cache-Control', 'public, max-age=3600');
      }
    },
  })
);

// Exact route for the resume PDF (Express 5: no wildcard /*.pdf allowed)
app.get('/prashant_resume.pdf', (req, res) => {
  const filePath = path.join(publicDir, 'prashant_resume.pdf');
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="prashant_resume.pdf"');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.sendFile(filePath);
});

// Mount API routes
app.use('/api', contactRoutes);

// Serve built frontend dist in production
const distDir = path.join(__dirname, '../dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  // SPA fallback: serve index.html for all non-API routes (enables /resume, etc.)
  // Express 5 catch-all syntax: /{*path}
  app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
} else {
  // Dev-mode root info response
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'Prashant Kushwaha Portfolio API Server',
      healthCheck: '/api/health',
    });
  });
}

// Start express server and assign to top-level variable
const server = app.listen(PORT, async () => {
  console.log(`🚀 Portfolio API Server listening on port ${PORT}`);
  await verifyTransporter();
});

// Ensure Node process remains active continuously
process.stdin.resume();

export default app;
