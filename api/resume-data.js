// api/resume-data.js — Vercel Serverless Function
// Returns base64 encoded PDF string to bypass IDM extension interception

import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed.' });
  }

  try {
    const candidatePaths = [
      path.join(process.cwd(), 'public', 'Prashant chandra kushwaha_cv.pdf'),
      path.join(process.cwd(), 'public', 'prashantchandra_resume.pdf'),
      path.join(process.cwd(), 'public', 'prashant_resume.pdf'),
      path.join(process.cwd(), 'Prashant chandra kushwaha_cv.pdf'),
    ];

    let foundPath = null;
    for (const p of candidatePaths) {
      if (fs.existsSync(p)) {
        foundPath = p;
        break;
      }
    }

    if (!foundPath) {
      return res.status(404).json({ success: false, message: 'Resume PDF file not found.' });
    }

    const pdfBuffer = fs.readFileSync(foundPath);
    const base64Data = pdfBuffer.toString('base64');

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    return res.status(200).json({
      success: true,
      data: base64Data,
    });
  } catch (err) {
    console.error('Error reading resume PDF data:', err);
    return res.status(500).json({ success: false, message: 'Failed to read resume PDF data.' });
  }
}
