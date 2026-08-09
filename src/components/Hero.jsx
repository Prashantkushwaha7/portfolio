import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import DeveloperDesk from './3d/DeveloperDesk';
import FloatingObjects from './3d/FloatingObjects';

// Procedural 2.5D Workstation Visual Fallback Component
const WorkstationFallbackVisual = () => (
  <div className="workstation-procedural-visual">
    <div className="desk-surface">
      {/* Widescreen Monitor & Stand */}
      <div className="visual-monitor">
        <div className="monitor-bezel">
          <div className="monitor-screen">
            <div className="window-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="editor-tab">developer.js</span>
            </div>
            <pre className="code-content">
              <code>
                <span className="kw">const</span> <span className="var">developer</span> = &#123;{'\n'}
                {'  '}<span className="prop">name</span>: <span className="str">"Prashant"</span>,{'\n'}
                {'  '}<span className="prop">role</span>: <span className="str">"Full Stack Developer"</span>,{'\n'}
                {'  '}<span className="prop">skills</span>: [<span className="val">"Java"</span>, <span className="val">"React"</span>, <span className="val">"AI"</span>, <span className="val">"IoT"</span>]{'\n'}
                &#125;;{'\n\n'}
                <span className="var">console</span>.<span className="fn">log</span>(<span className="str">"Welcome to Prashant's portfolio"</span>);
              </code>
            </pre>
          </div>
        </div>
        <div className="monitor-stand"></div>
      </div>

      {/* Left Speaker */}
      <div className="visual-speaker speaker-left">
        <div className="speaker-driver woofer-cyan"></div>
      </div>

      {/* Right Speaker */}
      <div className="visual-speaker speaker-right">
        <div className="speaker-driver woofer-purple"></div>
      </div>

      {/* PC Tower with 2 RGB Fans */}
      <div className="visual-pc-tower">
        <div className="glass-panel">
          <div className="fan-wrapper fan-cyan">
            <div className="rotating-blades"></div>
          </div>
          <div className="fan-wrapper fan-purple">
            <div className="rotating-blades"></div>
          </div>
        </div>
      </div>

      {/* Keyboard & Mouse */}
      <div className="peripherals-row">
        <div className="visual-keyboard">
          <div className="rgb-strip"></div>
        </div>
        <div className="visual-mouse">
          <div className="mouse-stripe"></div>
        </div>
      </div>

      {/* Physical Desk Surface Highlight */}
      <div className="desk-edge-glow"></div>
    </div>
  </div>
);

// WebGL Error Boundary
class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn('WebGL rendering error, switching to fallback:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <WorkstationFallbackVisual />;
    }
    return this.props.children;
  }
}

// Character Split Arrays for Staggered Animation
const word1 = "PRASHANT".split('');
const word2 = "CHANDRA".split('');
const word3 = "KUSHWAHA".split('');

const Hero = () => {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const hasWebGL = !!(window.WebGLRenderingContext && 
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      setWebglSupported(hasWebGL);
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  return (
    <section className="hero-section" id="home">
      <div className="hero-container">
        {/* LEFT COLUMN — Intro Content & CTA */}
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Availability Badge */}
          <motion.div className="availability-badge" variants={itemVariants}>
            <span className="cyan-pulse-dot"></span>
            <span className="badge-text">AVAILABLE FOR OPPORTUNITIES</span>
          </motion.div>

          {/* Intro Subtitle */}
          <motion.p className="hero-subtitle-intro" variants={itemVariants}>
            HI, I'M
          </motion.p>

          {/* Main Name Typography — Character-by-Character Staggered Reveal (170ms per letter) */}
          <h1 className="hero-main-title">
            <div className="name-line-1">
              {word1.map((char, i) => (
                <motion.span
                  key={`p-${i}`}
                  className="name-char name-gradient"
                  initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.55, delay: i * 0.17, ease: 'easeOut' }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
            <div className="name-line-2">
              {word2.map((char, i) => (
                <motion.span
                  key={`c-${i}`}
                  className="name-char name-white"
                  initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.55, delay: (8 + i) * 0.17, ease: 'easeOut' }}
                >
                  {char}
                </motion.span>
              ))}
              <span className="char-space">&nbsp;</span>
              {word3.map((char, i) => (
                <motion.span
                  key={`k-${i}`}
                  className="name-char name-white"
                  initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.55, delay: (8 + 7 + i) * 0.17, ease: 'easeOut' }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </h1>

          {/* Job Title */}
          <motion.p className="hero-job-title" variants={itemVariants}>
            FULL STACK DEVELOPER
          </motion.p>

          {/* Short Professional Description */}
          <motion.p className="hero-description" variants={itemVariants}>
            I'm a Full Stack Developer focused on building immersive, high-performance web experiences with cutting-edge technologies.
          </motion.p>

          {/* CTA Buttons Group (Single Line on Desktop) */}
          <motion.div className="hero-cta-group" variants={itemVariants}>
            <motion.a
              href="#projects"
              className="btn-primary-cta"
              whileHover={{ scale: 1.03, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              VIEW MY WORK <span className="btn-arrow">→</span>
            </motion.a>

            <motion.a
              href="#contact"
              className="btn-secondary-cta"
              whileHover={{ scale: 1.03, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              LET'S TALK <span className="btn-arrow">→</span>
            </motion.a>

            <motion.a
              href="/resume"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tertiary-cta"
              whileHover={{ scale: 1.03, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              VIEW RESUME <span className="btn-arrow">↗</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN — Large Developer Workstation Scene */}
        <motion.div
          className="hero-3d-wrapper"
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="workstation-glow-backdrop"></div>
          
          {webglSupported ? (
            <WebGLErrorBoundary>
              <Canvas
                className="hero-3d-canvas"
                camera={{ position: [0, 2.6, 9.2], fov: 44 }}
                gl={{ antialias: true, alpha: true }}
              >
                <DeveloperDesk />
                <FloatingObjects />
              </Canvas>
            </WebGLErrorBoundary>
          ) : (
            <WorkstationFallbackVisual />
          )}
        </motion.div>
      </div>

      {/* BOTTOM SCROLL INDICATOR */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <a href="#about" className="scroll-link">
          <span className="scroll-text">SCROLL TO EXPLORE</span>
          <span className="scroll-arrow">↓</span>
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
