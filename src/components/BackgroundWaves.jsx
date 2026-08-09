import React from 'react';

const BackgroundWaves = () => {
  return (
    <div className="background-waves-container" aria-hidden="true">
      {/* Radial Glows */}
      <div className="glow-spot glow-purple"></div>
      <div className="glow-spot glow-blue"></div>
      <div className="glow-spot glow-cyan"></div>

      {/* Grid pattern overlay */}
      <div className="bg-grid-overlay"></div>

      {/* Ambient SVG Contour Waves */}
      <svg
        className="svg-waves svg-waves-left"
        viewBox="0 0 600 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGradLeft1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="waveGradLeft2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* 3D Thin Contour Line Paths - Left Side */}
        <path d="M-100,50 Q150,200 80,450 T-50,850 T200,1050" stroke="url(#waveGradLeft1)" strokeWidth="1.2" />
        <path d="M-80,80 Q170,220 100,470 T-30,870 T220,1070" stroke="url(#waveGradLeft1)" strokeWidth="1" opacity="0.8" />
        <path d="M-60,110 Q190,240 120,490 T-10,890 T240,1090" stroke="url(#waveGradLeft2)" strokeWidth="1.5" opacity="0.6" />
        <path d="M-40,140 Q210,260 140,510 T10,910 T260,1110" stroke="url(#waveGradLeft1)" strokeWidth="1" opacity="0.5" />
        <path d="M-20,170 Q230,280 160,530 T30,930 T280,1130" stroke="url(#waveGradLeft2)" strokeWidth="1.2" opacity="0.4" />
        <path d="M0,200 Q250,300 180,550 T50,950 T300,1150" stroke="url(#waveGradLeft1)" strokeWidth="1.5" opacity="0.3" />
        <path d="M20,230 Q270,320 200,570 T70,970 T320,1170" stroke="url(#waveGradLeft2)" strokeWidth="1" opacity="0.2" />
      </svg>

      <svg
        className="svg-waves svg-waves-right"
        viewBox="0 0 600 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGradRight1" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="waveGradRight2" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* 3D Thin Contour Line Paths - Right Side */}
        <path d="M700,0 Q400,250 500,550 T650,850 T400,1100" stroke="url(#waveGradRight1)" strokeWidth="1.2" />
        <path d="M680,30 Q380,270 480,570 T630,870 T380,1120" stroke="url(#waveGradRight1)" strokeWidth="1" opacity="0.8" />
        <path d="M660,60 Q360,290 460,590 T610,890 T360,1140" stroke="url(#waveGradRight2)" strokeWidth="1.5" opacity="0.6" />
        <path d="M640,90 Q340,310 440,610 T590,910 T340,1160" stroke="url(#waveGradRight1)" strokeWidth="1" opacity="0.5" />
        <path d="M620,120 Q320,330 420,630 T570,930 T320,1180" stroke="url(#waveGradRight2)" strokeWidth="1.2" opacity="0.4" />
        <path d="M600,150 Q300,350 400,650 T550,950 T300,1200" stroke="url(#waveGradRight1)" strokeWidth="1.5" opacity="0.3" />
        <path d="M580,180 Q280,370 380,670 T530,970 T280,1220" stroke="url(#waveGradRight2)" strokeWidth="1" opacity="0.2" />
      </svg>
    </div>
  );
};

export default BackgroundWaves;
