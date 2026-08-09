import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code2, Rocket, Lightbulb, BookOpen, Award, CheckCircle } from 'lucide-react';
import { timelineEvents, certificationItems } from '../data/journey';

const renderIcon = (type) => {
  switch (type) {
    case 'graduation':
      return <GraduationCap size={20} />;
    case 'code':
      return <Code2 size={20} />;
    case 'rocket':
      return <Rocket size={20} />;
    case 'lightbulb':
      return <Lightbulb size={20} />;
    case 'book':
      return <BookOpen size={20} />;
    default:
      return <Award size={20} />;
  }
};

const Journey = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  return (
    <section className="journey-section" id="journey">
      {/* Watermark Graphic */}
      <div className="journey-watermark" aria-hidden="true">
        04
      </div>

      <div className="journey-container">
        {/* SECTION HEADER */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">04 / JOURNEY</span>
          <h2 className="section-title">MY JOURNEY</h2>
          <p className="section-subtitle">
            Learning, building, experimenting, and continuously growing as a developer.
          </p>
          <div className="section-glow-bar"></div>
        </motion.div>

        {/* TIMELINE SECTION */}
        <div className="timeline-wrapper">
          {/* Central Animated Line */}
          <div className="timeline-center-line">
            <div className="line-pulse"></div>
          </div>

          <motion.div
            className="timeline-events-list"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {timelineEvents.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={event.id}
                  className={`timeline-item ${isEven ? 'item-left' : 'item-right'}`}
                  variants={itemVariants}
                >
                  {/* Glowing Timeline Node */}
                  <div className="timeline-node">
                    <div className="node-inner-glow"></div>
                  </div>

                  {/* Glassmorphism Event Card */}
                  <motion.div
                    className="timeline-card"
                    whileHover={{ y: -4 }}
                  >
                    <div className="timeline-card-header">
                      <div className="card-icon-tag">
                        {renderIcon(event.icon)}
                      </div>
                      <div className="card-tags">
                        <span className="card-category">{event.category}</span>
                        <span className="card-status">{event.status}</span>
                      </div>
                    </div>

                    <h3 className="timeline-card-title">{event.title}</h3>
                    <p className="timeline-card-desc">{event.description}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* LEARNING & CERTIFICATIONS SUBSECTION */}
        <motion.div
          className="certifications-subsection"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="certs-header">
            <Award size={18} className="certs-title-icon" />
            <h3>LEARNING & CERTIFICATIONS</h3>
          </div>

          <div className="certifications-grid">
            {certificationItems.map((cert) => (
              <motion.div
                key={cert.id}
                className="cert-card"
                whileHover={{ y: -3, scale: 1.02 }}
              >
                <div className="cert-icon-wrapper">
                  <CheckCircle size={18} />
                </div>
                <div className="cert-info">
                  <h4 className="cert-title">{cert.title}</h4>
                  <span className="cert-category">{cert.category}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Journey;
