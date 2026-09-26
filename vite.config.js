import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import { fileURLToPath } from 'url'

// Custom Vite plugin to serve resume data JSON to bypass IDM extension URL interception
const pdfResumeDataPlugin = () => ({
  name: 'pdf-resume-data-plugin',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url && req.url.startsWith('/api/resume-data')) {
        let filePath = fileURLToPath(new URL('./public/Prashant chandra kushwaha_cv.pdf', import.meta.url));
        if (!fs.existsSync(filePath)) {
          filePath = fileURLToPath(new URL('./public/prashantchandra_resume.pdf', import.meta.url));
        }
        if (!fs.existsSync(filePath)) {
          filePath = fileURLToPath(new URL('./public/prashant_resume.pdf', import.meta.url));
        }
        if (fs.existsSync(filePath)) {
          const pdfBuffer = fs.readFileSync(filePath);
          const base64Data = pdfBuffer.toString('base64');
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, data: base64Data }));
          return;
        }
      }
      next();
    });
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), pdfResumeDataPlugin()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
