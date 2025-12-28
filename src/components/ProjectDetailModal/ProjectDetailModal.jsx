import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaJava, FaPython, FaDatabase } from 'react-icons/fa';
import { 
  SiJavascript, SiReact, SiSpringboot, 
  SiPostgresql, SiMongodb, SiRedis, SiApachekafka, 
  SiDocker, SiKubernetes, SiFastapi 
} from 'react-icons/si';
import './ProjectDetailModal.css';

export default function ProjectDetailModal({ isOpen, project, onClose }) {
  if (!project) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
  };

  const getTechIcon = (tech) => {
    const iconMap = {
      'JavaScript': SiJavascript,
      'Python': FaPython,
      'Java': FaJava,
      'React': SiReact,
      'Spring Boot': SiSpringboot,
      'PostgreSQL': SiPostgresql,
      'MongoDB': SiMongodb,
      'Redis': SiRedis,
      'Kafka': SiApachekafka,
      'Apache Kafka': SiApachekafka,
      'Docker': SiDocker,
      'Kubernetes': SiKubernetes,
      'FastAPI': SiFastapi,
      'Neo4j': FaDatabase,
      'XGBoost': FaDatabase,
      'LSTM': FaDatabase,
      'Charts': FaDatabase,
    };
    
    const Icon = iconMap[tech];
    return Icon ? <Icon size={24} /> : null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="project-modal-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          <motion.div
            className="project-modal-container"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <div className="project-modal-content">
              {/* Close Button */}
              <button className="project-modal-close" onClick={onClose}>
                <FaTimes size={24} />
              </button>

              {/* Header Section */}
              <div className="project-modal-header">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="project-modal-image"
                />
                <div className="project-modal-header-content">
                  <h1 className="project-modal-title">{project.title}</h1>
                </div>
              </div>

              {/* Description Section */}
              <div className="project-modal-section">
                <h2 className="project-modal-section-title">About</h2>
                <p className="project-modal-description">{project.description}</p>
              </div>

              {/* Features Section */}
              {project.features && project.features.length > 0 && (
                <div className="project-modal-section">
                  <h2 className="project-modal-section-title">Key Features</h2>
                  <ul className="project-features-list">
                    {project.features.map((feature, index) => (
                      <li key={index} className="project-feature-item">{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack Section */}
              {project.tech && project.tech.length > 0 && (
                <div className="project-modal-section">
                  <h2 className="project-modal-section-title">Tech Stack</h2>
                  <div className="project-tech-grid">
                    {project.tech.map((tech, index) => (
                      <div key={index} className="project-tech-item">
                        {getTechIcon(tech)}
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Links Section */}
              {project.projectLinks && (
                <div className="project-modal-section">
                  <h2 className="project-modal-section-title">Project Links</h2>
                  <div className="project-project-links">
                    {project.projectLinks.github && (
                      <a 
                        href={project.projectLinks.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-project-link"
                      >
                        <FaGithub size={20} />
                        <span>View on GitHub</span>
                      </a>
                    )}
                    {project.projectLinks.demo && (
                      <a 
                        href={project.projectLinks.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-project-link"
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
