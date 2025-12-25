import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaGithub, FaEnvelope, FaStar, FaCodeBranch } from 'react-icons/fa';
import './CommunityDetail.css';

export default function CommunityDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [githubRepos, setGithubRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(false);

  const communityData = {
    'debug-oist': {
      name: 'Debug OIST',
      logo: '🐛',
      color: '#ef4444',
      description: 'A community of passionate developers at OIST focused on debugging, problem-solving, and collaborative coding.',
      members: [],
      githubOrgName: null,
      githubOrgUrl: null,
      ownerEmail: null
    },
    'com.the-boys-dev': {
      name: 'com.the-boys-dev',
      logo: 'https://wallpapers.com/images/featured/the-boys-1fe3hnl120ch1bc6.jpg',
      color: '#a855f7',
      description: 'Helping fellow devs level up — no corporate fluff',
      wallpaper: 'https://wallpapers.com/images/featured/the-boys-1fe3hnl120ch1bc6.jpg',
      githubOrgName: 'com-the-boys-dev',
      githubOrgUrl: 'https://github.com/com-the-boys-dev',
      ownerEmail: 'chaitanya4141sharma@gmail.com',
      members: [
        {
          name: 'Chaitanya Sharma',
          role: 'Owner',
          github: '41chaitanya',
          image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662010/portfolio-images/bvjgyzlgfkeixlutr5ga.jpg'
        },
        {
          name: 'Priyanshu Singh',
          role: 'Member',
          github: 'priyanshulink',
          image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png'
        },
        {
          name: 'Sakshi Pawar',
          role: 'Member',
          github: 'sakshii893',
          image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662012/portfolio-images/it3ilkcmlz7rtqd4s4hv.jpg'
        },
        {
          name: 'Sanju Kumari',
          role: 'Member',
          github: 'sanjukumari11',
          image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662012/portfolio-images/etihtjvroehvdxdxxu8m.jpg'
        },
        {
          name: 'Shrey',
          role: 'Member',
          github: 'shrey1184',
          image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662011/portfolio-images/mesisgunr5y6x7pd5gcy.jpg'
        },
        {
          name: 'Shruti Panjiyara',
          role: 'Member',
          github: 'shrutipanjiyara13a',
          image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662012/portfolio-images/it3ilkcmlz7rtqd4s4hv.jpg'
        }
      ]
    },
    'code-crew': {
      name: 'Code Crew',
      logo: '🚀',
      color: '#3b82f6',
      description: 'Elite coding crew participating in hackathons, building innovative solutions, and pushing boundaries.',
      members: [],
      githubOrgName: null,
      githubOrgUrl: null,
      ownerEmail: null
    }
  };

  const community = communityData[slug];

  // Fetch GitHub organization repositories dynamically
  useEffect(() => {
    if (community?.githubOrgName) {
      setLoadingRepos(true);
      fetch(`https://api.github.com/orgs/${community.githubOrgName}/repos?sort=updated&per_page=20`)
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setGithubRepos(data);
          }
          setLoadingRepos(false);
        })
        .catch(err => {
          console.error('Error fetching repos:', err);
          setLoadingRepos(false);
        });
    }
  }, [community?.githubOrgName]);

  if (!community) {
    return (
      <div className="page-container community-detail-page">
        <div className="community-not-found">
          <h1>Community Not Found</h1>
          <button onClick={() => navigate('/community')} className="back-button">
            <FaArrowLeft /> Back to Communities
          </button>
        </div>
      </div>
    );
  }

  const isImageLogo = community.logo && community.logo.startsWith('http');

  return (
    <div className="community-detail-page" style={community.wallpaper ? { 
      backgroundImage: `linear-gradient(to bottom, rgba(9, 9, 11, 0.7), rgba(9, 9, 11, 0.95)), url(${community.wallpaper})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    } : {}}>
      
      <button onClick={() => navigate('/community')} className="back-button">
        <FaArrowLeft /> Back to Communities
      </button>

      <div className="community-detail-header">
        <div className="logo-wrapper">
          {isImageLogo ? (
            <img src={community.logo} alt={community.name} className="community-logo-image" />
          ) : (
            <div 
              className="community-detail-icon" 
              style={{ backgroundColor: `${community.color}20`, borderColor: community.color }}
            >
              <span>{community.logo}</span>
            </div>
          )}
        </div>
        
        <h1 className="community-detail-title">{community.name}</h1>
        <p className="community-detail-description">{community.description}</p>
        
        <div className="community-links">
          {community.githubOrgUrl && (
            <a 
              href={community.githubOrgUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="github-org-link"
            >
              <FaGithub /> GitHub Organization
            </a>
          )}
          
          {community.ownerEmail && (
            <a 
              href={`mailto:${community.ownerEmail}`}
              className="email-link"
            >
              <FaEnvelope /> {community.ownerEmail}
            </a>
          )}
        </div>
      </div>

      <div className="community-detail-content">
        {/* Team Members Section */}
        {community.members && community.members.length > 0 && (
          <div className="members-section">
            <h2 className="members-title">Team Members</h2>
            <div className="members-horizontal">
              {community.members.map((member, index) => (
                <div key={index} className="member-card-horizontal">
                  <div className="member-image-wrapper">
                    <img src={member.image} alt={member.name} className="member-image" />
                  </div>
                  <div className="member-info">
                    <h3 className="member-name">{member.name}</h3>
                    <span className="member-role" style={{ 
                      backgroundColor: member.role === 'Owner' ? `${community.color}30` : '#27272a',
                      color: member.role === 'Owner' ? community.color : '#a1a1a1'
                    }}>
                      {member.role}
                    </span>
                    <a 
                      href={`https://github.com/${member.github}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="member-github"
                    >
                      <FaGithub /> @{member.github}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects/Repositories Section - Dynamic from GitHub */}
        {community.githubOrgName && (
          <div className="projects-section">
            <h2 className="projects-title">Projects</h2>
            {loadingRepos ? (
              <div className="loading-text">Loading projects from GitHub...</div>
            ) : githubRepos.length > 0 ? (
              <div className="projects-grid">
                {githubRepos.map((repo) => (
                  <a 
                    key={repo.id} 
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card"
                  >
                    <h3 className="project-name">{repo.name}</h3>
                    <p className="project-description">
                      {repo.description || 'No description available'}
                    </p>
                    <div className="project-meta">
                      {repo.language && (
                        <span className="project-language">
                          <span className="language-dot" style={{ backgroundColor: getLanguageColor(repo.language) }}></span>
                          {repo.language}
                        </span>
                      )}
                      <span className="project-stars">
                        <FaStar /> {repo.stargazers_count}
                      </span>
                      <span className="project-forks">
                        <FaCodeBranch /> {repo.forks_count}
                      </span>
                    </div>
                    <div className="project-updated">
                      Updated {formatDate(repo.updated_at)}
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="no-data-text">No repositories found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to get language colors
function getLanguageColor(language) {
  const colors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    PHP: '#4F5D95',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    Dart: '#00B4AB',
    Shell: '#89e051',
    Jupyter: '#DA5B0B'
  };
  return colors[language] || '#8b8b8b';
}

// Helper function to format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}
