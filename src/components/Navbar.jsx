import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Journey', href: '#journey' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'journey', 'contact'];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Top of page guarantee — force Home active when near top
      if (scrollY < 150) {
        setActiveSection('Home');
        return;
      }

      // Check section bounding rects to update active navbar item
      const currentScrollPosition = scrollY + window.innerHeight / 3;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (currentScrollPosition >= top - 100) {
            const matchedItem = navItems.find((item) => item.href === `#${id}`);
            if (matchedItem) {
              setActiveSection(matchedItem.name);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Execute on initial load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, item) => {
    if (e) {
      e.preventDefault();
    }
    setActiveSection(item.name);
    setMobileMenuOpen(false);

    const targetId = item.href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navHeader = document.querySelector('.navbar-header');
      const navHeight = navHeader ? navHeader.getBoundingClientRect().height : 70;
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      const scrollTarget = Math.max(0, elementTop - navHeight);

      window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth',
      });

      if (window.history.pushState) {
        window.history.pushState(null, '', item.href);
      } else {
        window.location.hash = item.href;
      }
    }
  };

  return (
    <motion.header
      className={`navbar-header ${isScrolled ? 'nav-scrolled' : 'nav-top'}`}
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="navbar-container">
        {/* Brand Logo */}
        <a
          href="#home"
          className="nav-brand"
          onClick={(e) => handleNavClick(e, { name: 'Home', href: '#home' })}
        >
          PRASHANT
        </a>

        {/* Desktop Navigation Links */}
        <ul className="nav-links-desktop">
          {navItems.map((item) => {
            const isActive = activeSection === item.name;

            return (
              <li key={item.name} className="nav-item-wrapper">
                <a
                  href={item.href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, item)}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      className="active-underline"
                      layoutId="activeUnderline"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          className="mobile-toggle-btn"
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            className="mobile-menu-drawer"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {navItems.map((item, index) => {
              const isActive = activeSection === item.name;

              return (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, item)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                >
                  {item.name}
                </motion.a>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
