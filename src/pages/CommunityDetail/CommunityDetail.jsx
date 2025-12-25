import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaGithub, FaEnvelope, FaStar, FaCodeBranch, FaDiscord, FaGlobe, FaUsers, FaUserPlus, FaTimes, FaCheckCircle, FaLinkedin, FaPhone } from 'react-icons/fa';
import './CommunityDetail.css';

export default function CommunityDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [githubRepos, setGithubRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [showPreloader, setShowPreloader] = useState(slug === 'com.the-boys-dev');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [joinFormData, setJoinFormData] = useState({
    email: '',
    githubUrl: '',
    linkedinUrl: '',
    contactNumber: ''
  });
  const [joinLoading, setJoinLoading] = useState(false);
  const videoRef = useRef(null);

  const communityData = {
    'debug-oist': {
      name: 'OIST PROGRAMMING CLUB',
      logo: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1766704386/portfolio-images/un7oyxvfnsedotuaod9j.jpg',
      color: '#ef4444',
      description: 'think. build. deploy.',
      wallpaper: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1766704386/portfolio-images/un7oyxvfnsedotuaod9j.jpg',
      followers: 12,
      website: 'https://debugoist.nevernever.me/',
      discordUrl: 'https://discord.gg/JHGbXMsg43',
      discordJoinUrl: 'https://discord.gg/JHGbXMsg43',
      discordChannelUrl: 'https://discord.gg/JHGbXMsg43',
      githubOrgName: 'Nev-Labs',
      githubOrgUrl: 'https://github.com/orgs/Nev-Labs',
      ownerEmail: null,
      members: [
        {
          name: 'Ashish Baghel',
          role: 'Owner',
          github: 'nevernever69',
          image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png'
        },
        {
          name: 'Chaitanya Sharma',
          role: 'Member',
          github: '41chaitanya',
          image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662010/portfolio-images/bvjgyzlgfkeixlutr5ga.jpg'
        },
        {
          name: 'Aryan Kumar',
          role: 'Member',
          github: 'AryanKumarOfficial',
          image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png'
        },
        {
          name: 'Devashish',
          role: 'Member',
          github: 'devashish2006',
          image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png'
        },
        {
          name: 'Dhruv Bhardwaj',
          role: 'Member',
          github: 'LogicIsPlantingBomb',
          image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png'
        },
        {
          name: 'Nalin Dalal',
          role: 'Member',
          github: 'NalinDalal',
          image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png'
        }
      ]
    },
    'com.the-boys-dev': {
      name: 'com.the-boys-dev',
      logo: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1766704388/portfolio-images/zw2ml9hamyshiieznbwz.jpg',
      color: '#a855f7',
      description: 'Helping fellow devs level up — no corporate fluff',
      wallpaper: 'https://wallpapers.com/images/featured/the-boys-1fe3hnl120ch1bc6.jpg',
      githubOrgName: 'com-the-boys-dev',
      githubOrgUrl: 'https://github.com/com-the-boys-dev',
      discordJoinUrl: 'https://discord.gg/T2ySxBxRzP',
      discordChannelUrl: 'https://discord.com/channels/1356022855183237211/1356022856013582579',
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
    }
  };

  const community = communityData[slug];

  // Handle preloader video for The Boys community
  useEffect(() => {
    if (slug === 'com.the-boys-dev' && videoRef.current) {
      const video = videoRef.current;
      
      // Start video from beginning
      video.currentTime = 0;
      video.play().catch(console.error);
      
      // Hide preloader when video ends
      const handleEnded = () => {
        setShowPreloader(false);
      };
      
      video.addEventListener('ended', handleEnded);
      
      return () => {
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, [slug]);

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

  // Handle join form input change
  const handleJoinInputChange = (e) => {
    const { name, value } = e.target;
    setJoinFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle join form submit
  const handleJoinSubmit = async (e) => {
    e.preventDefault();
    setJoinLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('subject', `Community Joining Request - ${community.name}`);
      formDataToSend.append('email', joinFormData.email);
      formDataToSend.append('message', `
Community Joining Request

Community: ${community.name}
Email: ${joinFormData.email}
GitHub URL: ${joinFormData.githubUrl}
LinkedIn URL: ${joinFormData.linkedinUrl}
Contact Number: ${joinFormData.contactNumber}
      `);
      formDataToSend.append('access_key', '7c3bbfa0-a611-4ab3-ab54-26e91d98a846');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        setShowJoinModal(false);
        setShowSuccessModal(true);
        setJoinFormData({ email: '', githubUrl: '', linkedinUrl: '', contactNumber: '' });
      } else {
        alert('Failed to send request. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send request. Please try again.');
    } finally {
      setJoinLoading(false);
    }
  };

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

  // Show preloader for The Boys community
  if (showPreloader && slug === 'com.the-boys-dev') {
    return (
      <div className="preloader-container">
        <video
          ref={videoRef}
          className="preloader-video"
          muted
          playsInline
        >
          <source src="/gifs/com_The_Boys_Preloader.mp4" type="video/mp4" />
        </video>
      </div>
    );
  }

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
          {community.followers && (
            <span className="followers-badge">
              <FaUsers /> {community.followers} followers
            </span>
          )}
          
          {community.website && (
            <a 
              href={community.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="website-link"
            >
              <FaGlobe /> Website
            </a>
          )}
          
          {community.discordUrl && (
            <a 
              href={community.discordUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="discord-link"
            >
              <FaDiscord /> Discord
            </a>
          )}
          
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
          
          {community.discordChannelUrl && (
            <a 
              href={community.discordChannelUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="discord-channel-link"
            >
              <FaDiscord /> Discord Channel
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
          
          <button 
            onClick={() => setShowJoinModal(true)}
            className="join-community-btn"
          >
            <FaUserPlus /> Request to Join
          </button>
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

      {/* Join Community Modal */}
      {showJoinModal && (
        <div className="modal-overlay" onClick={() => setShowJoinModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowJoinModal(false)}>
              <FaTimes />
            </button>
            <div className="modal-header">
              <h2 className="modal-title">Request to Join</h2>
              <p className="modal-subtitle">Fill in your details to request membership</p>
            </div>
            
            <form className="join-form contact-form" onSubmit={handleJoinSubmit}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={joinFormData.email}
                  onChange={handleJoinInputChange}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">GitHub URL</label>
                <input
                  type="url"
                  name="githubUrl"
                  placeholder="https://github.com/username"
                  value={joinFormData.githubUrl}
                  onChange={handleJoinInputChange}
                  required
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">LinkedIn URL</label>
                <input
                  type="url"
                  name="linkedinUrl"
                  placeholder="https://linkedin.com/in/username"
                  value={joinFormData.linkedinUrl}
                  onChange={handleJoinInputChange}
                  className="form-input"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Contact</label>
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="+91 9876543210"
                  value={joinFormData.contactNumber}
                  onChange={handleJoinInputChange}
                  required
                  className="form-input"
                />
              </div>
              
              <button type="submit" className="submit-button" disabled={joinLoading}>
                {joinLoading ? 'Sending...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="modal-card success-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowSuccessModal(false)}>
              <FaTimes />
            </button>
            <div className="success-icon">
              <FaCheckCircle />
            </div>
            <h2 className="modal-title">Request Sent Successfully!</h2>
            <p className="modal-subtitle">Your request has been submitted. Join our community channels below:</p>
            
            <div className="success-links">
              <a 
                href={community.discordJoinUrl || 'https://discord.gg/T2ySxBxRzP'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="success-link discord"
              >
                <FaDiscord /> Join Discord Server
              </a>
              <a 
                href={community.discordChannelUrl || 'https://discord.com/channels/1356022855183237211/1356022856013582579'} 
                target="_blank" 
                rel="noopener noreferrer"
                className="success-link discord-channel"
              >
                <FaDiscord /> Discord Channel
              </a>
              <a 
                href={community.githubOrgUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="success-link github"
              >
                <FaGithub /> GitHub Organization
              </a>
            </div>
            
            <button className="close-success-btn" onClick={() => setShowSuccessModal(false)}>
              Done
            </button>
          </div>
        </div>
      )}
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
