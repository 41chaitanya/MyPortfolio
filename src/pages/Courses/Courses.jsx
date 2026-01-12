import { useState } from 'react';
import { FaPlay, FaClock, FaUsers, FaStar } from 'react-icons/fa';
import CourseDetailModal from '../../components/CourseDetailModal';
import './Courses.css';

const PROFILE_IMAGE = 'https://res.cloudinary.com/dtpstgz1j/image/upload/v1765662010/portfolio-images/bvjgyzlgfkeixlutr5ga.jpg';

const dummyCourses = [
  {
    id: 1,
    title: 'Computer Networks',
    description: 'Complete Computer Networks course covering OSI model, TCP/IP, routing protocols, network security, and practical networking concepts for students and professionals.',
    duration: '15+ hours',
    students: '1K+',
    rating: 4.8,
    lessons: 50,
    youtubeLink: 'https://www.youtube.com/playlist?list=PLg2LVpcRrOF5bXFuXpCKrKjIufHfikLAk',
    topics: ['OSI Model', 'TCP/IP', 'Routing', 'Network Security', 'Protocols'],
    comments: [
      { name: 'Rahul Kumar', text: 'Best CN course in Hindi! Cleared all my concepts.', avatar: '👨‍💻' },
      { name: 'Priya Singh', text: 'Very detailed explanations. Helped in my semester exams!', avatar: '👩‍💻' },
      { name: 'Amit Patel', text: 'Finally understood networking after this course.', avatar: '🧑‍💻' },
    ]
  },
  {
    id: 2,
    title: 'Operating System - Diploma',
    description: 'Operating System course designed for Diploma students. Covers process management, memory management, file systems, and OS fundamentals with easy explanations.',
    duration: '12+ hours',
    students: '800+',
    rating: 4.9,
    lessons: 40,
    youtubeLink: 'https://www.youtube.com/playlist?list=PLg2LVpcRrOF62wFOBJmKYK-RUhcALqrck',
    topics: ['Process Management', 'Memory Management', 'File Systems', 'Scheduling', 'Deadlocks'],
    comments: [
      { name: 'Vikram Sharma', text: 'Perfect for diploma students. Simple language!', avatar: '👨‍💻' },
      { name: 'Sneha Gupta', text: 'Scored 90+ in OS after watching this playlist.', avatar: '👩‍💻' },
    ]
  },
  {
    id: 3,
    title: 'Operating System - RGPV',
    description: 'Complete Operating System course as per RGPV University syllabus. Covers all units with previous year questions and exam-oriented preparation.',
    duration: '18+ hours',
    students: '1.5K+',
    rating: 4.8,
    lessons: 60,
    youtubeLink: 'https://www.youtube.com/playlist?list=PLg2LVpcRrOF7KfGcbEU9q-540YZJuGewN',
    topics: ['RGPV Syllabus', 'Process Sync', 'Virtual Memory', 'Disk Scheduling', 'PYQs'],
    comments: [
      { name: 'Karan Mehta', text: 'Exactly as per RGPV syllabus. Very helpful!', avatar: '👨‍💻' },
      { name: 'Ananya Roy', text: 'PYQ solutions were very useful. Thank you!', avatar: '👩‍💻' },
      { name: 'Rohan Verma', text: 'Best OS course for RGPV students.', avatar: '🧑‍💻' },
    ]
  },
  {
    id: 4,
    title: 'C Programming',
    description: 'Learn C programming from scratch. Covers basics to advanced concepts including pointers, structures, file handling, and data structures in C.',
    duration: '20+ hours',
    students: '2K+',
    rating: 4.9,
    lessons: 70,
    youtubeLink: 'https://www.youtube.com/playlist?list=PLg2LVpcRrOF5o-OlUaSBST7-txwuCbZr9',
    topics: ['Basics', 'Pointers', 'Structures', 'File Handling', 'DSA in C'],
    comments: [
      { name: 'Deepak Joshi', text: 'Started from zero, now I can code confidently!', avatar: '👨‍💻' },
      { name: 'Meera Nair', text: 'Pointers finally make sense. Great teaching!', avatar: '👩‍💻' },
      { name: 'Arjun Reddy', text: 'Best C programming course on YouTube.', avatar: '🧑‍💻' },
    ]
  },
  {
    id: 5,
    title: 'Computer Architecture',
    description: 'Complete Computer Architecture course covering CPU design, instruction sets, pipelining, memory hierarchy, and computer organization concepts.',
    duration: '14+ hours',
    students: '900+',
    rating: 4.7,
    lessons: 45,
    youtubeLink: 'https://www.youtube.com/playlist?list=PLg2LVpcRrOF5O-XwDZMW_iMpUg_ft0Syp',
    topics: ['CPU Design', 'Instruction Sets', 'Pipelining', 'Cache Memory', 'RISC vs CISC'],
    comments: [
      { name: 'Sanjay Kumar', text: 'Complex topics explained simply. Loved it!', avatar: '👨‍💻' },
      { name: 'Pooja Sharma', text: 'Pipelining concepts are crystal clear now.', avatar: '👩‍💻' },
    ]
  }
];

export default function Courses() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  return (
    <div className="page-container courses-page">
      <div className="courses-container">
        <div className="courses-header">
          <h1 className="courses-title">My Courses</h1>
          <p className="courses-subtitle">
            Free tutorials and courses I've created to help developers learn and grow
          </p>
        </div>

        <div className="courses-grid">
          {dummyCourses.map((course) => (
            <div 
              key={course.id} 
              className="course-card"
              onClick={() => handleCourseClick(course)}
            >
              <div className="course-cover">
                <img 
                  src={PROFILE_IMAGE} 
                  alt="Chaitanya Sharma" 
                  className="course-cover-image"
                />
                <h2 className="course-cover-title">{course.title}</h2>
                <div className="course-play-overlay">
                  <FaPlay className="play-icon" />
                </div>
                <span className="course-duration">
                  <FaClock /> {course.duration}
                </span>
              </div>
              <div className="course-content">
                <h3 className="course-title">{course.title}</h3>
                <p className="course-description">{course.description}</p>
                <div className="course-stats">
                  <span className="stat-item">
                    <FaUsers /> {course.students} students
                  </span>
                  <span className="stat-item">
                    <FaStar className="star-icon" /> {course.rating}
                  </span>
                  <span className="stat-item">
                    {course.lessons} lessons
                  </span>
                </div>
                <div className="course-topics">
                  {course.topics.slice(0, 3).map((topic, index) => (
                    <span key={index} className="topic-tag">{topic}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CourseDetailModal 
        isOpen={isModalOpen}
        course={selectedCourse}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
