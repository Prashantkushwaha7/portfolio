import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ZoomIn, ZoomOut, RotateCcw, Download, Loader2 } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure bundled Vite worker URL
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// Base64 helper converter
const base64ToUint8Array = (base64) => {
  const raw = window.atob(base64);
  const uint8Array = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    uint8Array[i] = raw.charCodeAt(i);
  }
  return uint8Array;
};

const ResumeViewer = () => {
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pdfDocRef = useRef(null);
  const pagesContainerRef = useRef(null);

  const apiEndpoint = '/api/resume-data';

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const loadPdfData = async () => {
      console.log('Fetching PDF data via JSON API endpoint:', apiEndpoint);

      try {
        const res = await fetch(apiEndpoint);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} ${res.statusText} - Failed to fetch resume data`);
        }

        const json = await res.json();
        if (!json.success || !json.data) {
          throw new Error(json.message || 'Invalid resume data response from server.');
        }

        console.log('JSON API payload received successfully. Base64 length:', json.data.length);

        // Convert base64 to Uint8Array
        const uint8Array = base64ToUint8Array(json.data);
        console.log('Converted to Uint8Array. Size in bytes:', uint8Array.byteLength);

        // Pass binary data directly to PDF.js
        const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
        const pdf = await loadingTask.promise;

        console.log('PDF.js document initialized successfully. Total pages:', pdf.numPages);

        if (!isMounted) return;
        pdfDocRef.current = pdf;
        setNumPages(pdf.numPages);
        setLoading(false);
      } catch (err) {
        console.error('Resume PDF render error:', err);
        if (isMounted) {
          setError(`Unable to render resume: ${err.message || 'Unknown error'}`);
          setLoading(false);
        }
      }
    };

    loadPdfData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Render pages when PDF is loaded or scale changes
  useEffect(() => {
    if (!pdfDocRef.current || loading || !pagesContainerRef.current) return;

    const renderPages = async () => {
      const container = pagesContainerRef.current;
      container.innerHTML = ''; // Clear previous page canvases

      for (let pageNum = 1; pageNum <= pdfDocRef.current.numPages; pageNum++) {
        try {
          const page = await pdfDocRef.current.getPage(pageNum);
          const viewport = page.getViewport({ scale });

          // Container wrapper for page border/shadow
          const pageWrapper = document.createElement('div');
          pageWrapper.className = 'pdf-page-wrapper';

          // Canvas element
          const canvas = document.createElement('canvas');
          canvas.className = 'pdf-page-canvas';
          const context = canvas.getContext('2d');

          // Output device pixel ratio for crisp rendering
          const outputScale = window.devicePixelRatio || 1;
          canvas.width = Math.floor(viewport.width * outputScale);
          canvas.height = Math.floor(viewport.height * outputScale);
          canvas.style.width = `${Math.floor(viewport.width)}px`;
          canvas.style.height = `${Math.floor(viewport.height)}px`;

          const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

          pageWrapper.appendChild(canvas);
          container.appendChild(pageWrapper);

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
            transform: transform,
          };

          await page.render(renderContext).promise;
          console.log(`Page ${pageNum} rendered successfully at scale ${scale}.`);
        } catch (renderErr) {
          console.error(`Error rendering page ${pageNum}:`, renderErr);
        }
      }
    };

    renderPages();
  }, [numPages, scale, loading]);

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2.5));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.8));
  const resetZoom = () => setScale(1.4);

  return (
    <div className="resume-viewer-container">
      {/* Top Header Bar */}
      <header className="resume-viewer-header">
        <div className="resume-header-left">
          <a href="/" className="btn-back-portfolio">
            <ArrowLeft size={16} /> <span>BACK TO PORTFOLIO</span>
          </a>
        </div>

        <div className="resume-header-center">
          <span className="resume-title-brand">PRASHANT CHANDRA KUSHWAHA</span>
          <span className="resume-subtitle-tag">RESUME</span>
        </div>

        {/* Minimal Viewer Controls */}
        <div className="resume-header-right">
          <div className="resume-controls-group">
            <button onClick={zoomOut} className="control-btn" title="Zoom Out">
              <ZoomOut size={16} />
            </button>
            <span className="zoom-value">{Math.round((scale / 1.4) * 100)}%</span>
            <button onClick={zoomIn} className="control-btn" title="Zoom In">
              <ZoomIn size={16} />
            </button>
            <button onClick={resetZoom} className="control-btn" title="Reset Zoom">
              <RotateCcw size={14} />
            </button>
            <a
              href="/prashantchandra_resume.pdf"
              download="Prashant_Chandra_Kushwaha_CV.pdf"
              className="control-btn"
              title="Download CV"
            >
              <Download size={15} />
            </a>
          </div>
        </div>
      </header>

      {/* Main Canvas Scroll Container */}
      <main className="resume-scroll-viewport">
        {loading && (
          <div className="resume-loading-state">
            <Loader2 size={32} className="spinner-icon" />
            <span>Rendering resume with PDF.js...</span>
          </div>
        )}

        {error && (
          <div className="resume-error-state">
            <p>{error}</p>
            <a href="/" className="btn-back-portfolio">Return to Portfolio</a>
          </div>
        )}

        <div ref={pagesContainerRef} className="pdf-pages-canvas-list"></div>
      </main>
    </div>
  );
};

export default ResumeViewer;
