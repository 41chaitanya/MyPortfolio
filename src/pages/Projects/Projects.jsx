import { useState, useEffect } from 'react';
import ProjectDetailModal from '../../components/ProjectDetailModal';
import './Projects.css';

const GITHUB_USERNAME = '41chaitanya';

// Language to tech stack mapping for better display
const languageToTech = {
  'JavaScript': ['JavaScript', 'Node.js'],
  'TypeScript': ['TypeScript', 'Node.js'],
  'Java': ['Java', 'Spring Boot'],
  'Python': ['Python'],
  'HTML': ['HTML', 'CSS'],
  'CSS': ['CSS'],
  'C++': ['C++'],
  'C': ['C'],
  'Go': ['Go'],
  'Rust': ['Rust'],
  'Ruby': ['Ruby'],
  'PHP': ['PHP'],
  'Swift': ['Swift'],
  'Kotlin': ['Kotlin'],
  'Dart': ['Dart', 'Flutter'],
  'Shell': ['Shell', 'Bash'],
};

export default function Projects() {
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGitHubProjects();
  }, []);

  const fetchGitHubProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
      );
      
      if (!response.ok) throw new Error('Failed to fetch projects');
      
      const repos = await response.json();
      
      // Filter out forked repos and transform data
      const transformedProjects = repos
        .filter(repo => !repo.fork)
        .map((repo, index) => ({
          id: repo.id,
          title: formatRepoName(repo.name),
          description: repo.description || 'No description available',
          image: `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`,
          tech: getTechStack(repo),
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          updatedAt: repo.updated_at,
          projectLinks: {
            github: repo.html_url,
            demo: repo.homepage || null
          },
          topics: repo.topics || [],
          features: generateFeatures(repo)
        }));
      
      setProjects(transformedProjects);
      setError(null);
    } catch (err) {
      console.error('Error fetching GitHub projects:', err);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const formatRepoName = (name) => {
    return name
      .replace(/-/g, ' ')
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getTechStack = (repo) => {
    const tech = [];
    
    // Add primary language
    if (repo.language && languageToTech[repo.language]) {
      tech.push(...languageToTech[repo.language]);
    } else if (repo.language) {
      tech.push(repo.language);
    }
    
    // Add from topics
    const techTopics = (repo.topics || [])
      .filter(topic => !['project', 'portfolio', 'personal'].includes(topic.toLowerCase()))
      .slice(0, 3)
      .map(topic => topic.charAt(0).toUpperCase() + topic.slice(1));
    
    tech.push(...techTopics);
    
    // Return unique values, max 5
    return [...new Set(tech)].slice(0, 5);
  };

  const generateFeatures = (repo) => {
    const features = [];
    if (repo.stargazers_count > 0) features.push(`⭐ ${repo.stargazers_count} stars`);
    if (repo.forks_count > 0) features.push(`🍴 ${repo.forks_count} forks`);
    if (repo.open_issues_count > 0) features.push(`📋 ${repo.open_issues_count} open issues`);
    if (repo.homepage) features.push('🌐 Live demo available');
    if (repo.topics?.length > 0) features.push(`🏷️ Topics: ${repo.topics.slice(0, 3).join(', ')}`);
    return features;
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleLoadMore = () => {
    setVisibleProjects(prev => prev + 6);
  };

  if (loading) {
    return (
      <div className="page-container projects-page">
        <div className="projects-loading">
          <div className="loading-spinner"></div>
          <p>Loading projects from GitHub...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container projects-page">
        <div className="projects-error">
          <p>{error}</p>
          <button onClick={fetchGitHubProjects}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container projects-page">
      <div style={{ maxWidth: '800px', marginBottom: '60px' }}>
        <div className="projects-header">
          <h1 className="projects-title">My Projects</h1>
          <p className="projects-subtitle">
            Explore {projects.length} projects from my GitHub
          </p>
        </div>

        <div className="projects-grid">
          {projects.slice(0, visibleProjects).map((project) => (
            <div 
              key={project.id} 
              className="project-card"
              onClick={() => handleProjectClick(project)}
            >
              <div className="project-image-wrapper">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="project-image"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x200/1a1a2e/ffffff?text=${encodeURIComponent(project.title.substring(0, 20))}`;
                  }}
                />
                {project.language && (
                  <span className="project-language-badge">{project.language}</span>
                )}
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-meta">
                  {project.stars > 0 && <span className="meta-item">⭐ {project.stars}</span>}
                  {project.forks > 0 && <span className="meta-item">🍴 {project.forks}</span>}
                </div>
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
              Load More Projects ({projects.length - visibleProjects} remaining)
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
