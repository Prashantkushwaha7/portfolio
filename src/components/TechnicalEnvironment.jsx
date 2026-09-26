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
              <span className="editor-tab">tech-environment.js</span>
            </div>
            <pre className="code-content">
              <code>
                <span className="kw">const</span> <span className="var">environment</span> = &#123;{'\n'}
                {'  '}<span className="prop">coreStack</span>: [<span className="val">"Java"</span>, <span className="val">"Spring Boot"</span>, <span className="val">"React"</span>, <span className="val">"Node.js"</span>],{'\n'}
                {'  '}<span className="prop">advanced</span>: [<span className="val">"AI/ML"</span>, <span className="val">"IoT"</span>, <span className="val">"ESP32"</span>, <span className="val">"MongoDB"</span>, <span className="val">"MySQL"</span>],{'\n'}
                {'  '}<span className="prop">status</span>: <span className="str">"Operational & Ready"</span>{'\n'}
                &#125;;{'\n\n'}
                <span className="var">console</span>.<span className="fn">log</span>(<span className="str">"Technical environment fully loaded"</span>);
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

const techBadges = [
  { name: 'Java', role: 'Core Backend & OOP', icon: '☕', color: '#38bdf8' },
  { name: 'React', role: 'Interactive UI Architecture', icon: '⚛️', color: '#06b6d4' },
  { name: 'Node.js', role: 'Server Runtime & APIs', icon: '🟢', color: '#22c55e' },
  { name: 'Spring Boot', role: 'Enterprise Microservices', icon: '🍃', color: '#84cc16' },
  { name: 'AI & Neural', role: 'Intelligent Automation', icon: '🤖', color: '#c084fc' },
  { name: 'IoT / ESP32', role: 'Hardware & Embedded', icon: '⚡', color: '#f43f5e' },
  { name: 'MongoDB', role: 'NoSQL Document Store', icon: '🍃', color: '#10b981' },
  { name: 'MySQL', role: 'Relational Database Engine', icon: '🐬', color: '#3b82f6' },
  { name: 'Git & GitHub', role: 'Version Control & CI/CD', icon: '🐙', color: '#a855f7' },
];

const TechnicalEnvironment = () => {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const hasWebGL = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setWebglSupported(hasWebGL);
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  return (
    <div className="tech-environment-container">
      {/* HEADER FOR TECHNICAL ENVIRONMENT */}
      <motion.div
        className="tech-environment-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
      >
        <div className="tech-env-pill">
          <span className="pill-dot"></span>
          <span>HARDWARE & SOFTWARE WORKSTATION</span>
        </div>
        <h3 className="tech-env-title">MY TECHNICAL ENVIRONMENT</h3>
        <p className="tech-env-subtitle">
          Interactive 3D workstation showcasing the core full-stack technologies, embedded IoT systems, and cloud databases driving my engineering workflow.
        </p>
      </motion.div>

      {/* 3D WORKSTATION CANVAS CARD */}
      <motion.div
        className="tech-env-workstation-card"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="workstation-glow-backdrop"></div>
        <div className="workstation-frame-header">
          <div className="frame-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="frame-title">developer-workstation-3d.view</span>
          <span className="frame-status">ONLINE 60FPS</span>
        </div>

        <div className="workstation-canvas-container">
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
        </div>

        {/* Tech Environment Badges Grid */}
        <div className="tech-env-badge-grid">
          {techBadges.map((badge, index) => (
            <motion.div
              key={badge.name}
              className="tech-env-badge-card"
              style={{ '--badge-color': badge.color }}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ translateY: -3, scale: 1.02 }}
            >
              <span className="badge-card-icon">{badge.icon}</span>
              <div className="badge-card-info">
                <span className="badge-card-name">{badge.name}</span>
                <span className="badge-card-role">{badge.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TechnicalEnvironment;
