import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles, MapPin, CloudSun, Mic, Radio, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { projectsData } from '../data/projects';

// GitHub SVG Icon
const GithubIcon = ({ size = 16, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Procedural Project Visual Component
const ProjectVisual = ({ type }) => {
  if (type === 'climateLens') {
    return (
      <div className="visual-box climate-box">
        <div className="box-header">
          <span className="box-title"><MapPin size={14} /> CLIMATE LENS MAP</span>
          <span className="weather-badge"><CloudSun size={14} /> 28°C Sunny</span>
        </div>
        <div className="map-view">
          <div className="map-grid-bg"></div>
          <div className="map-pin pin-1"></div>
          <div className="map-pin pin-2"></div>
          <div className="map-pin pin-3"></div>
        </div>
        <div className="ai-story-snippet">
          <span className="snippet-tag">AI STORY</span>
          <p>"Local rainfall patterns down 14% this season, adapting crops..."</p>
        </div>
      </div>
    );
  }

  if (type === 'novaAi') {
    return (
      <div className="visual-box nova-box">
        <div className="box-header">
          <span className="box-title"><Mic size={14} /> NOVA AI VOICE ASSISTANT</span>
          <span className="status-badge"><span className="pulse-green"></span> LISTENING...</span>
        </div>
        <div className="waveform-container">
          <div className="wave-bar bar-1"></div>
          <div className="wave-bar bar-2"></div>
          <div className="wave-bar bar-3"></div>
          <div className="wave-bar bar-4"></div>
          <div className="wave-bar bar-5"></div>
          <div className="wave-bar bar-6"></div>
        </div>
        <div className="voice-log-card">
          <div className="log-line user">"Open workspace & start server"</div>
          <div className="log-line ai">➜ AI Executed: IDE opened & dev server running on port 5173</div>
        </div>
      </div>
    );
  }

  if (type === 'esp32Csi') {
    return (
      <div className="visual-box esp32-box">
        <div className="box-header">
          <span className="box-title"><Radio size={14} /> ESP32 WI-FI CSI SENSING PIPELINE</span>
          <span className="csi-badge">CAMERA-FREE MONITORED</span>
        </div>
        <div className="csi-pipeline-container">
          <div className="esp-node left">
            <span>ESP32-TX</span>
            <div className="node-dot"></div>
          </div>
          
          <div className="csi-signal-zone">
            <div className="signal-wave wave-1"></div>
            <div className="signal-wave wave-2"></div>
            <div className="human-silhouette">
              <span className="person-icon">👤</span>
            </div>
            <div className="signal-wave wave-3"></div>
          </div>

          <div className="esp-node right">
            <span>ESP32-RX</span>
            <div className="node-dot"></div>
          </div>
        </div>

        <div className="classifier-status-bar">
          <span className="status-label">AI CLASSIFIER OUTPUT:</span>
          <span className="status-val active">MOVING</span>
          <span className="status-val">SITTING</span>
          <span className="status-val">STANDING</span>
        </div>
      </div>
    );
  }

  if (type === 'shikshaSathi') {
    return (
      <div className="visual-box shiksha-box">
        <div className="box-header">
          <span className="box-title"><BookOpen size={14} /> SHIKSHASATHI PLATFORM</span>
          <span className="offline-badge">OFFLINE-FIRST SYNC</span>
        </div>
        <div className="shiksha-cards-grid">
          <div className="mini-card">
            <span className="mini-icon">📚</span>
            <span>Lessons</span>
          </div>
          <div className="mini-card">
            <span className="mini-icon">📈</span>
            <span>Progress</span>
          </div>
          <div className="mini-card">
            <span className="mini-icon">👨‍🏫</span>
            <span>Teacher</span>
          </div>
          <div className="mini-card">
            <span className="mini-icon">📱</span>
            <span>Parent</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// Modal Component for Expanded Project Details
const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      className="project-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="project-modal-content"
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="modal-header">
          <span className="modal-number">{project.number}</span>
          <span className="modal-category">{project.category}</span>
          <h2 id="modal-title" className="modal-title">{project.title}</h2>
        </div>

        <div className="modal-body-grid">
          <div className="modal-info-col">
            <div className="modal-section">
              <h3><Sparkles size={16} /> OVERVIEW</h3>
              <p>{project.description}</p>
            </div>

            <div className="modal-section">
              <h3>THE PROBLEM</h3>
              <p>{project.problem}</p>
            </div>

            <div className="modal-section">
              <h3>THE SOLUTION</h3>
              <p>{project.solution}</p>
            </div>

            <div className="modal-section">
              <h3>KEY FEATURES</h3>
              <ul className="features-list">
                {project.features.map((feat, idx) => (
                  <li key={idx}>
                    <CheckCircle2 size={15} className="check-icon" /> {feat}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="modal-visual-col">
            <ProjectVisual type={project.visualType} />

            <div className="modal-tech-stack">
              <h3>TECHNOLOGIES USED</h3>
              <div className="modal-tech-pills">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-pill-sm">{tech}</span>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <a href={project.demo} className="btn-primary-cta">
                VIEW PROJECT <ExternalLink size={16} />
              </a>
              <a href={project.github} className="btn-secondary-cta">
                GITHUB <GithubIcon size={16} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        {/* SECTION HEADER */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">03 / SELECTED WORK</span>
          <h2 className="section-title">FEATURED PROJECTS</h2>
          <p className="section-subtitle">
            Selected projects where I combine software engineering, AI, web technologies, and intelligent systems to solve practical problems.
          </p>
          <div className="section-glow-bar"></div>
        </motion.div>

        {/* PROJECTS LIST WITH ALTERNATING RHYTHM */}
        <motion.div
          className="projects-list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {projectsData.map((project) => {
            const isFullWidth = project.layoutDir === 'full';
            const isRightLayout = project.layoutDir === 'right';

            return (
              <motion.div
                key={project.id}
                className={`project-card ${isFullWidth ? 'project-card-full' : isRightLayout ? 'project-card-right' : 'project-card-left'}`}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedProject(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
              >
                {/* Background Giant Number Watermark */}
                <div className="card-number-watermark" aria-hidden="true">
                  {project.number}
                </div>

                {/* Project Visual Section */}
                <div className="project-visual-wrapper">
                  <ProjectVisual type={project.visualType} />
                </div>

                {/* Project Information Section */}
                <div className="project-info-wrapper">
                  <div className="project-meta-header">
                    <span className="project-num-tag">{project.number} /</span>
                    <span className="project-category-tag">{project.category}</span>
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>

                  <div className="project-tech-badges">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span key={tech} className="tech-pill-sm">{tech}</span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="tech-pill-sm muted">+{project.technologies.length - 5}</span>
                    )}
                  </div>

                  <div className="project-actions-bar">
                    <button
                      className="btn-project-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                    >
                      VIEW PROJECT <span className="arrow">→</span>
                    </button>

                    <a
                      href={project.github}
                      className="btn-project-github"
                      onClick={(e) => e.stopPropagation()}
                    >
                      GITHUB <GithubIcon size={15} />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* EXPANDED PROJECT MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
