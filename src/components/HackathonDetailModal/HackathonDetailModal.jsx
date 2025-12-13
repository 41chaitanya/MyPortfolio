import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaLinkedin, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import './HackathonDetailModal.css';

export default function HackathonDetailModal({ isOpen, hackathon, onClose }) {
  if (!hackathon) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="hackathon-modal-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          <motion.div
            className="hackathon-modal-container"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <div className="hackathon-modal-content">
              {/* Close Button */}
              <button className="hackathon-modal-close" onClick={onClose}>
                <FaTimes size={24} />
              </button>

              {/* Header Section */}
              <div className="hackathon-modal-header">
                <img 
                  src={hackathon.image} 
                  alt={hackathon.title}
                  className="hackathon-modal-image"
                />
                <div className="hackathon-modal-header-content">
                  <h1 className="hackathon-modal-title">{hackathon.title}</h1>
                  <p className="hackathon-modal-date">{hackathon.date}</p>
                </div>
              </div>

              {/* Description Section */}
              <div className="hackathon-modal-section">
                <h2 className="hackathon-modal-section-title">About</h2>
                <p className="hackathon-modal-description">{hackathon.description}</p>
              </div>

              {/* Gallery Section */}
              {hackathon.gallery && hackathon.gallery.length > 0 && (
                <div className="hackathon-modal-section">
                  <h2 className="hackathon-modal-section-title">Event Gallery</h2>
                  <div className="hackathon-modal-gallery">
                    {hackathon.gallery.map((image, index) => (
                      <div key={index} className="hackathon-gallery-item">
                        <img 
                          src={image.src} 
                          alt={image.caption}
                          className="hackathon-gallery-image"
                        />
                        <p className="hackathon-gallery-caption">{image.caption}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Members Section */}
              {hackathon.teamMembers && hackathon.teamMembers.length > 0 && (
                <div className="hackathon-modal-section">
                  <h2 className="hackathon-modal-section-title">Team Members</h2>
                  <div className="hackathon-team-grid">
                    {hackathon.teamMembers.map((member, index) => (
                      <div key={index} className="hackathon-team-member">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="hackathon-team-member-image"
                        />
                        <h3 className="hackathon-team-member-name">{member.name}</h3>
                        <p className="hackathon-team-member-role">{member.role}</p>
                        {member.linkedin && (
                          <a 
                            href={member.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hackathon-team-member-link"
                            title="LinkedIn Profile"
                          >
                            <FaLinkedin size={20} />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements Section */}
              {hackathon.achievements && (
                <div className="hackathon-modal-section">
                  <h2 className="hackathon-modal-section-title">Achievements</h2>
                  <p className="hackathon-modal-achievements">{hackathon.achievements}</p>
                </div>
              )}

              {/* Project Links Section */}
              {hackathon.projectLinks && (
                <div className="hackathon-modal-section">
                  <h2 className="hackathon-modal-section-title">Project Links</h2>
                  <div className="hackathon-project-links">
                    {hackathon.projectLinks.github && (
                      <a 
                        href={hackathon.projectLinks.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hackathon-project-link"
                      >
                        <FaGithub size={20} />
                        <span>View on GitHub</span>
                      </a>
                    )}
                    {hackathon.projectLinks.demo && (
                      <a 
                        href={hackathon.projectLinks.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hackathon-project-link"
                      >
                        <FaExternalLinkAlt size={18} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
