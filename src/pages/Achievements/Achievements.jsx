import React, { useState } from 'react';
import HackathonDetailModal from '../../components/HackathonDetailModal';
import './Achievements.css';

export default function Achievements() {
  const [selectedHackathon, setSelectedHackathon] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHackathonClick = (hackathon) => {
    setSelectedHackathon(hackathon);
    setIsModalOpen(true);
  };

  const hackathons = [
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
    },
    {
      id: 3,
      image: '/image/iiserBhopal2.jpeg',
      title: 'Arma Code - IISER Bhopal',
      date: 'March 2025',
      description: '3rd Position - Developed full-stack application demonstrating expertise in MERN stack, backend optimization, and database design.',
      achievements: 'Secured 3rd position with a comprehensive full-stack solution. The project demonstrated strong technical skills across frontend, backend, and database optimization, earning recognition for its clean architecture and user experience.',
      gallery: [
        { src: '/image/iiserBhopal2.jpeg', caption: 'Arma Code Hackathon - IISER Bhopal' },
        { src: '/image/iiserBhopal2.jpeg', caption: 'Project Demo Session' },
        { src: '/image/iiserBhopal2.jpeg', caption: 'Winners Announcement' },
      ],
      teamMembers: [
        { name: 'Chaitanya Sharma', role: 'Full Stack Developer', image: '/image/myImage.jpg', linkedin: 'https://www.linkedin.com/in/chaitanya-sharma-799041301' },
        { name: 'Team Member 2', role: 'UI/UX Designer', image: '/image/myImage.jpg', linkedin: 'https://www.linkedin.com/in/' },
        { name: 'Team Member 3', role: 'Database Specialist', image: '/image/myImage.jpg', linkedin: 'https://www.linkedin.com/in/' },
      ]
    },
    {
      id: 4,
      image: '/image/manitIdeaThone.jpeg',
      title: 'IdeaThon - MANIT Bhopal',
      date: 'April 2025',
      description: 'Top 10 Position - Presented innovative idea for scalable backend architecture and microservices implementation.',
      achievements: 'Presented a groundbreaking idea for scalable backend architecture. The concept impressed the judges with its innovative approach to microservices and potential for real-world application.',
      gallery: [
        { src: '/image/manitIdeaThone.jpeg', caption: 'IdeaThon - MANIT Bhopal' },
        { src: '/image/manitIdeaThone.jpeg', caption: 'Pitch Presentation' },
        { src: '/image/manitIdeaThone.jpeg', caption: 'Finalist Announcement' },
      ],
      teamMembers: [
        { name: 'Chaitanya Sharma', role: 'Idea Lead', image: '/image/myImage.jpg', linkedin: 'https://www.linkedin.com/in/chaitanya-sharma-799041301' },
      ]
    },
    {
      id: 5,
      image: '/image/bansalIdeaThone.jpeg',
      title: 'Bansal Ideas Hackathon',
      date: 'May 2024',
      description: 'Top 10 Position - Developed innovative solution showcasing problem-solving skills and technical expertise in full-stack development.',
      achievements: 'Demonstrated exceptional problem-solving skills and technical expertise. The solution was recognized for its innovation and practical approach to solving real-world challenges.',
      gallery: [
        { src: '/image/bansalIdeaThone.jpeg', caption: 'Bansal Ideas Hackathon' },
        { src: '/image/bansalIdeaThone.jpeg', caption: 'Team Collaboration' },
        { src: '/image/bansalIdeaThone.jpeg', caption: 'Recognition Ceremony' },
      ],
      teamMembers: [
        { name: 'Chaitanya Sharma', role: 'Developer', image: '/image/myImage.jpg', linkedin: 'https://www.linkedin.com/in/chaitanya-sharma-799041301' },
      ]
    },
    {
      id: 6,
      image: '/image/IITG.jpeg',
      title: 'ACM Prayatan 2.0',
      date: 'June 2024',
      description: 'Participant - Competed in ACM-organized hackathon showcasing innovative solutions and technical skills in competitive programming and software development.',
      achievements: 'Participated in a prestigious ACM-organized hackathon, gaining valuable experience and networking with talented developers from across the country.',
      gallery: [
        { src: '/image/IITG.jpeg', caption: 'ACM Prayatan 2.0 Event' },
        { src: '/image/IITG.jpeg', caption: 'Coding Competition' },
        { src: '/image/IITG.jpeg', caption: 'Networking Session' },
      ],
      teamMembers: [
        { name: 'Chaitanya Sharma', role: 'Participant', image: '/image/myImage.jpg', linkedin: 'https://www.linkedin.com/in/chaitanya-sharma-799041301' },
      ]
    },
  ];

  return (
    <div className="page-container achievements-page">
      <div className="achievements-header">
        <h1 className="achievements-title">Hackathons & Events</h1>
        <p className="achievements-subtitle">Competitions and events I've participated in</p>
        <p style={{ fontSize: '1rem', marginTop: '20px', opacity: 0.8, lineHeight: 1.6 }}>
          I have participated in 15+ hackathons across various NITs and IITs, both online and offline. These competitions have been instrumental in shaping my problem-solving skills, technical expertise, and ability to work under pressure while delivering innovative solutions.
        </p>
      </div>

      <div className="achievements-grid">
        {hackathons.map((hackathon) => (
          <div 
            key={hackathon.id} 
            className="achievement-card"
            onClick={() => handleHackathonClick(hackathon)}
            style={{ cursor: 'pointer' }}
          >
            <div className="achievement-image-wrapper">
              <img 
                src={hackathon.image} 
                alt={hackathon.title}
                className="achievement-image"
              />
            </div>
            <div className="achievement-content">
              <h3 className="achievement-card-title">{hackathon.title}</h3>
              <p className="achievement-date">{hackathon.date}</p>
              <p className="achievement-description">{hackathon.description}</p>
            </div>
          </div>
        ))}
      </div>

      <HackathonDetailModal 
        isOpen={isModalOpen}
        hackathon={selectedHackathon}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
