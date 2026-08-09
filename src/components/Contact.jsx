import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, CheckCircle2, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
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

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'
  const [apiErrorMessage, setApiErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (formState === 'error') {
      setFormState('idle');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your name (minimum 2 characters).';
    }

    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Message must contain at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormState('sending');
    setApiErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          subject: 'New Portfolio Contact Form Message',
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormState('success');
      } else {
        setApiErrorMessage(data.message || 'Unable to send your message. Please try again.');
        setFormState('error');
      }
    } catch (err) {
      console.error('Submission failed:', err);
      setApiErrorMessage('Unable to connect to the server. Please check your connection and try again.');
      setFormState('error');
    }
  };

  const handleResetForm = () => {
    setFormData({ fullName: '', email: '', message: '' });
    setErrors({});
    setFormState('idle');
  };

  const renderSocialIcon = (iconName) => {
    switch (iconName) {
      case 'github':
        return <GithubIcon size={18} />;
      case 'linkedin':
        return <LinkedinIcon size={18} />;
      case 'mail':
        return <Mail size={18} />;
      default:
        return <Mail size={18} />;
    }
  };

  return (
    <section className="contact-section" id="contact">
      {/* Background Watermark */}
      <div className="contact-watermark" aria-hidden="true">
        05
      </div>

      <div className="contact-container">
        {/* SECTION HEADER */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">05 / CONTACT</span>
          <h2 className="section-title">LET'S BUILD SOMETHING TOGETHER</h2>
          <p className="section-subtitle">
            Have a project, opportunity, or idea? I'd love to hear from you.
          </p>
          <div className="section-glow-bar"></div>
        </motion.div>

        {/* MAIN TWO-COLUMN LAYOUT */}
        <div className="contact-grid">
          {/* LEFT COLUMN — Intro, Contact Info & Socials */}
          <motion.div
            className="contact-info-col"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="contact-intro-text">{contactData.introMessage}</p>

            {/* Info Cards */}
            <div className="contact-cards-group">
              <div className="contact-info-card">
                <div className="card-label">AVAILABILITY</div>
                <div className="card-val-row">
                  <span className="cyan-pulse-dot"></span>
                  <span className="availability-status">{contactData.availability}</span>
                </div>
              </div>
            </div>

            {/* Social Links Glass Buttons */}
            <div className="social-links-group">
              <span className="socials-label">CONNECT WITH ME</span>
              <div className="socials-buttons-row">
                {contactData.socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="social-glass-btn"
                    whileHover={{ y: -3, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {renderSocialIcon(link.icon)}
                    <span>{link.name}</span>
                    <ArrowRight size={14} className="social-arrow" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN — Glassmorphism Contact Form */}
          <motion.div
            className="contact-form-col"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-form-card">
              <AnimatePresence mode="wait">
                {/* SUCCESS STATE UI */}
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    className="form-state-card success-state"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="success-icon-badge">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3>MESSAGE SENT SUCCESSFULLY</h3>
                    <p>Thanks for reaching out. Your message has been received and I'll get back to you soon.</p>
                    <button className="btn-primary-cta" onClick={handleResetForm}>
                      SEND ANOTHER MESSAGE <ArrowRight size={16} />
                    </button>
                  </motion.div>
                ) : (
                  /* IDLE / SENDING / ERROR FORM STATE UI */
                  <motion.form
                    key="form"
                    className="contact-form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Error Banner if API error occurs */}
                    {formState === 'error' && (
                      <div className="form-error-banner" role="alert">
                        <AlertCircle size={18} />
                        <span>{apiErrorMessage || 'Unable to send your message. Please try again.'}</span>
                        <button type="button" onClick={() => setFormState('idle')} className="btn-retry">
                          TRY AGAIN
                        </button>
                      </div>
                    )}

                    {/* FULL NAME FIELD */}
                    <div className="form-group">
                      <label htmlFor="fullName" className="form-label">
                        FULL NAME <span className="req-star">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className={`glass-input ${errors.fullName ? 'input-error' : ''}`}
                        placeholder="Enter your name"
                        value={formData.fullName}
                        onChange={handleChange}
                        disabled={formState === 'sending'}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                      />
                      {errors.fullName && (
                        <span id="fullName-error" className="form-error-msg" role="alert">
                          <AlertCircle size={13} /> {errors.fullName}
                        </span>
                      )}
                    </div>

                    {/* EMAIL ADDRESS FIELD */}
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        EMAIL ADDRESS <span className="req-star">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={`glass-input ${errors.email ? 'input-error' : ''}`}
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={formState === 'sending'}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && (
                        <span id="email-error" className="form-error-msg" role="alert">
                          <AlertCircle size={13} /> {errors.email}
                        </span>
                      )}
                    </div>

                    {/* MESSAGE FIELD */}
                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        MESSAGE <span className="req-star">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className={`glass-textarea ${errors.message ? 'input-error' : ''}`}
                        placeholder="Tell me about your project or message..."
                        value={formData.message}
                        onChange={handleChange}
                        disabled={formState === 'sending'}
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                      ></textarea>
                      {errors.message && (
                        <span id="message-error" className="form-error-msg" role="alert">
                          <AlertCircle size={13} /> {errors.message}
                        </span>
                      )}
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                      type="submit"
                      className="btn-primary-cta btn-submit-full"
                      disabled={formState === 'sending'}
                    >
                      {formState === 'sending' ? (
                        <>
                          <Loader2 size={18} className="spinner-icon" /> Sending message...
                        </>
                      ) : (
                        <>
                          SEND MESSAGE <Send size={16} />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
