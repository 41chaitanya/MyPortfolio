import { useState } from 'react';
import ProjectDetailModal from '../../components/ProjectDetailModal';
import './Projects.css';

export default function Projects() {
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project) => {
    console.log('Project clicked:', project);
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const projects = [
    {
      id: 1,
      title: 'Campus Entity Resolution & Security Monitoring',
      description: 'ML-powered security platform with 99.2% entity resolution accuracy and predictive analytics (94.3% location, 91.8% activity prediction) using Fellegi-Sunter algorithm, XGBoost, and LSTM.',
      image: '/image/project1.jpg',
      tech: ['Python', 'FastAPI', 'XGBoost', 'LSTM', 'Neo4j']
    },
    {
      id: 2,
      title: 'Online Banking Portal',
      description: 'Full-stack banking platform with account management, fund transfers, bill payments, and real-time notifications with secure authentication.',
      image: '/image/project2.jpg',
      tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'Kafka']
    },
    {
      id: 3,
      title: 'Real-Time Trading Dashboard',
      description: 'Trading analytics dashboard for live stock, derivatives, and FX markets with real-time price updates and interactive visualizations.',
      image: '/image/project3.jpg',
      tech: ['React', 'Spring Boot', 'PostgreSQL', 'Kafka', 'Charts']
    },
    {
      id: 4,
      title: 'Workflow Automation Portal',
      description: 'Automation platform enabling multi-step workflows for emails, reports, and notifications with event-driven execution and visual workflow design.',
      image: '/image/project4.jpg',
      tech: ['Spring Boot', 'MongoDB', 'Redis', 'Kafka', 'React']
    },
    {
      id: 5,
      title: 'AI-Powered Customer Support Chatbot',
      description: 'Backend system for intelligent customer support with conversation logging, analytics, and real-time message processing.',
      image: '/image/project5.jpg',
      tech: ['Spring Boot', 'MongoDB', 'Redis', 'Kafka', 'React']
    },
    {
      id: 6,
      title: 'SaaS Integration & Feedback Aggregator',
      description: 'Platform aggregating customer feedback from multiple SaaS sources into unified dashboard with analytics and KPI tracking.',
      image: '/image/project6.jpg',
      tech: ['Spring Boot', 'MongoDB', 'Redis', 'Kafka', 'React']
    },
    {
      id: 7,
      title: 'Microservices Architecture System',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: '/image/project7.jpg',
      tech: ['Java', 'Spring Boot', 'Docker', 'Kubernetes', 'PostgreSQL']
    },
    {
      id: 8,
      title: 'Real-Time Data Processing Pipeline',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: '/image/project8.jpg',
      tech: ['Apache Kafka', 'Spring Boot', 'Redis', 'PostgreSQL', 'Python']
    },
    {
      id: 9,
      title: 'Advanced Analytics Platform',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: '/image/project9.jpg',
      tech: ['React', 'D3.js', 'Spring Boot', 'MongoDB', 'Elasticsearch']
    },
    {
      id: 10,
      title: 'Cloud-Native Application',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: '/image/project10.jpg',
      tech: ['Docker', 'Kubernetes', 'Spring Boot', 'PostgreSQL', 'Redis']
    },
    {
      id: 11,
      title: 'Security & Compliance System',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: '/image/project11.jpg',
      tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Security', 'GDPR']
    },
    {
      id: 12,
      title: 'Performance Optimization Suite',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      image: '/image/project12.jpg',
      tech: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'Monitoring']
    }
  ];

  const handleLoadMore = () => {
    setVisibleProjects(prev => prev + 6);
  };

  return (
    <div className="page-container projects-page">
      <div style={{ maxWidth: '800px', marginBottom: '60px' }}>
        <div className="projects-header">
          <h1 className="projects-title">My Projects</h1>
          <p className="projects-subtitle">Explore the projects I've built and contributed to</p>
        </div>

        <div className="projects-grid">
          {projects.slice(0, visibleProjects).map((project) => (
            <div 
              key={project.id} 
              className="project-card"
              onClick={() => handleProjectClick(project)}
            >
              <div className="project-image-wrapper">
                <img src={project.image} alt={project.title} className="project-image" />
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleProjects < projects.length && (
          <div className="load-more-container">
            <button className="load-more-button" onClick={handleLoadMore}>
              Load More Projects
            </button>
          </div>
        )}
      </div>

      <ProjectDetailModal 
        isOpen={isModalOpen}
        project={selectedProject}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
