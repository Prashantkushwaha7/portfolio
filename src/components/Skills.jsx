import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillCategories, destinationNode } from '../data/skills';

const Skills = () => {
  const [activeTooltip, setActiveTooltip] = useState(null); // skill.id + index tag for uniqueness
  const [hoveredRow, setHoveredRow] = useState(null); // category.id

  const handleChipHover = (tooltipKey) => {
    setActiveTooltip(tooltipKey);
  };

  const handleChipLeave = () => {
    setActiveTooltip(null);
  };

  return (
    <section className="skills-section" id="skills">
      {/* Background Watermark */}
      <div className="skills-watermark" aria-hidden="true">
        02
      </div>

      <div className="skills-container">
        {/* SECTION HEADER */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">02 / TECH STACK</span>
          <h2 className="section-title">CONNECTED TECHNOLOGY ECOSYSTEM</h2>
          <p className="section-subtitle">
            Hover over any moving technology to pause the conveyor belt and inspect its role in my development workflow.
          </p>
          <div className="section-glow-bar"></div>
        </motion.div>

        {/* ECOSYSTEM PANELS CONTAINER */}
        <div className="skills-panels-wrapper">
          {skillCategories.map((category, index) => {
            const isLastCategory = index === skillCategories.length - 1;
            const isRowHovered = hoveredRow === category.id;
            const isRightToLeft = category.direction === 'right-to-left';

            // Triple duplicate the skills array for a 100% seamless marquee loop
            const duplicatedSkills = [
              ...category.skills.map((s) => ({ ...s, loopGroup: 'a' })),
              ...category.skills.map((s) => ({ ...s, loopGroup: 'b' })),
              ...category.skills.map((s) => ({ ...s, loopGroup: 'c' })),
            ];

            return (
              <React.Fragment key={category.id}>
                {/* 100% FIXED CATEGORY PANEL */}
                <div className={`category-panel-fixed ${category.isSpecial ? 'special-ai-iot-panel' : ''}`}>
                  {/* STATIC CATEGORY HEADER (NEVER MOVES) */}
                  <div className="category-static-header">
                    <div className="category-number-badge">
                      <span className="cat-num">{category.number}</span>
                      <span className="cat-icon">{category.icon}</span>
                    </div>
                    <div className="category-title-block">
                      <h3 className="category-title">{category.title}</h3>
                      <p className="category-description">{category.description}</p>
                    </div>
                  </div>

                  {/* OVERFLOW HIDDEN TRACK FOR MOVING TECH CHAIN */}
                  <div
                    className="tech-track-overflow-hidden"
                    onMouseEnter={() => setHoveredRow(category.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <div
                      className={`tech-chain-marquee direction-${category.direction} ${
                        isRowHovered ? 'paused-marquee' : ''
                      }`}
                      style={{ '--marquee-duration': category.duration }}
                    >
                      {duplicatedSkills.map((skill, sIdx) => {
                        const tooltipKey = `${skill.id}-${skill.loopGroup}-${sIdx}`;
                        const isTooltipOpen = activeTooltip === tooltipKey;

                        return (
                          <div key={tooltipKey} className="tech-chip-item-wrapper">
                            <button
                              type="button"
                              className={`tech-chip-item ${isTooltipOpen ? 'chip-active' : ''}`}
                              style={{ '--chip-accent': skill.color }}
                              onMouseEnter={() => handleChipHover(tooltipKey)}
                              onMouseLeave={handleChipLeave}
                              onFocus={() => handleChipHover(tooltipKey)}
                              onBlur={handleChipLeave}
                              aria-label={`${skill.name} technology details`}
                            >
                              <span className="chip-icon">{skill.icon}</span>
                              <span className="chip-name">{skill.name}</span>
                            </button>

                            {/* FLOW CONNECTOR ARROW BETWEEN CHIPS */}
                            <div className="chip-connector-arrow">
                              <span className="arrow-dash"></span>
                              <span className="arrow-head">{isRightToLeft ? '←' : '→'}</span>
                            </div>

                            {/* COMPACT POPOVER TOOLTIP */}
                            <AnimatePresence>
                              {isTooltipOpen && (
                                <motion.div
                                  className="tech-popover-tooltip"
                                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <div className="tooltip-arrow"></div>
                                  <div className="tooltip-header">
                                    <span className="tooltip-icon">{skill.icon}</span>
                                    <span className="tooltip-title">{skill.name}</span>
                                  </div>
                                  <p className="tooltip-body">{skill.description}</p>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* STATIONARY VERTICAL CONNECTOR BETWEEN FIXED PANELS */}
                {!isLastCategory && (
                  <div className="stationary-vertical-connector">
                    <div className="vertical-line-bg"></div>
                    <div className="vertical-line-pulse"></div>
                    <div className="vertical-particle">✦</div>
                  </div>
                )}
              </React.Fragment>
            );
          })}

          {/* FINAL STATIONARY CONNECTOR & DESTINATION NODE */}
          <div className="stationary-vertical-connector">
            <div className="vertical-line-bg"></div>
            <div className="vertical-line-pulse"></div>
            <div className="vertical-particle">✦</div>
          </div>

          {/* REAL-WORLD SYSTEMS DESTINATION NODE (FIXED) */}
          <div className="real-world-destination-node">
            <div className="node-icon-wrapper">
              <span className="destination-icon">{destinationNode.icon}</span>
            </div>
            <div className="node-content">
              <h3 className="destination-title">{destinationNode.title}</h3>
              <p className="destination-subtitle">{destinationNode.subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
