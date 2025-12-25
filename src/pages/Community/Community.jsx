import { useNavigate } from 'react-router-dom';
import './Community.css';

export default function Community() {
  const navigate = useNavigate();

  const communities = [
    {
      id: 1,
      name: 'Debug OIST',
      description: 'A community of passionate developers at OIST focused on debugging, problem-solving, and collaborative coding.',
      members: '50+',
      route: '/community/debug-oist',
      icon: '🐛',
      color: '#ef4444'
    },
    {
      id: 2,
      name: 'com.the-boys-dev',
      description: 'Helping fellow devs level up — no corporate fluff',
      members: '6',
      route: '/community/com.the-boys-dev',
      icon: '👨‍💻',
      color: '#a855f7'
    },
    {
      id: 3,
      name: 'Code Crew',
      description: 'Elite coding crew participating in hackathons, building innovative solutions, and pushing boundaries.',
      members: '15+',
      route: '/community/code-crew',
      icon: '🚀',
      color: '#3b82f6'
    }
  ];

  return (
    <div className="page-container community-page">
      <div className="community-header">
        <h1 className="community-title">My Communities</h1>
        <p className="community-subtitle">Developer communities I'm part of and contribute to</p>
      </div>

      <div className="communities-grid">
        {communities.map((community) => (
          <div 
            key={community.id} 
            className="community-card"
            onClick={() => navigate(community.route)}
          >
            <div 
              className="community-icon" 
              style={{ backgroundColor: `${community.color}20`, borderColor: community.color }}
            >
              <span>{community.icon}</span>
            </div>
            <div className="community-content">
              <h3 className="community-name">{community.name}</h3>
              <p className="community-description">{community.description}</p>
              <div className="community-meta">
                <span className="community-members">{community.members} Members</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
