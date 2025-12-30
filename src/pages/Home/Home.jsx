import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TextRoll } from '../../components/TextRoll';
import { AnimatedDock } from '../../components/AnimatedDock';
import HackathonDetailModal from '../../components/HackathonDetailModal';
import ProjectDetailModal from '../../components/ProjectDetailModal';
import { FaGithub, FaInstagram, FaTwitter, FaDownload, FaLinkedin, FaJava, FaDocker, FaUsers } from 'react-icons/fa';
import { SiSpringboot, SiPostgresql, SiMongodb, SiRedis, SiApachekafka, SiKubernetes } from 'react-icons/si';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const handleHackathonClick = (hackathon) => {
    setSelectedHackathon(hackathon);
    setIsModalOpen(true);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsProjectModalOpen(true);
  };

  const homeProjects = [
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
    }
  ];

  const homeHackathons = [
    {
      id: 1,
      image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662013/portfolio-images/vjrrsg26b8lxjeekc3gc.jpg',
      title: 'Smart India Hackathon - SIH 2025',
      date: 'Grand Finale 2025',
      description: 'Grand Finalist at Smart India Hackathon 2025, NIT Durgapur - AI-Driven Train Induction Planning & Scheduling for Kochi Metro Rail Ltd (KMRL). Among thousands of teams nationwide, Team Haste competed on a national stage representing Oriental Institute of Science & Technology.',
      achievements: 'Grand Finalist Recognition - After weeks of intensive preparation and a grueling 36-hour finale, Team Haste delivered an innovative AI-driven solution for train induction planning at KMRL. The journey was marked by late-night coding marathons, debugging challenges, and unbreakable teamwork. While we didn\'t secure the trophy, we gained invaluable national-level exposure, real-world problem-solving experience, and proved our technical prowess. This wasn\'t a loss—it was our launchpad. Special thanks to our judges Dr. Amitava Akuli, Rajdeep Bhattacharya, and Amit Sarkar for their insightful guidance, and our mentors Dr. Abhishek Sharma and Dr. Prabhat Sharma for their unwavering support throughout the journey.',
      gallery: [
        { src: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662013/portfolio-images/vjrrsg26b8lxjeekc3gc.jpg', caption: 'Team Assembled' },
        { src: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662013/portfolio-images/veqofodjqs1gfr5jaeqq.jpg', caption: 'Team Presentation' },
        { src: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662013/portfolio-images/oos7jp9q8yypoaqruobv.jpg', caption: 'Certificate Distribution' },
        { src: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662014/portfolio-images/owywzopys0mwv1lgas2r.jpg', caption: 'Deployed App QR Code' },
      ],
      teamMembers: [
        { name: 'Aditya Giri', role: 'React Developer', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662014/portfolio-images/ms8sxxzi011polvwfgqh.png', linkedin: 'https://www.linkedin.com/in/adityagiri14/' },
        { name: 'Chaitanya Sharma', role: 'Android Developer', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662010/portfolio-images/bvjgyzlgfkeixlutr5ga.jpg', linkedin: 'https://www.linkedin.com/in/chaitanya-sharma-799041301' },
        { name: 'Ansh Mishra', role: 'Backend Developer', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662077/portfolio-images/ksa1nwlkvkwmni5fxtea.jpg', linkedin: 'https://www.linkedin.com/in/ansh-mishraa/' },
        { name: 'Shrey Shrivastava', role: 'ML Engineer', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662011/portfolio-images/mesisgunr5y6x7pd5gcy.jpg', linkedin: 'https://www.linkedin.com/in/shrey1184/' },
        { name: 'Harshawardhan Shrivastava', role: 'AI Agents & Tools Master', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662012/portfolio-images/rd8k4wmidqdfi16jxyei.jpg', linkedin: 'https://www.linkedin.com/in/connect-harshawardhanshrivastava/' },
        { name: 'Sanju Kumari', role: 'UI/UX & Project Management', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662012/portfolio-images/etihtjvroehvdxdxxu8m.jpg', linkedin: 'https://www.linkedin.com/in/sanju-kumari-42ba60285/' },
      ],
      projectLinks: {
        github: 'https://github.com/41chaitanya/KMRL-SIH-2025-finalsol'
      }
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662014/portfolio-images/yeivmtj2xeewts7nrjjk.jpg',
      title: 'Ethos Hackathon - IIT Guwahati',
      date: 'January 2025',
      description: 'Top 5 Position - Campus Entity Resolution & Security Monitoring System with ML-powered entity resolution achieving 99.2% accuracy and predictive analytics with 94.3% location prediction accuracy.',
      achievements: 'Developed a comprehensive campus security platform using the Fellegi-Sunter algorithm, XGBoost, and LSTM models with real-time anomaly detection. Built with MERN stack, Python FastAPI, Redis, and Neo4j, achieving sub-200ms response times and processing over 1000 records per minute. The system includes GDPR-compliant privacy features and reached 91.8% accuracy for activity prediction, making it a standout project among all participants.',
      gallery: [
        { src: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662014/portfolio-images/yeivmtj2xeewts7nrjjk.jpg', caption: 'Me in IIT Guwahati front of lake' },
        { src: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662014/portfolio-images/vbhanlh2ed0pjeg1c8ai.jpg', caption: 'Team Presentation - Campus Security Platform' },
        { src: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662014/portfolio-images/qsqkgjtczjtq4bb3y5ew.jpg', caption: 'Certificate Distribution - Top 5 Winners' },
      ],
      teamMembers: [
        { name: 'Chaitanya Sharma', role: 'ML Engineer', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662014/portfolio-images/zb6eerukzyxjuyapi5bu.jpg', linkedin: 'https://www.linkedin.com/in/chaitanya-sharma-799041301' },
        { name: 'Aadarsh Dangi', role: 'Frontend Developer', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662011/portfolio-images/ztrfs1qjhpf7ha6ram4d.jpg', linkedin: 'https://www.linkedin.com/in/aadarshdangi/' },
        { name: 'Aditya Giri', role: 'Backend Developer', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662014/portfolio-images/ms8sxxzi011polvwfgqh.png', linkedin: 'https://www.linkedin.com/in/adityagiri14/' },
      ],
      projectLinks: {
        github: 'https://github.com/41chaitanya/campus-security-system',
        demo: 'https://campus-security-system-six.vercel.app/loginpase'
      }
    }
  ];

  return (
    <div className="page-container home-page">
      <div className="profile-section">
        <div 
          className="profile-circle"
          onClick={() => window.open('https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662010/portfolio-images/bvjgyzlgfkeixlutr5ga.jpg', '_blank')}
          style={{ cursor: 'pointer' }}
        >
          <img 
            src='https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662010/portfolio-images/bvjgyzlgfkeixlutr5ga.jpg' 
            alt="Profile" 
            className="profile-image"
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
          <p style={{ fontSize: '1.8rem', margin: 0, fontWeight: 700 }}>Hi, I am</p>
          {/* Desktop: TextRoll animation */}
          <h1 className="greeting greeting-desktop" style={{ gap: '15px', alignItems: 'center', margin: 0, textAlign: 'left' }}>
            <TextRoll center>Chaitanya</TextRoll>
            <TextRoll center>Sharma</TextRoll>
          </h1>
          {/* Mobile: Plain text */}
          <h1 className="greeting greeting-mobile" style={{ margin: 0, textAlign: 'center', fontSize: '1.5rem', fontWeight: 700 }}>
            Chaitanya Sharma
          </h1>
        </div>
        
        <div className="intro-text">
          <p>
            Hey there! I'm Chaitanya Sharma, an aspiring Java Spring Boot developer just starting my journey 
            in backend development. As a beginner, I'm passionate about learning and building solid foundations 
            in software development.
          </p>
          <p>
            I'm eager to explore microservices, database design, and RESTful APIs. With dedication and continuous 
            learning, I'm committed to growing my skills and contributing to meaningful projects. Recently, I was honored 
            to compete as a <strong>Grand Finalist at Smart India Hackathon 2025</strong>, a prestigious national-level innovation 
            platform.
          </p>
          <p>
            I also run a developer community called <Link to="/community/com.the-boys-dev" className="community-link">com.the-boys-dev</Link> — 
            a space where fellow devs level up together, share knowledge, and build cool stuff without the corporate fluff. 
            Let's build something great together!
          </p>
        </div>

        <div className="action-buttons">
          <button className="contact-button" onClick={() => navigate('/contact')}>
            Get in Touch
          </button>

          <a 
            href="https://drive.google.com/file/d/1TMoFenhKBv-Y3QuLzQ-DS43wtlNSMI1G/view?usp=sharing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="cv-button"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
          >
            <FaDownload style={{ marginRight: '8px' }} />
            Download CV
          </a>

          <Link to="/community/com.the-boys-dev" className="community-button">
            <FaUsers style={{ marginRight: '8px' }} />
            My Community
          </Link>
          
          <div className="social-icons">
            <a href="https://www.linkedin.com/in/chaitanya-sharma-799041301" target="_blank" rel="noopener noreferrer" className="social-icon" title="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://github.com/41chaitanya" target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub">
              <FaGithub />
            </a>
            <a href="#" className="social-icon" title="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="social-icon" title="Twitter">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '60px', maxWidth: '800px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '40px', marginTop: '40px', textAlign: 'left', position: 'relative', paddingBottom: '15px' }} className="home-section-title">Hackathons & Events</h2>
        <div className="home-achievements-grid">
          {homeHackathons.map((hackathon) => (
            <div 
              key={hackathon.id}
              className="home-achievement-card"
              onClick={() => handleHackathonClick(hackathon)}
              style={{ cursor: 'pointer' }}
            >
              <div className="home-achievement-image-wrapper">
                <img src={hackathon.image} alt={hackathon.title} className="home-achievement-image" />
              </div>
              <div className="home-achievement-content">
                <h3 className="home-achievement-title">{hackathon.title}</h3>
                <p className="home-achievement-date">{hackathon.date}</p>
                <p className="home-achievement-desc">{hackathon.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="see-more-button" onClick={() => navigate('/achievements')}>
          See All Hackathons
        </button>
      </div>

      <div style={{ marginTop: '60px', maxWidth: '800px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '40px', marginTop: '40px', textAlign: 'left', position: 'relative', paddingBottom: '15px' }} className="home-section-title">Featured Projects</h2>
        <div className="home-projects-grid">
          {homeProjects.map((project) => (
            <div 
              key={project.id} 
              className="home-project-card"
              onClick={() => handleProjectClick(project)}
            >
              <div className="home-project-image-wrapper">
                <img src={project.image} alt={project.title} className="home-project-image" />
              </div>
              <div className="home-project-content">
                <h3 className="home-project-title">{project.title}</h3>
                <p className="home-project-desc">{project.description}</p>
                <div className="home-project-tech">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="home-tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="see-all-projects-button" onClick={() => navigate('/projects')}>
          See All Projects
        </button>
      </div>

      <div style={{ marginTop: '80px', maxWidth: '800px' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '40px', marginTop: '40px', textAlign: 'left', position: 'relative', paddingBottom: '15px' }} className="home-section-title">Tech Stack</h2>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <AnimatedDock
          items={[
            { title: 'Java', icon: <FaJava size={24} /> },
            { title: 'Spring Boot', icon: <SiSpringboot size={24} /> },
            { title: 'PostgreSQL', icon: <SiPostgresql size={24} /> },
            { title: 'MongoDB', icon: <SiMongodb size={24} /> },
            { title: 'Redis', icon: <SiRedis size={24} /> },
            { title: 'Apache Kafka', icon: <SiApachekafka size={24} /> },
            { title: 'Docker', icon: <FaDocker size={24} /> },
            { title: 'Kubernetes', icon: <SiKubernetes size={24} /> },
          ]}
        />
        </div>
      </div>

      <HackathonDetailModal 
        isOpen={isModalOpen}
        hackathon={selectedHackathon}
        onClose={() => setIsModalOpen(false)}
      />

      <ProjectDetailModal 
        isOpen={isProjectModalOpen}
        project={selectedProject}
        onClose={() => setIsProjectModalOpen(false)}
      />
    </div>
  );
}
