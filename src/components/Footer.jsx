import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Mail } from 'lucide-react';
import { contactData } from '../data/contact';

// Custom SVG Icons for GitHub and LinkedIn
const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSocialIcon = (iconName) => {
    switch (iconName) {
      case 'github':
        return <GithubIcon size={16} />;
      case 'linkedin':
        return <LinkedinIcon size={16} />;
      case 'mail':
        return <Mail size={16} />;
      default:
        return <Mail size={16} />;
    }
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        {/* TOP BRAND & NAVIGATION ROW */}
        <div className="footer-top-row">
          <div className="footer-brand-col">
            <h2 className="footer-brand-title">PRASHANT CHANDRA KUSHWAHA</h2>
            <p className="footer-brand-subtitle">Full Stack Developer • AI • IoT</p>
          </div>

          <ul className="footer-nav-links">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="footer-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* SOCIAL BUTTONS & BACK TO TOP ROW */}
        <div className="footer-middle-row">
          <div className="footer-socials-group">
            {contactData.socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                className="footer-social-btn"
                whileHover={{ y: -3, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                aria-label={link.name}
              >
                {renderSocialIcon(link.icon)}
                <span>{link.name}</span>
              </motion.a>
            ))}
          </div>

          <motion.button
            className="back-to-top-btn"
            onClick={scrollToTop}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Scroll back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={16} />
          </motion.button>
        </div>

        {/* DIVIDER LINE */}
        <div className="footer-divider"></div>

        {/* BOTTOM COPYRIGHT & TECH CREDITS */}
        <div className="footer-bottom-row">
          <span className="copyright-text">
            © 2026 Prashant Chandra Kushwaha. All rights reserved.
          </span>
          <span className="tech-credit-text">
            Built with <span className="accent-text">React</span> • <span className="accent-text">Framer Motion</span> • <span className="accent-text">Three.js</span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
