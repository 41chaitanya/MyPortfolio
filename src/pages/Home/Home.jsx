import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextRoll } from '../../components/TextRoll';
import { AnimatedDock } from '../../components/AnimatedDock';
import HackathonDetailModal from '../../components/HackathonDetailModal';
import { FaGithub, FaInstagram, FaTwitter, FaDownload, FaLinkedin, FaJava, FaDocker } from 'react-icons/fa';
import { SiSpringboot, SiPostgresql, SiMongodb, SiRedis, SiApachekafka, SiKubernetes } from 'react-icons/si';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHackathonClick = (hackathon) => {
    setSelectedHackathon(hackathon);
    setIsModalOpen(true);
  };

  const homeHackathons = [
    {
      id: 1,
      image: '/image/IITG.jpeg',
      title: 'Ethos Hackathon - IIT Guwahati',
      date: 'January 2025',
      description: 'Top 5 Position - Developed campus security platform with ML-powered entity resolution achieving 99.2% accuracy and predictive analytics with 94.3% location prediction accuracy.',
      achievements: 'Successfully implemented a comprehensive security solution using advanced machine learning algorithms. The platform demonstrated exceptional accuracy in entity resolution and predictive analytics, making it a standout project among all participants.',
      gallery: [
        { src: '/image/IITG.jpeg', caption: 'Opening Ceremony - IIT Guwahati Campus' },
        { src: '/image/IITG.jpeg', caption: 'Team Presentation - Campus Security Platform' },
        { src: '/image/IITG.jpeg', caption: 'Award Ceremony - Top 5 Winners' },
      ],
      teamMembers: [
        { name: 'Chaitanya Sharma', role: 'Backend Developer', image: '/image/myImage.jpg', linkedin: 'https://www.linkedin.com/in/chaitanya-sharma-799041301' },
        { name: 'Team Member 2', role: 'Frontend Developer', image: '/image/myImage.jpg', linkedin: 'https://www.linkedin.com/in/' },
        { name: 'Team Member 3', role: 'ML Engineer', image: '/image/myImage.jpg', linkedin: 'https://www.linkedin.com/in/' },
      ]
    },
    {
      id: 2,
      image: '/image/codeUrja.jpeg',
      title: 'Code Urja - Indore',
      date: 'February 2025',
      description: '2nd Position - Built innovative solution leveraging Spring Boot microservices, real-time data processing with Kafka, and advanced analytics.',
      achievements: 'Achieved 2nd position with a robust microservices architecture. The solution showcased excellent scalability and real-time processing capabilities, impressing the judges with its technical depth and practical implementation.',
      gallery: [
        { src: '/image/codeUrja.jpeg', caption: 'Code Urja Event - Indore' },
        { src: '/image/codeUrja.jpeg', caption: 'Team Working Session' },
        { src: '/image/codeUrja.jpeg', caption: 'Prize Distribution - 2nd Position' },
      ],
      teamMembers: [
        { name: 'Chaitanya Sharma', role: 'Lead Developer', image: '/image/myImage.jpg', linkedin: 'https://www.linkedin.com/in/chaitanya-sharma-799041301' },
        { name: 'Team Member 2', role: 'DevOps Engineer', image: '/image/myImage.jpg', linkedin: 'https://www.linkedin.com/in/' },
      ]
    }
  ];

  return (
    <div className="page-container home-page">
      <div className="profile-section">
        <div 
          className="profile-circle"
          onClick={() => window.open('/image/myImage.jpg', '_blank')}
          style={{ cursor: 'pointer' }}
        >
          <img 
            src="/image/myImage.jpg" 
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
            learning, I'm committed to growing my skills and contributing to meaningful projects. Let's build 
            something great together!
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
          <div className="home-project-card">
            <div className="home-project-image-wrapper">
              <img src="/image/project1.jpg" alt="Campus Security Platform" className="home-project-image" />
            </div>
            <div className="home-project-content">
              <h3 className="home-project-title">Campus Entity Resolution & Security</h3>
              <p className="home-project-desc">ML-powered security platform with 99.2% entity resolution accuracy and predictive analytics using XGBoost and LSTM.</p>
              <div className="home-project-tech">
                <span className="home-tech-tag">Python</span>
                <span className="home-tech-tag">FastAPI</span>
                <span className="home-tech-tag">Neo4j</span>
              </div>
            </div>
          </div>

          <div className="home-project-card">
            <div className="home-project-image-wrapper">
              <img src="/image/project2.jpg" alt="Online Banking Portal" className="home-project-image" />
            </div>
            <div className="home-project-content">
              <h3 className="home-project-title">Online Banking Portal</h3>
              <p className="home-project-desc">Full-stack banking platform with account management, fund transfers, and real-time notifications using Spring Boot and Kafka.</p>
              <div className="home-project-tech">
                <span className="home-tech-tag">Spring Boot</span>
                <span className="home-tech-tag">PostgreSQL</span>
                <span className="home-tech-tag">Kafka</span>
              </div>
            </div>
          </div>

          <div className="home-project-card">
            <div className="home-project-image-wrapper">
              <img src="/image/project3.jpg" alt="Trading Dashboard" className="home-project-image" />
            </div>
            <div className="home-project-content">
              <h3 className="home-project-title">Real-Time Trading Dashboard</h3>
              <p className="home-project-desc">Trading analytics dashboard for live stock, derivatives, and FX markets with real-time price updates and interactive charts.</p>
              <div className="home-project-tech">
                <span className="home-tech-tag">React</span>
                <span className="home-tech-tag">Spring Boot</span>
                <span className="home-tech-tag">Kafka</span>
              </div>
            </div>
          </div>

          <div className="home-project-card">
            <div className="home-project-image-wrapper">
              <img src="/image/project4.jpg" alt="Workflow Automation" className="home-project-image" />
            </div>
            <div className="home-project-content">
              <h3 className="home-project-title">Workflow Automation Portal</h3>
              <p className="home-project-desc">Automation platform enabling multi-step workflows with event-driven execution and visual workflow design using Spring Boot and MongoDB.</p>
              <div className="home-project-tech">
                <span className="home-tech-tag">Spring Boot</span>
                <span className="home-tech-tag">MongoDB</span>
                <span className="home-tech-tag">React</span>
              </div>
            </div>
          </div>
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
    </div>
  );
}
