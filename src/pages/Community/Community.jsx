import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaUsers } from 'react-icons/fa';
import './Community.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export default function Community() {
  const navigate = useNavigate();
  const [memberCounts, setMemberCounts] = useState({});

  const communities = [
    {
      id: 1,
      name: 'OIST PROGRAMMING CLUB',
      slug: 'debug-oist',
      description: 'think. build. deploy.',
      route: '/community/debug-oist',
      logo: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1766704386/portfolio-images/un7oyxvfnsedotuaod9j.jpg',
      color: '#ef4444'
    },
    {
      id: 2,
      name: 'com.the-boys-dev',
      slug: 'com.the-boys-dev',
      description: 'Helping fellow devs level up — no corporate fluff',
      route: '/community/com.the-boys-dev',
      logo: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1766704388/portfolio-images/zw2ml9hamyshiieznbwz.jpg',
      color: '#a855f7'
    }
  ];

  // Fetch member counts for each community
  useEffect(() => {
    communities.forEach(async (community) => {
      try {
        const res = await fetch(`${API_URL}/api/members/community/${community.slug}`);
        const data = await res.json();
        if (data.success) {
          setMemberCounts(prev => ({ ...prev, [community.slug]: data.data?.length || 0 }));
        }
      } catch {
        setMemberCounts(prev => ({ ...prev, [community.slug]: 0 }));
      }
    });
  }, []);

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
                <span className="community-members"><FaUsers /> {memberCounts[community.slug] ?? '...'} Members</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
