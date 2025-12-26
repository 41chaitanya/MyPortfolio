import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaGithub, FaEnvelope, FaStar, FaCodeBranch, FaDiscord, FaGlobe, FaUsers, FaUserPlus, FaTimes, FaCheckCircle, FaLinkedin, FaChevronRight, FaCode, FaServer, FaPalette, FaCogs } from 'react-icons/fa';
import './CommunityDetail.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const TEAM_OPTIONS = ['Backend', 'Frontend', 'Design', 'DevOps'];

const communityData = {
  'debug-oist': { name: 'OIST PROGRAMMING CLUB', logo: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1766704386/portfolio-images/un7oyxvfnsedotuaod9j.jpg', color: '#ef4444', description: 'think. build. deploy.', wallpaper: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1766704386/portfolio-images/un7oyxvfnsedotuaod9j.jpg', followers: 12, website: 'https://debugoist.nevernever.me/', discordUrl: 'https://discord.gg/JHGbXMsg43', discordJoinUrl: 'https://discord.gg/JHGbXMsg43', discordChannelUrl: 'https://discord.gg/JHGbXMsg43', githubOrgName: 'Nev-Labs', githubOrgUrl: 'https://github.com/orgs/Nev-Labs' },
  'com.the-boys-dev': { name: 'com.the-boys-dev', logo: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1766704388/portfolio-images/zw2ml9hamyshiieznbwz.jpg', color: '#a855f7', description: 'Helping fellow devs level up — no corporate fluff', wallpaper: 'https://wallpapers.com/images/featured/the-boys-1fe3hnl120ch1bc6.jpg', githubOrgName: 'com-the-boys-dev', githubOrgUrl: 'https://github.com/com-the-boys-dev', discordJoinUrl: 'https://discord.gg/T2ySxBxRzP', discordChannelUrl: 'https://discord.com/channels/1356022855183237211/1356022856013582579', ownerEmail: 'chaitanya4141sharma@gmail.com' }
};

const fallbackMembers = {
  'debug-oist': [
    { name: 'Ashish Baghel', role: 'Owner', githubUrl: 'https://github.com/nevernever69', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png', teams: ['Backend', 'DevOps'] },
    { name: 'Chaitanya Sharma', role: 'Member', githubUrl: 'https://github.com/41chaitanya', linkedinUrl: 'https://linkedin.com/in/41chaitanya', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662010/portfolio-images/bvjgyzlgfkeixlutr5ga.jpg', teams: ['Backend', 'Frontend'] },
    { name: 'Aryan Kumar', role: 'Member', githubUrl: 'https://github.com/AryanKumarOfficial', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png', teams: ['Frontend'] },
    { name: 'Devashish', role: 'Member', githubUrl: 'https://github.com/devashish2006', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png', teams: ['Backend'] },
    { name: 'Dhruv Bhardwaj', role: 'Member', githubUrl: 'https://github.com/LogicIsPlantingBomb', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png', teams: ['Backend', 'Frontend'] },
    { name: 'Nalin Dalal', role: 'Member', githubUrl: 'https://github.com/NalinDalal', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png', teams: ['Backend'] }
  ],
  'com.the-boys-dev': [
    { name: 'Chaitanya Sharma', role: 'Owner', githubUrl: 'https://github.com/41chaitanya', linkedinUrl: 'https://linkedin.com/in/41chaitanya', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662010/portfolio-images/bvjgyzlgfkeixlutr5ga.jpg', teams: ['Backend', 'Frontend'], pastWork: [{ title: 'Portfolio', description: 'React portfolio', url: 'https://chaitanya-dev.netlify.app', type: 'Project' }] },
    { name: 'Priyanshu Singh', role: 'Member', githubUrl: 'https://github.com/priyanshulink', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png', teams: ['Frontend'] },
    { name: 'Sakshi Pawar', role: 'Member', githubUrl: 'https://github.com/sakshii893', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662012/portfolio-images/it3ilkcmlz7rtqd4s4hv.jpg', teams: ['Frontend', 'Design'] },
    { name: 'Sanju Kumari', role: 'Member', githubUrl: 'https://github.com/sanjukumari11', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662012/portfolio-images/etihtjvroehvdxdxxu8m.jpg', teams: ['Backend'] },
    { name: 'Shrey', role: 'Member', githubUrl: 'https://github.com/shrey1184', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662011/portfolio-images/mesisgunr5y6x7pd5gcy.jpg', teams: ['Backend', 'DevOps'] },
    { name: 'Shruti Panjiyara', role: 'Member', githubUrl: 'https://github.com/shrutipanjiyara13a', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662012/portfolio-images/it3ilkcmlz7rtqd4s4hv.jpg', teams: ['Frontend'] }
  ]
};

const getTeamIcon = (t) => t?.toLowerCase() === 'backend' ? <FaServer /> : t?.toLowerCase() === 'design' ? <FaPalette /> : t?.toLowerCase() === 'devops' ? <FaCogs /> : <FaCode />;
const getLangColor = (l) => ({ JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5', Java: '#b07219', HTML: '#e34c26', CSS: '#563d7c' }[l] || '#8b8b8b');
const formatDate = (d) => { const days = Math.floor((Date.now() - new Date(d)) / 86400000); return days === 0 ? 'today' : days === 1 ? 'yesterday' : days < 7 ? `${days} days ago` : days < 30 ? `${Math.floor(days/7)} weeks ago` : `${Math.floor(days/30)} months ago`; };

export default function CommunityDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [repos, setRepos] = useState([]);
  const [members, setMembers] = useState([]);
  const [showPreloader, setShowPreloader] = useState(slug === 'com.the-boys-dev');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', githubUrl: '', linkedinUrl: '', contactNumber: '', teams: [], customTeam: '' });
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const community = communityData[slug];


  useEffect(() => { 
    // Fetch members from MongoDB via backend API
    const fetchMembers = async () => {
      try {
        const response = await fetch(`${API_URL}/api/members/community/${slug}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data?.length > 0) {
            setMembers(data.data);
            return;
          }
        }
      } catch (err) {
        console.log('Backend not available, using fallback data');
      }
      // Fallback to static data if backend unavailable
      setMembers(fallbackMembers[slug] || []);
    };
    fetchMembers();
  }, [slug]);
  useEffect(() => { if (slug === 'com.the-boys-dev' && videoRef.current) { videoRef.current.play().catch(() => {}); videoRef.current.onended = () => setShowPreloader(false); } }, [slug]);
  useEffect(() => { if (community?.githubOrgName) fetch(`https://api.github.com/orgs/${community.githubOrgName}/repos?per_page=20`).then(r => r.json()).then(d => Array.isArray(d) && setRepos(d)).catch(() => {}); }, [community?.githubOrgName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Prepare teams array (include custom team if provided)
    const allTeams = [...form.teams];
    if (form.customTeam.trim()) {
      allTeams.push(form.customTeam.trim());
    }
    
    const communitySlug = slug === 'com.the-boys-dev' ? 'com.the-boys-dev' : 'debug-oist';
    
    try {
      // Try backend API first
      const response = await fetch(`${API_URL}/api/members/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          communityName: communitySlug,
          email: form.email,
          githubUrl: form.githubUrl,
          linkedinUrl: form.linkedinUrl,
          contactNumber: form.contactNumber,
          teams: allTeams
        })
      });
      
      if (response.ok) {
        setShowJoinModal(false);
        setShowSuccessModal(true);
        setForm({ name: '', email: '', githubUrl: '', linkedinUrl: '', contactNumber: '', teams: [], customTeam: '' });
      } else {
        throw new Error('Backend request failed');
      }
    } catch (err) {
      // Fallback to Web3Forms
      const fd = new FormData();
      fd.append('subject', `Join Request - ${community?.name}`);
      fd.append('email', form.email);
      fd.append('message', `Community: ${community?.name}\nName: ${form.name}\nEmail: ${form.email}\nGitHub: ${form.githubUrl}\nLinkedIn: ${form.linkedinUrl}\nContact: ${form.contactNumber}\nTeams: ${allTeams.join(', ')}`);
      fd.append('access_key', '7c3bbfa0-a611-4ab3-ab54-26e91d98a846');
      try {
        const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
        if ((await res.json()).success) {
          setShowJoinModal(false);
          setShowSuccessModal(true);
          setForm({ name: '', email: '', githubUrl: '', linkedinUrl: '', contactNumber: '', teams: [], customTeam: '' });
        }
      } catch {}
    } finally {
      setLoading(false);
    }
  };

  const toggleTeam = (team) => {
    setForm(prev => ({
      ...prev,
      teams: prev.teams.includes(team) 
        ? prev.teams.filter(t => t !== team)
        : [...prev.teams, team]
    }));
  };

  if (!community) return <div className="community-detail-page"><h1>Not Found</h1><button onClick={() => navigate('/community')} className="back-button"><FaArrowLeft /> Back</button></div>;

  const displayed = members.slice(0, 4);
  const hasMore = members.length > 4;

  return (
    <>
      {showPreloader && slug === 'com.the-boys-dev' && <div className="preloader-container"><video ref={videoRef} className="preloader-video" muted playsInline><source src="/gifs/com_The_Boys_Preloader.mp4" type="video/mp4" /></video></div>}
      <div className="community-detail-page" style={{ ...(community.wallpaper ? { backgroundImage: `linear-gradient(to bottom, rgba(9,9,11,0.7), rgba(9,9,11,0.95)), url(${community.wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' } : {}), visibility: showPreloader ? 'hidden' : 'visible' }}>
        <button onClick={() => navigate('/community')} className="back-button"><FaArrowLeft /> Back to Communities</button>
        <div className="community-detail-header">
          <div className="logo-wrapper">{community.logo?.startsWith('http') ? <img src={community.logo} alt="" className="community-logo-image" /> : <div className="community-detail-icon" style={{ backgroundColor: `${community.color}20`, borderColor: community.color }}>{community.logo}</div>}</div>
          <h1 className="community-detail-title">{community.name}</h1>
          <p className="community-detail-description">{community.description}</p>
          <div className="community-links">
            {community.followers && <span className="followers-badge"><FaUsers /> {community.followers} followers</span>}
            {community.website && <a href={community.website} target="_blank" rel="noopener noreferrer" className="website-link"><FaGlobe /> Website</a>}
            {community.discordUrl && <a href={community.discordUrl} target="_blank" rel="noopener noreferrer" className="discord-link"><FaDiscord /> Discord</a>}
            {community.githubOrgUrl && <a href={community.githubOrgUrl} target="_blank" rel="noopener noreferrer" className="github-org-link"><FaGithub /> GitHub</a>}
            {community.discordChannelUrl && <a href={community.discordChannelUrl} target="_blank" rel="noopener noreferrer" className="discord-channel-link"><FaDiscord /> Channel</a>}
            {community.ownerEmail && <a href={`mailto:${community.ownerEmail}`} className="email-link"><FaEnvelope /> {community.ownerEmail}</a>}
            <button onClick={() => setShowJoinModal(true)} className="join-community-btn"><FaUserPlus /> Request to Join</button>
          </div>
        </div>
        <div className="community-detail-content">
          <div className="members-section">
            <div className="members-header"><h2 className="members-title">Team Members</h2>{hasMore && <button className="view-all-btn" onClick={() => setShowSidebar(true)}>View All ({members.length}) <FaChevronRight /></button>}</div>
            <div className="members-grid">
              {displayed.map((m, i) => (
                <div key={i} className="member-profile-card" onClick={() => setSelectedMember(m)}>
                  <div className="member-card-image"><img src={m.image} alt={m.name} /></div>
                  <div className="member-card-content">
                    <h3 className="member-card-name">{m.name}</h3>
                    <span className="member-card-role" style={{ backgroundColor: m.role === 'Owner' ? `${community.color}30` : '#27272a', color: m.role === 'Owner' ? community.color : '#a1a1a1' }}>{m.role}</span>
                    <div className="member-card-teams">{m.teams?.map((t, j) => <span key={j} className="team-badge">{getTeamIcon(t)} {t}</span>)}</div>
                    <div className="member-card-links">{m.githubUrl && <a href={m.githubUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}><FaGithub /></a>}{m.linkedinUrl && <a href={m.linkedinUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}><FaLinkedin /></a>}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {community.githubOrgName && (
            <div className="projects-section">
              <h2 className="projects-title">Projects</h2>
              {repos.length > 0 ? (
                <div className="projects-grid">
                  {repos.map(r => (
                    <a key={r.id} href={r.html_url} target="_blank" rel="noopener noreferrer" className="project-card">
                      <h3 className="project-name">{r.name}</h3>
                      <p className="project-description">{r.description || 'No description'}</p>
                      <div className="project-meta">
                        {r.language && <span className="project-language"><span className="language-dot" style={{ backgroundColor: getLangColor(r.language) }}></span>{r.language}</span>}
                        <span className="project-stars"><FaStar /> {r.stargazers_count}</span>
                        <span className="project-forks"><FaCodeBranch /> {r.forks_count}</span>
                      </div>
                      <div className="project-updated">Updated {formatDate(r.updated_at)}</div>
                    </a>
                  ))}
                </div>
              ) : <div className="no-data-text">No repositories found</div>}
            </div>
          )}
        </div>

        {showSidebar && (
          <div className="sidebar-overlay" onClick={() => setShowSidebar(false)}>
            <div className="members-sidebar" onClick={e => e.stopPropagation()}>
              <div className="sidebar-header"><h2>All Members ({members.length})</h2><button className="sidebar-close" onClick={() => setShowSidebar(false)}><FaTimes /></button></div>
              <div className="sidebar-content">
                {members.map((m, i) => (
                  <div key={i} className="sidebar-member-card" onClick={() => { setSelectedMember(m); setShowSidebar(false); }}>
                    <img src={m.image} alt={m.name} className="sidebar-member-image" />
                    <div className="sidebar-member-info"><h4>{m.name}</h4><span className="sidebar-member-role">{m.role}</span><div className="sidebar-member-teams">{m.teams?.map((t, j) => <span key={j} className="team-tag">{t}</span>)}</div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedMember && (
          <div className="modal-overlay" onClick={() => setSelectedMember(null)}>
            <div className="member-detail-modal" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedMember(null)}><FaTimes /></button>
              <div className="member-detail-header"><img src={selectedMember.image} alt="" className="member-detail-image" /><div className="member-detail-info"><h2>{selectedMember.name}</h2><span className="member-detail-role" style={{ backgroundColor: `${community.color}30`, color: community.color }}>{selectedMember.role}</span></div></div>
              {selectedMember.bio && <p className="member-bio">{selectedMember.bio}</p>}
              {(selectedMember.location || selectedMember.company) && (
                <div className="member-meta">
                  {selectedMember.location && <span className="meta-item">📍 {selectedMember.location}</span>}
                  {selectedMember.company && <span className="meta-item">🏢 {selectedMember.company}</span>}
                </div>
              )}
              {(selectedMember.publicRepos || selectedMember.followers) && (
                <div className="member-stats">
                  {selectedMember.publicRepos && <span className="stat-item">{selectedMember.publicRepos} repos</span>}
                  {selectedMember.followers && <span className="stat-item">{selectedMember.followers} followers</span>}
                </div>
              )}
              {selectedMember.teams?.length > 0 && <div className="member-detail-teams"><h4>Teams</h4><div className="teams-list">{selectedMember.teams.map((t, i) => <span key={i} className="team-badge-large">{getTeamIcon(t)} {t}</span>)}</div></div>}
              <div className="member-detail-links">
                {selectedMember.githubUrl && <a href={selectedMember.githubUrl} target="_blank" rel="noopener noreferrer" className="detail-link github"><FaGithub /> GitHub</a>}
                {selectedMember.linkedinUrl && <a href={selectedMember.linkedinUrl} target="_blank" rel="noopener noreferrer" className="detail-link linkedin"><FaLinkedin /> LinkedIn</a>}
                {selectedMember.blog && <a href={selectedMember.blog.startsWith('http') ? selectedMember.blog : `https://${selectedMember.blog}`} target="_blank" rel="noopener noreferrer" className="detail-link website"><FaGlobe /> Website</a>}
              </div>
              {selectedMember.pastWork?.length > 0 && <div className="member-detail-work"><h4>Past Work</h4><div className="past-work-list">{selectedMember.pastWork.map((w, i) => <a key={i} href={w.url} target="_blank" rel="noopener noreferrer" className="past-work-item"><span className="work-type">{w.type}</span><h5>{w.title}</h5><p>{w.description}</p></a>)}</div></div>}
            </div>
          </div>
        )}

        {showJoinModal && (
          <div className="modal-overlay" onClick={() => setShowJoinModal(false)}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowJoinModal(false)}><FaTimes /></button>
              <div className="modal-header"><h2 className="modal-title">Request to Join</h2><p className="modal-subtitle">Fill in your details</p></div>
              <form className="join-form contact-form" onSubmit={handleSubmit}>
                <div className="form-group"><label className="form-label">Name *</label><input type="text" name="name" placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="form-input" /></div>
                <div className="form-group"><label className="form-label">Email *</label><input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className="form-input" /></div>
                <div className="form-group"><label className="form-label">GitHub URL *</label><input type="url" name="githubUrl" placeholder="https://github.com/username" value={form.githubUrl} onChange={e => setForm({ ...form, githubUrl: e.target.value })} required className="form-input" /></div>
                <div className="form-group"><label className="form-label">LinkedIn URL</label><input type="url" name="linkedinUrl" placeholder="https://linkedin.com/in/username" value={form.linkedinUrl} onChange={e => setForm({ ...form, linkedinUrl: e.target.value })} className="form-input" /></div>
                <div className="form-group"><label className="form-label">Contact *</label><input type="tel" name="contactNumber" placeholder="+91 9876543210" value={form.contactNumber} onChange={e => setForm({ ...form, contactNumber: e.target.value })} required className="form-input" /></div>
                <div className="form-group">
                  <label className="form-label">Teams *</label>
                  <div className="teams-selector">
                    <div className="teams-dropdown-toggle" onClick={() => setShowTeamDropdown(!showTeamDropdown)}>
                      {form.teams.length > 0 ? form.teams.join(', ') : 'Select teams to join'}
                      <FaChevronRight className={`dropdown-arrow ${showTeamDropdown ? 'open' : ''}`} />
                    </div>
                    {showTeamDropdown && (
                      <div className="teams-dropdown">
                        {TEAM_OPTIONS.map(team => (
                          <label key={team} className="team-checkbox">
                            <input type="checkbox" checked={form.teams.includes(team)} onChange={() => toggleTeam(team)} />
                            {getTeamIcon(team)} {team}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="form-group"><label className="form-label">Custom Team</label><input type="text" name="customTeam" placeholder="Other team (optional)" value={form.customTeam} onChange={e => setForm({ ...form, customTeam: e.target.value })} className="form-input" /></div>
                <button type="submit" className="submit-button" disabled={loading || (form.teams.length === 0 && !form.customTeam.trim())}>{loading ? 'Sending...' : 'Submit Request'}</button>
              </form>
            </div>
          </div>
        )}

        {showSuccessModal && (
          <div className="modal-overlay" onClick={() => setShowSuccessModal(false)}>
            <div className="modal-card success-modal" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowSuccessModal(false)}><FaTimes /></button>
              <div className="success-icon"><FaCheckCircle /></div>
              <h2 className="modal-title">Request Sent!</h2>
              <p className="modal-subtitle">Join our community channels:</p>
              <div className="success-links">
                <a href={community.discordJoinUrl || 'https://discord.gg/T2ySxBxRzP'} target="_blank" rel="noopener noreferrer" className="success-link discord"><FaDiscord /> Join Discord</a>
                <a href={community.githubOrgUrl} target="_blank" rel="noopener noreferrer" className="success-link github"><FaGithub /> GitHub</a>
              </div>
              <button className="close-success-btn" onClick={() => setShowSuccessModal(false)}>Done</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
