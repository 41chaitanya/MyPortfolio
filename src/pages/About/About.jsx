import { useNavigate } from 'react-router-dom';
import { TextRoll } from '../../components/TextRoll';
import './About.css';

export default function About() {
  const navigate = useNavigate();
  const education = [
    {
      id: 1,
      level: 'Bachelor of Technology',
      field: 'Computer Science & Engineering',
      institution: 'OIST Bhopal',
      year: '2022 - 2026',
      description: 'Currently pursuing my degree with focus on software development, backend systems, and machine learning applications.'
    },
    {
      id: 2,
      level: 'Class 12th (Senior Secondary)',
      field: 'Science Stream',
      institution: 'Kendriya Vidyalaya ITBP, Shivpuri',
      year: '2022',
      description: 'Percentage: 84%'
    },
    {
      id: 3,
      level: 'Class 10th (Secondary School)',
      field: 'General',
      institution: 'Kendriya Vidyalaya ITBP, Shivpuri',
      year: '2020',
      description: 'Percentage: 87%'
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Ethos Hackathon - IIT Guwahati',
      date: 'January 2025',
      description: 'Top 5 Position - Campus Entity Resolution & Security Monitoring System with ML-powered entity resolution achieving 99.2% accuracy and predictive analytics with 94.3% location prediction accuracy.',
      image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662014/portfolio-images/yeivmtj2xeewts7nrjjk.jpg'
    },
    {
      id: 2,
      title: 'Code Urja - Indore',
      date: 'February 2025',
      description: '2nd Position - Django API Gateway: A self-deployed API Gateway managing, routing, and securing API requests efficiently as a single entry point for multiple backend services.',
      image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662013/portfolio-images/fwvdzfue7i0u2knt6in8.jpg'
    },
    {
      id: 3,
      title: 'Arma Code - IISER Bhopal',
      date: 'March 2025',
      description: '3rd Position - Developed full-stack application demonstrating expertise in MERN stack, backend optimization, and database design.',
      image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662077/portfolio-images/e8ntoresgek81wzumz8j.jpg'
    },
    {
      id: 4,
      title: 'IdeaThon - MANIT Bhopal',
      date: 'April 2025',
      description: 'Top 12 Position - Made it to the top 12 out of 200 teams in the TechTrack case battle final at Maulana Azad National Institute of Technology Bhopal.',
      image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662012/portfolio-images/nxmolpqn6lutse4k1squ.jpg'
    },
    {
      id: 5,
      title: 'Codictive Idea Hackathon - Bansal Group of Institutes',
      date: 'May 2024',
      description: 'Top 24 Position - Participated in the Codictive Idea Hackathon hosted by Bansal Group of Institutes and Sheryians Coding School. Finished Day 1 in the top 3 out of 80+ teams.',
      image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662077/portfolio-images/xpoxwuaoopyuwcplqwpt.jpg'
    },
    {
      id: 6,
      title: 'Prayatna Hackathon - ACM',
      date: 'June 2024',
      description: 'Finalist - 36-hour national-level hackathon. Team Code Crew made it to the finals, competing against some of the most skilled and talented developers.',
      image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662014/portfolio-images/ueommuhrpa8yqu0q16mg.jpg'
    }
  ];

  return (
    <div className="page-container about-page">
      <div className="about-intro">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
          <p style={{ fontSize: '1.8rem', margin: 0, fontWeight: 700 }}>Hi, I'm</p>
          <h1 className="about-greeting" style={{ display: 'flex', gap: '15px', alignItems: 'center', margin: 0, justifyContent: 'flex-start' }}>
            <TextRoll center>Chaitanya</TextRoll>
            <TextRoll center>Sharma</TextRoll>
          </h1>
        </div>
        
        <div className="about-bio" style={{ textAlign: 'left' }}>
          <p>
            I'm an aspiring Java Spring Boot developer passionate about building scalable backend systems and microservices. 
            With a strong foundation in computer science fundamentals, I'm dedicated to continuous learning and creating 
            impactful software solutions. I'm proud to be a <strong>Grand Finalist at Smart India Hackathon 2025</strong>, 
            representing my institute on a national stage with an AI-driven solution for train induction planning.
          </p>
          <p>
            My journey in tech has been driven by curiosity and a desire to solve real-world problems through code. 
            I believe in writing clean, maintainable code and following best practices in software development. With 15+ 
            hackathon participations across NITs and IITs, I've honed my problem-solving skills and learned the value of teamwork.
          </p>
        </div>
      </div>

      <div className="about-section">
        <h2 className="section-title">Education</h2>
        <div className="education-container">
          {education.map((edu) => (
            <div key={edu.id} className="education-card">
              <div className="education-header">
                <h3 className="education-level">{edu.level}</h3>
                <p className="education-year">{edu.year}</p>
              </div>
              <p className="education-field">{edu.field}</p>
              <p className="education-institution">{edu.institution}</p>
              <p className="education-description">{edu.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="about-section">
        <h2 className="section-title">Events & Hackathons</h2>
        <p style={{ fontSize: '1rem', marginBottom: '30px', opacity: 0.8, lineHeight: 1.6, textAlign: 'left' }}>
          I have actively participated in 15+ hackathons and events across various NITs and IITs, both online and offline. 
          These competitions have been instrumental in shaping my problem-solving skills, technical expertise, and ability 
          to work under pressure while delivering innovative solutions. Each event has been a learning experience, helping 
          me grow as a developer and team player.
        </p>
        <div className="events-grid">
          {events.slice(0, 2).map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-image-wrapper">
                <img src={event.image} alt={event.title} className="event-image" />
              </div>
              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-date">{event.date}</p>
                <p className="event-description">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button 
          className="see-all-hackathons-button" 
          onClick={() => navigate('/achievements')}
        >
          See All Hackathons
        </button>
      </div>
    </div>
  );
}
