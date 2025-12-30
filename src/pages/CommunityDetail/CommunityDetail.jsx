import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaGithub, FaEnvelope, FaStar, FaCodeBranch, FaDiscord, FaGlobe, FaUsers, FaUserPlus, FaTimes, FaCheckCircle, FaLinkedin, FaChevronRight, FaCode, FaServer, FaPalette, FaCogs, FaSignInAlt, FaSignOutAlt, FaCrown, FaTrash, FaCheck, FaBan, FaCamera, FaEdit, FaSave, FaUser } from 'react-icons/fa';
import { uploadToCloudinary, DEFAULT_MALE_IMAGE } from '../../utils/cloudinaryUpload';
import './CommunityDetail.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const TEAM_OPTIONS = ['Backend', 'Frontend', 'Design', 'DevOps'];
const TECH_STACK_OPTIONS = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'Spring Boot', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Go', 'Rust', 'C++', 'Flutter', 'React Native', 'Next.js', 'Vue.js', 'Angular'];

const communityData = {
  'debug-oist': { name: 'OIST PROGRAMMING CLUB', logo: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1766704386/portfolio-images/un7oyxvfnsedotuaod9j.jpg', color: '#ef4444', description: 'think. build. deploy.', wallpaper: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1766704386/portfolio-images/un7oyxvfnsedotuaod9j.jpg', followers: 12, website: 'https://debugoist.nevernever.me/', discordUrl: 'https://discord.gg/JHGbXMsg43', discordJoinUrl: 'https://discord.gg/JHGbXMsg43', discordChannelUrl: 'https://discord.gg/JHGbXMsg43', githubOrgName: 'Nev-Labs', githubOrgUrl: 'https://github.com/orgs/Nev-Labs' },
  'com.the-boys-dev': { name: 'com.the-boys-dev', logo: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1766704388/portfolio-images/zw2ml9hamyshiieznbwz.jpg', color: '#a855f7', description: 'Helping fellow devs level up — no corporate fluff', wallpaper: 'https://wallpapers.com/images/featured/the-boys-1fe3hnl120ch1bc6.jpg', githubOrgName: 'com-the-boys-dev', githubOrgUrl: 'https://github.com/com-the-boys-dev', discordJoinUrl: 'https://discord.gg/T2ySxBxRzP', discordChannelUrl: 'https://discord.com/channels/1356022855183237211/1356022856013582579', ownerEmail: 'chaitanya4141sharma@gmail.com' }
};

const fallbackMembers = {
  'debug-oist': [
    { name: 'Ashish Baghel', role: 'Owner', githubUrl: 'https://github.com/nevernever69', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png', teams: ['Backend', 'DevOps'] },
    { name: 'Chaitanya Sharma', role: 'Member', githubUrl: 'https://github.com/41chaitanya', linkedinUrl: 'https://linkedin.com/in/41chaitanya', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662010/portfolio-images/bvjgyzlgfkeixlutr5ga.jpg', teams: ['Backend', 'Frontend'] }
  ],
  'com.the-boys-dev': [
    { name: 'Chaitanya Sharma', role: 'Owner', githubUrl: 'https://github.com/41chaitanya', linkedinUrl: 'https://linkedin.com/in/41chaitanya', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662010/portfolio-images/bvjgyzlgfkeixlutr5ga.jpg', teams: ['Backend', 'Frontend'] }
  ]
};

const getTeamIcon = (t) => t?.toLowerCase() === 'backend' ? <FaServer /> : t?.toLowerCase() === 'design' ? <FaPalette /> : t?.toLowerCase() === 'devops' ? <FaCogs /> : <FaCode />;
const getLangColor = (l) => ({ JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5', Java: '#b07219', HTML: '#e34c26', CSS: '#563d7c' }[l] || '#8b8b8b');
const formatDate = (d) => { const days = Math.floor((Date.now() - new Date(d)) / 86400000); return days === 0 ? 'today' : days === 1 ? 'yesterday' : days < 7 ? `${days} days ago` : days < 30 ? `${Math.floor(days/7)} weeks ago` : `${Math.floor(days/30)} months ago`; };

export default function CommunityDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const community = communityData[slug];
  const videoRef = useRef(null);

  // State
  const [repos, setRepos] = useState([]);
  const [members, setMembers] = useState([]);
  const [pendingMembers, setPendingMembers] = useState([]);
  const [showPreloader, setShowPreloader] = useState(slug === 'com.the-boys-dev');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileTab, setProfileTab] = useState('details'); // 'details' or 'contributions'
  const [editMode, setEditMode] = useState(false);
  const [profileForm, setProfileForm] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [loginStep, setLoginStep] = useState('email'); // 'email' or 'otp'
  const [loginForm, setLoginForm] = useState({ email: '', otp: '' });
  const [form, setForm] = useState({ name: '', email: '', githubUrl: '', linkedinUrl: '', contactNumber: '', teams: [], techStack: [], image: null, imagePreview: '' });
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  const [showTechDropdown, setShowTechDropdown] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [membersLoading, setMembersLoading] = useState(true);
  const [reposLoading, setReposLoading] = useState(true);
  const [error, setError] = useState('');

  // Check for saved login (JWT token) on page load
  useEffect(() => {
    const token = localStorage.getItem(`token_${slug}`);
    const savedUser = localStorage.getItem(`user_${slug}`);
    
    if (token && savedUser) {
      // Validate token with backend
      fetch(`${API_URL}/api/auth/validate`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(r => r.json())
        .then(d => {
          if (d.success) {
            // Token is valid, restore user session
            const user = JSON.parse(savedUser);
            setCurrentUser(user);
            // Update user data from backend response if available
            if (d.data) {
              const updatedUser = { ...user, ...d.data };
              setCurrentUser(updatedUser);
              localStorage.setItem(`user_${slug}`, JSON.stringify(updatedUser));
            }
          } else {
            // Token expired or invalid, clear storage
            localStorage.removeItem(`token_${slug}`);
            localStorage.removeItem(`user_${slug}`);
            setCurrentUser(null);
          }
        })
        .catch(() => {
          // Backend not available, but keep user logged in with saved data
          // Token will be validated on next API call
          try {
            setCurrentUser(JSON.parse(savedUser));
          } catch {
            localStorage.removeItem(`token_${slug}`);
            localStorage.removeItem(`user_${slug}`);
          }
        });
    }
  }, [slug]);

  // Fetch members
  useEffect(() => { 
    const fetchMembers = async () => {
      setMembersLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/members/community/${slug}`);
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data?.length > 0) { setMembers(data.data); setMembersLoading(false); return; }
        }
      } catch (err) { console.log('Backend not available'); }
      setMembers(fallbackMembers[slug] || []);
      setMembersLoading(false);
    };
    fetchMembers();
  }, [slug]);

  // Fetch pending members for admin
  const fetchPendingMembers = async () => {
    if (currentUser?.role === 'Owner' || currentUser?.role === 'Admin') {
      try {
        const token = localStorage.getItem(`token_${slug}`);
        const res = await fetch(`${API_URL}/api/members/community/${slug}/all`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        const data = await res.json();
        if (data.success) {
          setPendingMembers(data.data?.filter(m => m.status === 'PENDING') || []);
        }
      } catch (err) {
        console.log('Failed to fetch pending members');
      }
    }
  };

  useEffect(() => {
    fetchPendingMembers();
  }, [currentUser, slug]);

  // Refetch pending when admin panel opens
  useEffect(() => {
    if (showAdminPanel && currentUser?.role === 'Owner') {
      fetchPendingMembers();
    }
  }, [showAdminPanel]);

  useEffect(() => { if (slug === 'com.the-boys-dev' && videoRef.current) { videoRef.current.play().catch(() => {}); videoRef.current.onended = () => setShowPreloader(false); } }, [slug]);
  useEffect(() => { 
    if (community?.githubOrgName) {
      setReposLoading(true);
      fetch(`https://api.github.com/orgs/${community.githubOrgName}/repos?per_page=20`)
        .then(r => r.json())
        .then(d => { Array.isArray(d) && setRepos(d); setReposLoading(false); })
        .catch(() => setReposLoading(false)); 
    } else {
      setReposLoading(false);
    }
  }, [community?.githubOrgName]);

  // Send OTP handler
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginForm.email, communitySlug: slug, communityName: community?.name })
      });
      const data = await res.json();
      if (data.success) {
        setLoginStep('otp');
        setError('');
      } else { setError(data.message || 'Failed to send OTP'); }
    } catch { setError('Failed to send OTP. Try again.'); }
    finally { setLoading(false); }
  };

  // Verify OTP handler
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginForm.email, otp: loginForm.otp, communitySlug: slug })
      });
      const data = await res.json();
      if (data.success) {
        // Save JWT token and user data
        localStorage.setItem(`token_${slug}`, data.data.token);
        localStorage.setItem(`user_${slug}`, JSON.stringify(data.data.user));
        setCurrentUser(data.data.user);
        setShowLoginModal(false);
        setLoginForm({ email: '', otp: '' });
        setLoginStep('email');
      } else { setError(data.message || 'Invalid OTP'); }
    } catch { setError('Verification failed. Try again.'); }
    finally { setLoading(false); }
  };

  // Logout
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(`token_${slug}`);
    localStorage.removeItem(`user_${slug}`);
    setShowAdminPanel(false);
  };

  // Approve member
  const approveMember = async (id) => {
    try {
      const token = localStorage.getItem(`token_${slug}`);
      await fetch(`${API_URL}/api/members/${id}/status?status=APPROVED`, { 
        method: 'PUT',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      setPendingMembers(prev => prev.filter(m => m.id !== id));
      // Refresh members list
      const res = await fetch(`${API_URL}/api/members/community/${slug}`);
      const data = await res.json();
      if (data.success) setMembers(data.data);
    } catch { alert('Failed to approve'); }
  };

  // Reject member
  const rejectMember = async (id) => {
    try {
      const token = localStorage.getItem(`token_${slug}`);
      await fetch(`${API_URL}/api/members/${id}/status?status=REJECTED`, { 
        method: 'PUT',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      setPendingMembers(prev => prev.filter(m => m.id !== id));
    } catch { alert('Failed to reject'); }
  };

  // Kick member
  const kickMember = async (id) => {
    if (!confirm('Remove this member from the community?')) return;
    try {
      await fetch(`${API_URL}/api/members/${id}/kick/${slug}`, { method: 'DELETE' });
      setMembers(prev => prev.filter(m => m.id !== id));
    } catch { alert('Failed to kick member'); }
  };

  // Handle image selection for join form
  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm(prev => ({ ...prev, image: file, imagePreview: URL.createObjectURL(file) }));
    }
  };

  // Join form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Upload image to Cloudinary if selected
      let imageUrl = DEFAULT_MALE_IMAGE;
      if (form.image) {
        setUploading(true);
        try {
          imageUrl = await uploadToCloudinary(form.image);
        } catch {
          console.log('Image upload failed, using default');
        }
        setUploading(false);
      }

      const response = await fetch(`${API_URL}/api/members/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, communityName: slug, email: form.email, githubUrl: form.githubUrl, linkedinUrl: form.linkedinUrl, contactNumber: form.contactNumber, teams: form.teams, techStack: form.techStack, image: imageUrl })
      });
      if (response.ok) {
        setShowJoinModal(false); setShowSuccessModal(true);
        setForm({ name: '', email: '', githubUrl: '', linkedinUrl: '', contactNumber: '', teams: [], techStack: [], image: null, imagePreview: '' });
      } else throw new Error('Failed');
    } catch {
      // Fallback to Web3Forms
      const fd = new FormData();
      fd.append('subject', `Join Request - ${community?.name}`);
      fd.append('email', form.email);
      fd.append('message', `Community: ${community?.name}\nName: ${form.name}\nEmail: ${form.email}\nGitHub: ${form.githubUrl}\nLinkedIn: ${form.linkedinUrl}\nContact: ${form.contactNumber}\nTeams: ${form.teams.join(', ')}\nTech Stack: ${form.techStack.join(', ')}`);
      fd.append('access_key', '7c3bbfa0-a611-4ab3-ab54-26e91d98a846');
      try {
        const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd });
        if ((await res.json()).success) { setShowJoinModal(false); setShowSuccessModal(true); setForm({ name: '', email: '', githubUrl: '', linkedinUrl: '', contactNumber: '', teams: [], techStack: [], image: null, imagePreview: '' }); }
      } catch {}
    } finally { setLoading(false); }
  };

  // Open profile modal
  const openProfile = () => {
    setProfileForm({ ...currentUser });
    setEditMode(false);
    setProfileTab('details');
    setShowProfileModal(true);
  };

  // Handle profile image change
  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      try {
        const imageUrl = await uploadToCloudinary(file);
        setProfileForm(prev => ({ ...prev, image: imageUrl }));
      } catch {
        setError('Failed to upload image');
      }
      setUploading(false);
    }
  };

  // Save profile changes
  const saveProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem(`token_${slug}`);
      const res = await fetch(`${API_URL}/api/members/${currentUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(profileForm)
      });
      const data = await res.json();
      if (data.success) {
        const updatedUser = { ...currentUser, ...profileForm };
        setCurrentUser(updatedUser);
        localStorage.setItem(`user_${slug}`, JSON.stringify(updatedUser));
        setEditMode(false);
        // Refresh members list
        const membersRes = await fetch(`${API_URL}/api/members/community/${slug}`);
        const membersData = await membersRes.json();
        if (membersData.success) setMembers(membersData.data);
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch {
      setError('Failed to save changes');
    }
    setLoading(false);
  };

  const toggleTeam = (team) => setForm(prev => ({ ...prev, teams: prev.teams.includes(team) ? prev.teams.filter(t => t !== team) : [...prev.teams, team] }));
  const toggleTech = (tech) => setForm(prev => ({ ...prev, techStack: prev.techStack.includes(tech) ? prev.techStack.filter(t => t !== tech) : [...prev.techStack, tech] }));
  const toggleProfileTeam = (team) => setProfileForm(prev => ({ ...prev, teams: prev.teams?.includes(team) ? prev.teams.filter(t => t !== team) : [...(prev.teams || []), team] }));

  if (!community) return <div className="community-detail-page"><h1>Not Found</h1><button onClick={() => navigate('/community')} className="back-button"><FaArrowLeft /> Back</button></div>;

  const displayed = members.slice(0, 4);
  const hasMore = members.length > 4;


  return (
    <>
      {showPreloader && slug === 'com.the-boys-dev' && (
        <div className="preloader-container">
          <video ref={videoRef} className="preloader-video" muted playsInline>
            <source src={`${import.meta.env.BASE_URL}gifs/com_The_Boys_Preloader.mp4`} type="video/mp4" />
          </video>
          <div className="preloader-overlay">
            <div className="preloader-text">
              <span className="preloader-loading">Loading</span>
              <span className="preloader-dots">
                <span>.</span><span>.</span><span>.</span>
              </span>
            </div>
            <p className="preloader-subtitle">Preparing something diabolical</p>
          </div>
        </div>
      )}
      <div className="community-detail-page" style={{ ...(community.wallpaper ? { backgroundImage: `linear-gradient(to bottom, rgba(9,9,11,0.7), rgba(9,9,11,0.95)), url(${community.wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' } : {}), visibility: showPreloader ? 'hidden' : 'visible' }}>
        
        {/* Top buttons */}
        <div className="top-buttons">
          {currentUser ? (
            <>
              {currentUser.role === 'Owner' && <button onClick={() => setShowAdminPanel(true)} className="admin-btn"><FaCrown /> Admin</button>}
              <button onClick={openProfile} className="profile-btn">
                <img src={currentUser.image || DEFAULT_MALE_IMAGE} alt="" className="profile-btn-img" />
                <span>{currentUser.name?.split(' ')[0]}</span>
              </button>
              <button onClick={handleLogout} className="logout-btn"><FaSignOutAlt /></button>
            </>
          ) : (
            <button onClick={() => setShowLoginModal(true)} className="login-btn"><FaSignInAlt /> Login</button>
          )}
          <button onClick={() => navigate('/community')} className="back-button"><FaArrowLeft /> Back</button>
        </div>

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
            {slug !== 'debug-oist' && <button onClick={() => setShowJoinModal(true)} className="join-community-btn"><FaUserPlus /> Request to Join</button>}
          </div>
        </div>

        <div className="community-detail-content">
          <div className="members-section">
            <div className="members-header"><h2 className="members-title">Team Members</h2>{!membersLoading && hasMore && <button className="view-all-btn" onClick={() => setShowSidebar(true)}>View All ({members.length}) <FaChevronRight /></button>}</div>
            <div className="members-grid">
              {membersLoading ? (
                // Skeleton loading cards
                [...Array(4)].map((_, i) => (
                  <div key={i} className="member-profile-card skeleton-card">
                    <div className="member-card-image skeleton-image"></div>
                    <div className="member-card-content">
                      <div className="skeleton-text skeleton-name"></div>
                      <div className="skeleton-text skeleton-role"></div>
                      <div className="skeleton-text skeleton-teams"></div>
                    </div>
                  </div>
                ))
              ) : (
                displayed.map((m, i) => (
                  <div key={i} className="member-profile-card" onClick={() => setSelectedMember(m)}>
                    <div className="member-card-image"><img src={m.image} alt={m.name} /></div>
                    <div className="member-card-content">
                      <h3 className="member-card-name">{m.name}</h3>
                      <span className="member-card-role" style={{ backgroundColor: m.role === 'Owner' ? `${community.color}30` : '#27272a', color: m.role === 'Owner' ? community.color : '#a1a1a1' }}>{m.role}</span>
                      <div className="member-card-teams">{m.teams?.map((t, j) => <span key={j} className="team-badge">{getTeamIcon(t)} {t}</span>)}</div>
                      <div className="member-card-links">{m.githubUrl && <a href={m.githubUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}><FaGithub /></a>}{m.linkedinUrl && <a href={m.linkedinUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}><FaLinkedin /></a>}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {community.githubOrgName && (
            <div className="projects-section">
              <h2 className="projects-title">Projects</h2>
              {reposLoading ? (
                <div className="projects-grid">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="project-card skeleton-card">
                      <div className="skeleton-text skeleton-project-name"></div>
                      <div className="skeleton-text skeleton-project-desc"></div>
                      <div className="skeleton-text skeleton-project-meta"></div>
                    </div>
                  ))}
                </div>
              ) : repos.length > 0 ? (
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

        {/* Login Modal */}
        {showLoginModal && (
          <div className="modal-overlay" onClick={() => { setShowLoginModal(false); setError(''); setLoginStep('email'); }}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => { setShowLoginModal(false); setError(''); setLoginStep('email'); }}><FaTimes /></button>
              <div className="modal-header">
                <h2 className="modal-title">{loginStep === 'email' ? 'Member Login' : 'Enter OTP'}</h2>
                <p className="modal-subtitle">{loginStep === 'email' ? 'Enter your email to receive OTP' : `OTP sent to ${loginForm.email}`}</p>
              </div>
              {error && <div className="error-message">{error}</div>}
              
              {loginStep === 'email' ? (
                <form className="join-form contact-form" onSubmit={handleSendOtp}>
                  <div className="form-group"><label className="form-label">Email</label><input type="email" placeholder="your@email.com" value={loginForm.email} onChange={e => setLoginForm({ ...loginForm, email: e.target.value })} required className="form-input" /></div>
                  <button type="submit" className="submit-button" disabled={loading}>{loading ? 'Sending OTP...' : 'Send OTP'}</button>
                </form>
              ) : (
                <form className="join-form contact-form" onSubmit={handleVerifyOtp}>
                  <div className="form-group"><label className="form-label">OTP</label><input type="text" placeholder="Enter 6-digit OTP" value={loginForm.otp} onChange={e => setLoginForm({ ...loginForm, otp: e.target.value })} required maxLength={6} className="form-input otp-input" /></div>
                  <button type="submit" className="submit-button" disabled={loading}>{loading ? 'Verifying...' : 'Verify & Login'}</button>
                  <button type="button" className="forgot-password-btn" onClick={() => { setLoginStep('email'); setError(''); }}>← Back to Email</button>
                  <button type="button" className="forgot-password-btn" onClick={handleSendOtp} disabled={loading}>Resend OTP</button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Forgot Password Modal - Removed, using OTP now */}

        {/* Admin Panel */}
        {showAdminPanel && currentUser?.role === 'Owner' && (
          <div className="modal-overlay" onClick={() => setShowAdminPanel(false)}>
            <div className="admin-panel" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowAdminPanel(false)}><FaTimes /></button>
              <div className="admin-header"><h2><FaCrown /> Admin Panel</h2><p>Manage {community.name}</p></div>
              
              {/* Pending Requests */}
              <div className="admin-section">
                <h3>Pending Requests ({pendingMembers.length})</h3>
                {pendingMembers.length > 0 ? (
                  <div className="admin-list">
                    {pendingMembers.map(m => (
                      <div key={m.id} className="admin-member-card">
                        <img src={m.image} alt="" className="admin-member-img" />
                        <div className="admin-member-info">
                          <h4>{m.name}</h4>
                          <p>{m.email}</p>
                          <div className="admin-member-teams">{m.teams?.map((t, i) => <span key={i}>{t}</span>)}</div>
                        </div>
                        <div className="admin-actions">
                          <button className="approve-btn" onClick={() => approveMember(m.id)}><FaCheck /> Approve</button>
                          <button className="reject-btn" onClick={() => rejectMember(m.id)}><FaBan /> Reject</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : <p className="no-pending">No pending requests</p>}
              </div>

              {/* Current Members */}
              <div className="admin-section">
                <h3>Current Members ({members.length})</h3>
                <div className="admin-list">
                  {members.map(m => (
                    <div key={m.id} className="admin-member-card">
                      <img src={m.image} alt="" className="admin-member-img" />
                      <div className="admin-member-info">
                        <h4>{m.name} {m.role === 'Owner' && <FaCrown className="owner-icon" />}</h4>
                        <p>{m.email}</p>
                        <div className="admin-member-teams">{m.teams?.map((t, i) => <span key={i}>{t}</span>)}</div>
                      </div>
                      {m.role !== 'Owner' && (
                        <div className="admin-actions">
                          <button className="kick-btn" onClick={() => kickMember(m.id)}><FaTrash /> Kick</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Members Sidebar */}
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

        {/* Member Detail Modal */}
        {selectedMember && (
          <div className="modal-overlay" onClick={() => setSelectedMember(null)}>
            <div className="member-detail-modal" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedMember(null)}><FaTimes /></button>
              <div className="member-detail-header"><img src={selectedMember.image} alt="" className="member-detail-image" /><div className="member-detail-info"><h2>{selectedMember.name}</h2><span className="member-detail-role" style={{ backgroundColor: `${community.color}30`, color: community.color }}>{selectedMember.role}</span></div></div>
              {selectedMember.teams?.length > 0 && <div className="member-detail-teams"><h4>Teams</h4><div className="teams-list">{selectedMember.teams.map((t, i) => <span key={i} className="team-badge-large">{getTeamIcon(t)} {t}</span>)}</div></div>}
              <div className="member-detail-links">
                {selectedMember.githubUrl && <a href={selectedMember.githubUrl} target="_blank" rel="noopener noreferrer" className="detail-link github"><FaGithub /> GitHub</a>}
                {selectedMember.linkedinUrl && <a href={selectedMember.linkedinUrl} target="_blank" rel="noopener noreferrer" className="detail-link linkedin"><FaLinkedin /> LinkedIn</a>}
              </div>
            </div>
          </div>
        )}

        {/* Join Modal */}
        {showJoinModal && (
          <div className="modal-overlay" onClick={() => setShowJoinModal(false)}>
            <div className="modal-card" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowJoinModal(false)}><FaTimes /></button>
              <div className="modal-header"><h2 className="modal-title">Request to Join</h2><p className="modal-subtitle">Fill in your details</p></div>
              <form className="join-form contact-form" onSubmit={handleSubmit}>
                {/* Profile Image Upload */}
                <div className="form-group image-upload-group">
                  <label className="form-label">Profile Photo</label>
                  <div className="image-upload-container">
                    <label className="image-preview-upload">
                      {form.imagePreview ? (
                        <img src={form.imagePreview} alt="Preview" className="uploaded-image" />
                      ) : (
                        <div className="upload-placeholder">
                          <FaCamera className="upload-icon" />
                          <span>Upload Profile Picture</span>
                        </div>
                      )}
                      <input type="file" accept="image/*" onChange={handleImageSelect} hidden />
                    </label>
                  </div>
                </div>
                <div className="form-group"><label className="form-label">Name *</label><input type="text" placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className="form-input" /></div>
                <div className="form-group"><label className="form-label">Email *</label><input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className="form-input" /></div>
                <div className="form-group"><label className="form-label">GitHub URL *</label><input type="url" placeholder="https://github.com/username" value={form.githubUrl} onChange={e => setForm({ ...form, githubUrl: e.target.value })} required className="form-input" /></div>
                <div className="form-group"><label className="form-label">LinkedIn URL</label><input type="url" placeholder="https://linkedin.com/in/username" value={form.linkedinUrl} onChange={e => setForm({ ...form, linkedinUrl: e.target.value })} className="form-input" /></div>
                <div className="form-group"><label className="form-label">Contact *</label><input type="tel" placeholder="+91 9876543210" value={form.contactNumber} onChange={e => setForm({ ...form, contactNumber: e.target.value })} required className="form-input" /></div>
                <div className="form-group">
                  <label className="form-label">Teams *</label>
                  <div className="teams-selector">
                    <div className="teams-dropdown-toggle" onClick={() => setShowTeamDropdown(!showTeamDropdown)}>
                      {form.teams.length > 0 ? form.teams.join(', ') : 'Select teams'}
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
                <div className="form-group">
                  <label className="form-label">Tech Stack</label>
                  <div className="teams-selector">
                    <div className="teams-dropdown-toggle" onClick={() => setShowTechDropdown(!showTechDropdown)}>
                      {form.techStack.length > 0 ? form.techStack.join(', ') : 'Select your tech stack'}
                      <FaChevronRight className={`dropdown-arrow ${showTechDropdown ? 'open' : ''}`} />
                    </div>
                    {showTechDropdown && (
                      <div className="teams-dropdown tech-dropdown">
                        {TECH_STACK_OPTIONS.map(tech => (
                          <label key={tech} className="team-checkbox">
                            <input type="checkbox" checked={form.techStack.includes(tech)} onChange={() => toggleTech(tech)} />
                            {tech}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <button type="submit" className="submit-button" disabled={loading || uploading || form.teams.length === 0}>{uploading ? 'Uploading image...' : loading ? 'Sending...' : 'Submit Request'}</button>
              </form>
            </div>
          </div>
        )}

        {/* Success Modal */}
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

        {/* Profile Modal */}
        {showProfileModal && currentUser && (
          <div className="modal-overlay" onClick={() => setShowProfileModal(false)}>
            <div className="profile-modal" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowProfileModal(false)}><FaTimes /></button>
              
              {/* Profile Header */}
              <div className="profile-header">
                <div className="profile-image-container">
                  <img src={profileForm.image || DEFAULT_MALE_IMAGE} alt="" className="profile-image" />
                  {editMode && (
                    <>
                      <label className="profile-image-edit">
                        <FaCamera />
                        <input type="file" accept="image/*" onChange={handleProfileImageChange} hidden />
                      </label>
                      <span className="profile-image-hint">Upload your profile photo</span>
                    </>
                  )}
                  {uploading && <div className="upload-overlay">Uploading...</div>}
                </div>
                <div className="profile-info">
                  <h2>{profileForm.name}</h2>
                  <span className="profile-role" style={{ backgroundColor: `${community.color}30`, color: community.color }}>{profileForm.role}</span>
                  <p className="profile-email">{profileForm.email}</p>
                </div>
                {!editMode ? (
                  <button className="edit-profile-btn" onClick={() => setEditMode(true)}><FaEdit /> Edit Profile</button>
                ) : (
                  <button className="save-profile-btn" onClick={saveProfile} disabled={loading}><FaSave /> {loading ? 'Saving...' : 'Save'}</button>
                )}
              </div>

              {/* Profile Tabs */}
              <div className="profile-tabs">
                <button className={`profile-tab ${profileTab === 'details' ? 'active' : ''}`} onClick={() => setProfileTab('details')}><FaUser /> Details</button>
                <button className={`profile-tab ${profileTab === 'contributions' ? 'active' : ''}`} onClick={() => setProfileTab('contributions')}><FaCode /> Contributions</button>
              </div>

              {/* Tab Content */}
              {profileTab === 'details' ? (
                <div className="profile-details">
                  {error && <div className="error-message">{error}</div>}
                  
                  <div className="profile-field">
                    <label>Name</label>
                    {editMode ? (
                      <input type="text" value={profileForm.name || ''} onChange={e => setProfileForm({ ...profileForm, name: e.target.value })} className="profile-input" />
                    ) : (
                      <p>{profileForm.name}</p>
                    )}
                  </div>

                  <div className="profile-field">
                    <label>Email</label>
                    {editMode ? (
                      <input type="email" value={profileForm.email || ''} onChange={e => setProfileForm({ ...profileForm, email: e.target.value })} className="profile-input" />
                    ) : (
                      <p>{profileForm.email}</p>
                    )}
                  </div>

                  <div className="profile-field">
                    <label>GitHub</label>
                    {editMode ? (
                      <input type="url" value={profileForm.githubUrl || ''} onChange={e => setProfileForm({ ...profileForm, githubUrl: e.target.value })} className="profile-input" />
                    ) : (
                      <a href={profileForm.githubUrl} target="_blank" rel="noopener noreferrer">{profileForm.githubUrl}</a>
                    )}
                  </div>

                  <div className="profile-field">
                    <label>LinkedIn</label>
                    {editMode ? (
                      <input type="url" value={profileForm.linkedinUrl || ''} onChange={e => setProfileForm({ ...profileForm, linkedinUrl: e.target.value })} className="profile-input" />
                    ) : (
                      <a href={profileForm.linkedinUrl} target="_blank" rel="noopener noreferrer">{profileForm.linkedinUrl || 'Not set'}</a>
                    )}
                  </div>

                  <div className="profile-field">
                    <label>Teams</label>
                    {editMode ? (
                      <div className="profile-teams-edit">
                        {TEAM_OPTIONS.map(team => (
                          <label key={team} className="team-checkbox-inline">
                            <input type="checkbox" checked={profileForm.teams?.includes(team)} onChange={() => toggleProfileTeam(team)} />
                            {team}
                          </label>
                        ))}
                      </div>
                    ) : (
                      <div className="profile-teams">
                        {profileForm.teams?.map((t, i) => <span key={i} className="team-badge">{getTeamIcon(t)} {t}</span>)}
                      </div>
                    )}
                  </div>

                  <div className="profile-field">
                    <label>Tech Stack</label>
                    {editMode ? (
                      <div className="profile-tech-edit">
                        <div className="tech-chips-container">
                          {profileForm.techStack?.map((t, i) => (
                            <span key={i} className="tech-chip">
                              {t}
                              <button type="button" onClick={() => setProfileForm({ ...profileForm, techStack: profileForm.techStack.filter((_, idx) => idx !== i) })}>×</button>
                            </span>
                          ))}
                        </div>
                        <div className="tech-dropdown-wrapper">
                          <select 
                            className="tech-select"
                            onChange={e => {
                              if (e.target.value && !profileForm.techStack?.includes(e.target.value)) {
                                setProfileForm({ ...profileForm, techStack: [...(profileForm.techStack || []), e.target.value] });
                              }
                              e.target.value = '';
                            }}
                          >
                            <option value="">Add tech...</option>
                            {TECH_STACK_OPTIONS.filter(t => !profileForm.techStack?.includes(t)).map(t => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : (
                      <div className="profile-tech">
                        {profileForm.techStack?.length > 0 ? profileForm.techStack.map((t, i) => <span key={i} className="tech-tag">{t}</span>) : <span className="no-data">Not specified</span>}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="profile-contributions">
                  <h3>Your Contributions</h3>
                  {profileForm.pastWork?.length > 0 ? (
                    <div className="contributions-list">
                      {profileForm.pastWork.map((work, i) => (
                        <div key={i} className="contribution-card">
                          <div className="contribution-header">
                            <span className="contribution-type">{work.type || 'Project'}</span>
                            <span className="contribution-date">{work.date || ''}</span>
                          </div>
                          <h4>{work.title}</h4>
                          <p>{work.description}</p>
                          {work.url && <a href={work.url} target="_blank" rel="noopener noreferrer" className="contribution-link"><FaGithub /> View Project</a>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-contributions">
                      <FaCode className="no-contrib-icon" />
                      <p>No contributions yet</p>
                      <span>Your projects and contributions will appear here once added</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
