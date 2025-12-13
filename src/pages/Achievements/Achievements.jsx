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
        demo: 'https://campus-security-system-six.vercel.app/login'
      }
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662013/portfolio-images/fwvdzfue7i0u2knt6in8.jpg',
      title: 'Code Urja - Indore',
      date: 'February 2025',
      description: '2nd Position - Django API Gateway: A self-deployed API Gateway managing, routing, and securing API requests efficiently as a single entry point for multiple backend services.',
      achievements: 'Achieved 2nd position by developing a comprehensive Django API Gateway with request routing, token-based authentication (JWT/OAuth2), rate limiting for fair resource allocation, logging & monitoring for analytics, caching for faster responses, and load balancing for efficient traffic distribution. The solution showcased excellent scalability and real-time processing capabilities, impressing the judges with its technical depth and practical implementation.',
      gallery: [
        { src: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662013/portfolio-images/fwvdzfue7i0u2knt6in8.jpg', caption: 'Code Urja Event - Indore' },
        { src: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662014/portfolio-images/t7p2h0pciltlgucvtr5q.jpg', caption: 'Team Up' },
        { src: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662014/portfolio-images/us2q8yrfhpkrbnucdpcb.jpg', caption: 'Prize Distribution - 2nd Position' },
      ],
      teamMembers: [
        { name: 'Chaitanya Sharma', role: 'Backend Developer (Django)', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662010/portfolio-images/bvjgyzlgfkeixlutr5ga.jpg', linkedin: 'https://www.linkedin.com/in/chaitanya-sharma-799041301' },
        { name: 'Khushi Kundwani', role: 'Backend Developer (Django)', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662011/portfolio-images/wq3j5zcs8h6p3ruukayv.jpg', linkedin: 'https://www.linkedin.com/in/khushi-kundwani/' },
        { name: 'Mitanshi Jain', role: 'Frontend Developer', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662011/portfolio-images/cmac0iqq4ou8mywrmi2f.jpg', linkedin: 'https://www.linkedin.com/in/mitanshi-jain555/' },
        { name: 'Dhruv Sharma', role: 'UI/UX Designer', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662078/portfolio-images/eho4pzjierpfh0t6ulol.png', linkedin: 'https://www.linkedin.com/in/dhruv-sharma-421a10352/' },
      ],
      projectLinks: {
        github: 'https://github.com/41chaitanya/CodeUrja1.0-team-Boyssss-self-deployed-api-gateway'
      }
    },
    {
      id: 4,
      image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662077/portfolio-images/e8ntoresgek81wzumz8j.jpg',
      title: 'Arma Code - IISER Bhopal',
      date: 'March 2025',
      description: '3rd Position - Developed full-stack application demonstrating expertise in MERN stack, backend optimization, and database design.',
      achievements: 'Secured 3rd position with a comprehensive full-stack solution. The project demonstrated strong technical skills across frontend, backend, and database optimization, earning recognition for its clean architecture and user experience.',
      gallery: [
        { src: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662013/portfolio-images/aq93lwtnaljrkizaqmdt.jpg', caption: 'Arma Code Assembled' },
        { src: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662015/portfolio-images/rdcfuctpivdz2tzyqitd.jpg', caption: 'Team Up' },
        { src: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662015/portfolio-images/y8ungvvxrbl6grnlohmq.jpg', caption: 'Working with Team' },
      ],
      teamMembers: [
        { name: 'Chaitanya Sharma', role: 'Full Stack Developer', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662010/portfolio-images/bvjgyzlgfkeixlutr5ga.jpg', linkedin: 'https://www.linkedin.com/in/chaitanya-sharma-799041301' },
        { name: 'Khushi Kundwani', role: 'Frontend Developer', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662011/portfolio-images/wq3j5zcs8h6p3ruukayv.jpg', linkedin: 'https://www.linkedin.com/in/khushi-kundwani/' },
        { name: 'Aditya Giri', role: 'Backend Developer', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662014/portfolio-images/ms8sxxzi011polvwfgqh.png', linkedin: 'https://www.linkedin.com/in/adityagiri14/' },
        { name: 'Aditya Mudliar', role: 'Database Specialist', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662011/portfolio-images/xjodlzuabbd8bxvyxxza.jpg', linkedin: 'https://www.linkedin.com/in/aditya-mudliar-08a767187/' },
      ],
      projectLinks: {
        github: 'https://github.com/41chaitanya/event-backend'
      }
    },
    {
      id: 5,
      image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662012/portfolio-images/nxmolpqn6lutse4k1squ.jpg',
      title: 'IdeaThon - MANIT Bhopal',
      date: 'April 2025',
      description: 'Top 12 Position - Made it to the top 12 out of 200 teams in the TechTrack case battle final at Maulana Azad National Institute of Technology Bhopal.',
      achievements: 'What an incredible experience making it to the top 12 out of 200 teams in the TechTrack case battle final! The competition showcased our team\'s dedication and hard work in presenting innovative solutions. Huge thanks to the organizers and my amazing teammates for their commitment. Let\'s keep pushing boundaries!',
      gallery: [
        { src: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662015/portfolio-images/wget0hqriisobk5fyr8b.jpg', caption: 'Assembled at MANIT' },
        { src: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662014/portfolio-images/s0i4opqs4za1cnky4hfw.jpg', caption: 'Presentation' },
        { src: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662014/portfolio-images/po09qxjqr8r1sxcibnna.jpg', caption: 'Certificate Distribution' },
      ],
      teamMembers: [
        { name: 'Chaitanya Sharma', role: 'Team Lead', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662010/portfolio-images/bvjgyzlgfkeixlutr5ga.jpg', linkedin: 'https://www.linkedin.com/in/chaitanya-sharma-799041301' },
        { name: 'Jagrati Agrawal', role: 'Team Member', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662012/portfolio-images/apgrny8pqyfwsu6ekurc.jpg', linkedin: 'https://www.linkedin.com/in/jagrati-agrawal-8b54ab2a5/' },
        { name: 'Aadarsh Dangi', role: 'Team Member', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662011/portfolio-images/ztrfs1qjhpf7ha6ram4d.jpg', linkedin: 'https://www.linkedin.com/in/aadarshdangi/' },
      ]
    },
    {
      id: 6,
      image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662077/portfolio-images/xpoxwuaoopyuwcplqwpt.jpg',
      title: 'Codictive Idea Hackathon - Bansal Group of Institutes',
      date: 'May 2024',
      description: 'Top 24 Position - Participated in the Codictive Idea Hackathon hosted by Bansal Group of Institutes and Sheryians Coding School. Finished Day 1 in the top 3 out of 80+ teams.',
      achievements: 'Out of 80+ teams, we were proud to finish Day 1 in the top 3 and make it to the final round as one of the top 24 teams. Day 2 didn\'t go as we hoped and we couldn\'t secure a final position, but sometimes the toughest losses are the ones that teach you the most. Big thanks to Harsh Vandana Sharma sir, Sarthak Sharma sir, and Ali Sir from Sheryians Coding School for their mentorship and insights throughout the event. Huge shoutout to my amazing team!',
      gallery: [
        { src: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662077/portfolio-images/xpoxwuaoopyuwcplqwpt.jpg', caption: 'Bansal Ideas Hackathon' },
        { src: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662013/portfolio-images/mlrkchqsj9wqjzbshq4s.jpg', caption: 'Presentation' },
        { src: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662014/portfolio-images/ut5fjc4iqtb9gqrjwf5q.jpg', caption: 'Flexing at IdeaThon' },
      ],
      teamMembers: [
        { name: 'Chaitanya Sharma', role: 'Developer', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662010/portfolio-images/bvjgyzlgfkeixlutr5ga.jpg', linkedin: 'https://www.linkedin.com/in/chaitanya-sharma-799041301' },
        { name: 'Aadarsh Dangi', role: 'Developer', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662011/portfolio-images/ztrfs1qjhpf7ha6ram4d.jpg', linkedin: 'https://www.linkedin.com/in/aadarshdangi/' },
        { name: 'Raina Rahangdale', role: 'Developer', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662010/portfolio-images/epc8qltryp6hzkh0rexg.jpg', linkedin: 'https://www.linkedin.com/in/raina-rahangdale-684954293/' },
        { name: 'Tanisha Jain', role: 'Developer', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662013/portfolio-images/myq32khpbldcrbce9weh.jpg', linkedin: 'https://www.linkedin.com/in/tanisha-jain-a2b578284/' },
        { name: 'Mahak Yadav', role: 'Developer', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662011/portfolio-images/fmt8p1sq78fusaldeqmc.jpg', linkedin: 'https://www.linkedin.com/in/mahak-yadav-590a59293/' },
      ]
    },
    {
      id: 7,
      image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662014/portfolio-images/ueommuhrpa8yqu0q16mg.jpg',
      title: 'Prayatna Hackathon - ACM',
      date: 'June 2024',
      description: 'Finalist - 36-hour national-level hackathon. Team Code Crew made it to the finals, competing against some of the most skilled and talented developers.',
      achievements: 'What an experience! This was a 36-hour national-level challenge and my first time making it to the finals—a huge milestone. Our team, Code Crew, gave it our all. Competing against some of the most skilled and talented developers pushed us beyond our limits. 36 hours of pure coding taught us resilience, teamwork, and where we need to improve. This hackathon showed us how far we\'ve come and how much further we have to go! Big thank you to Acropolis Group of Institutions and the AITR_ACM team for organizing such a well-managed event. Grateful for the learning and connections!',
      gallery: [
        { src: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662014/portfolio-images/ueommuhrpa8yqu0q16mg.jpg', caption: 'Opening Ceremony' },
        { src: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662014/portfolio-images/jpygaheuxkpmn5kz4xgb.jpg', caption: 'Presentation' },
        { src: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662014/portfolio-images/i0rsxym5n2hrfgstud8t.jpg', caption: 'Team Up' },
      ],
      teamMembers: [
        { name: 'Chaitanya Sharma', role: 'Participant', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662010/portfolio-images/bvjgyzlgfkeixlutr5ga.jpg', linkedin: 'https://www.linkedin.com/in/chaitanya-sharma-799041301' },
        { name: 'Aadarsh Dangi', role: 'Participant', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662011/portfolio-images/ztrfs1qjhpf7ha6ram4d.jpg', linkedin: 'https://www.linkedin.com/in/aadarshdangi/' },
        { name: 'Jagrati Agrawal', role: 'Participant', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662012/portfolio-images/apgrny8pqyfwsu6ekurc.jpg', linkedin: 'https://www.linkedin.com/in/jagrati-agrawal-8b54ab2a5/' },
        { name: 'Manav Khare', role: 'Participant', image: 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662010/portfolio-images/gcjgjbjblxq7w65xqsko.jpg', linkedin: 'https://www.linkedin.com/in/manavkhare121/' },
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
