import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Cpu, Layers, Brain } from 'lucide-react';

const infoCards = [
  {
    number: '01',
    title: 'JAVA DEVELOPMENT',
    description: 'Building backend applications, APIs, and reliable software using Java.',
    icon: Code2,
    accentColor: '#f89820',
    isPrimary: true,
  },
  {
    number: '02',
    title: 'ARTIFICIAL INTELLIGENCE',
    description: 'Exploring intelligent applications, AI assistants, automation, and practical AI solutions.',
    icon: Cpu,
    accentColor: '#a855f7',
    isPrimary: true,
  },
  {
    number: '03',
    title: 'FULL STACK DEVELOPMENT',
    description: 'Building complete web experiences across frontend, backend, APIs, and databases.',
    icon: Layers,
    accentColor: '#38bdf8',
    isPrimary: false,
  },
  {
    number: '04',
    title: 'PROBLEM SOLVING',
    description: 'Developing strong DSA and algorithmic thinking through coding and practical projects.',
    icon: Brain,
    accentColor: '#34d399',
    isPrimary: false,
  },
];

const statsData = [
  { target: 20, suffix: '+', label: 'PROJECTS' },
  { target: 10, suffix: '+', label: 'TECHNOLOGIES' },
  { target: 3, suffix: '+', label: 'DOMAINS' },
];

// Reusable Counter Component
const AnimatedCounter = ({ target, suffix, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1500;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="stat-card">
      <div className="stat-number">
        {count}
        <span className="stat-suffix">{suffix}</span>
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
};

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
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
    <section className="about-section" id="about">
      {/* Background Watermark Depth Element */}
      <div className="about-watermark" aria-hidden="true">
        01
      </div>

      <div className="about-container">
        {/* SECTION HEADER */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">01 / ABOUT</span>
          <h2 className="section-title">ABOUT ME</h2>
          <div className="section-glow-bar"></div>
        </motion.div>

        {/* MAIN TWO-COLUMN LAYOUT */}
        <div className="about-grid">
          {/* LEFT COLUMN — Narrative Text */}
          <motion.div
            className="about-text-column"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.p className="about-paragraph" variants={itemVariants}>
              I'm Prashant Chandra Kushwaha, a Computer Science student and{' '}
              <span className="text-highlight">Full Stack Developer</span> passionate about{' '}
              <span className="text-highlight">Java</span>, <span className="text-highlight">Spring Boot</span>,{' '}
              <span className="text-highlight">React</span>, <span className="text-highlight">Node.js</span>, and{' '}
              <span className="text-highlight">Artificial Intelligence</span>. I enjoy turning ideas into practical software—from backend systems and APIs to high-performance <span className="text-highlight">Web Development</span> and intelligent AI-powered solutions.
            </motion.p>

            <motion.p className="about-paragraph" variants={itemVariants}>
              I also specialize in full-stack architecture and have hands-on experience building <span className="text-highlight">IoT</span> projects with <span className="text-highlight">ESP32 and Wi-Fi CSI sensing</span>. I’m driven by <span className="text-highlight">problem solving</span>, continuous learning, and building robust engineering systems that go beyond just code.
            </motion.p>
          </motion.div>

          {/* RIGHT COLUMN — 4 Glass Information Cards */}
          <motion.div
            className="about-cards-column"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {infoCards.map((card) => {
              const IconComponent = card.icon;

              return (
                <motion.div
                  key={card.number}
                  className={`info-card ${card.isPrimary ? 'primary-focus-card' : ''}`}
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  style={{ '--card-accent': card.accentColor }}
                >
                  <div className="card-header">
                    <div className="card-num-group">
                      <span className="card-number">{card.number}</span>
                      {card.isPrimary && <span className="primary-tag">PRIMARY INTEREST</span>}
                    </div>
                    <div
                      className="card-icon-wrapper"
                      style={{ color: card.accentColor }}
                    >
                      <IconComponent size={22} />
                    </div>
                  </div>

                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-description">{card.description}</p>
                  
                  {/* Subtle card glow overlay */}
                  <div
                    className="card-hover-glow"
                    style={{
                      background: `radial-gradient(circle, ${card.accentColor}22 0%, transparent 70%)`,
                    }}
                  ></div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* STATISTICS COUNTER BAR */}
        <motion.div
          className="stats-container"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          {statsData.map((stat, idx) => (
            <AnimatedCounter
              key={idx}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
