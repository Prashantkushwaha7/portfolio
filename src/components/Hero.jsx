import React from 'react';
import { motion } from 'framer-motion';
import profileImg from '../assets/images/profile.png';

// Character Split Arrays for Staggered Animation
const word1 = "PRASHANT".split('');
const word2 = "CHANDRA".split('');
const word3 = "KUSHWAHA".split('');

const Hero = () => {
  return (
    <section className="hero-section" id="home">
      {/* Background Decorative Ambient Glows */}
      <div className="hero-ambient-glow hero-glow-left" aria-hidden="true"></div>
      <div className="hero-ambient-glow hero-glow-right" aria-hidden="true"></div>

      <div className="hero-container">
        {/* TWO-COLUMN HERO COMPOSITION (Desktop: Left Text, Right Photo; Mobile: Centered Stack) */}
        <div className="hero-upper-layout">
          {/* LEFT CONTENT COLUMN (55-60% width on Desktop) */}
          <div className="hero-text-block">
            {/* 1. Availability Badge */}
            <motion.div
              className="availability-badge"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
            >
              <span className="cyan-pulse-dot"></span>
              <span className="badge-text">AVAILABLE FOR OPPORTUNITIES</span>
            </motion.div>

            {/* 2. Intro Subtitle */}
            <motion.p
              className="hero-subtitle-intro"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3, ease: 'easeOut' }}
            >
              HI, I'M
            </motion.p>

            {/* 3. Main Name Typography with character reveal */}
            <h1 className="hero-main-title" aria-label="Prashant Chandra Kushwaha">
              <div className="name-line-1">
                {word1.map((char, i) => (
                  <motion.span
                    key={`p-${i}`}
                    className="name-char name-gradient"
                    initial={{ opacity: 0, y: 18, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.45, delay: 0.4 + i * 0.04, ease: 'easeOut' }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <div className="name-line-2">
                <span className="name-word">
                  {word2.map((char, i) => (
                    <motion.span
                      key={`c-${i}`}
                      className="name-char name-white"
                      initial={{ opacity: 0, y: 18, filter: 'blur(5px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.45, delay: 0.4 + (8 + i) * 0.035, ease: 'easeOut' }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
                <span className="char-space">&nbsp;</span>
                <span className="name-word">
                  {word3.map((char, i) => (
                    <motion.span
                      key={`k-${i}`}
                      className="name-char name-white"
                      initial={{ opacity: 0, y: 18, filter: 'blur(5px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ duration: 0.45, delay: 0.4 + (8 + 7 + i) * 0.035, ease: 'easeOut' }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </div>
            </h1>

            {/* 4. Job Title */}
            <motion.p
              className="hero-job-title"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85, ease: 'easeOut' }}
            >
              FULL STACK DEVELOPER
            </motion.p>

            {/* 5. Professional Description */}
            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.95, ease: 'easeOut' }}
            >
              I'm a Full Stack Developer focused on building immersive, high-performance web experiences with cutting-edge technologies.
            </motion.p>

            {/* 6. CTA Buttons Group */}
            <motion.div
              className="hero-cta-group"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.05, ease: 'easeOut' }}
            >
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
          </div>

          {/* RIGHT PROFILE PHOTO COLUMN (40-45% width on Desktop, Top on Mobile) */}
          <motion.div
            className="hero-avatar-block"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-avatar-wrapper">
              {/* Cyan / Blue Outer Glow */}
              <div className="hero-avatar-glow" aria-hidden="true"></div>

              {/* Dotted Orbital Ring */}
              <div className="hero-orbital-track" aria-hidden="true"></div>

              {/* Glowing Orbital Arc */}
              <div className="hero-orbital-arc" aria-hidden="true"></div>

              {/* Secondary Thin Ring */}
              <div className="hero-secondary-ring" aria-hidden="true"></div>

              {/* Moving Orbiting Particles */}
              <div className="hero-particles-track" aria-hidden="true">
                <div className="orbital-particle particle-cyan"></div>
                <div className="orbital-particle particle-purple"></div>
              </div>

              {/* Main Circular Avatar Ring with Purple/Blue Gradient */}
              <div className="hero-avatar-ring">
                <img
                  src={profileImg}
                  alt="Prashant Chandra Kushwaha"
                  className="hero-avatar-img"
                  loading="eager"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM SCROLL INDICATOR */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
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
