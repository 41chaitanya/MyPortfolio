import { useNavigate } from 'react-router-dom';
import './Community.css';

export default function Community() {
  const navigate = useNavigate();

  const communities = [
    {
      id: 1,
      name: 'OIST PROGRAMMING CLUB',
      description: 'think. build. deploy.',
      members: '12',
      route: '/community/debug-oist',
      logo: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1766704386/portfolio-images/un7oyxvfnsedotuaod9j.jpg',
      color: '#ef4444'
    },
    {
      id: 2,
      name: 'com.the-boys-dev',
      description: 'Helping fellow devs level up — no corporate fluff',
      members: '6',
      route: '/community/com.the-boys-dev',
      logo: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1766704388/portfolio-images/zw2ml9hamyshiieznbwz.jpg',
      color: '#a855f7'
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
              {community.logo ? (
                <img src={community.logo} alt={community.name} className="community-logo-img" />
              ) : (
                <span>{community.icon}</span>
              )}
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
