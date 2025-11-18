import { TextRoll } from '../../components/TextRoll';
import './About.css';

export default function About() {
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
      date: '2025',
      description: 'Top 5 Position - Developed campus security platform with ML-powered entity resolution achieving 99.2% accuracy and predictive analytics with 94.3% location prediction accuracy.',
      image: '/image/event1.jpg'
    },
    {
      id: 2,
      title: 'Code Urja - Indore',
      date: '2025',
      description: '2nd Position - Built innovative solution leveraging Spring Boot microservices, real-time data processing with Kafka, and advanced analytics.',
      image: '/image/event2.jpg'
    },
    {
      id: 3,
      title: 'Arma Code - IISER Bhopal',
      date: '2025',
      description: '3rd Position - Developed full-stack application demonstrating expertise in MERN stack, backend optimization, and database design.',
      image: '/image/event3.jpg'
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
            impactful software solutions.
          </p>
          <p>
            My journey in tech has been driven by curiosity and a desire to solve real-world problems through code. 
            I believe in writing clean, maintainable code and following best practices in software development.
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
        <div className="events-grid">
          {events.map((event) => (
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
      </div>
    </div>
  );
}
