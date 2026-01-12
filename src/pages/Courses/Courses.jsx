import { useState } from 'react';
import { FaYoutube, FaPlay, FaClock, FaUsers, FaStar } from 'react-icons/fa';
import CourseDetailModal from '../../components/CourseDetailModal';
import './Courses.css';

const dummyCourses = [
  {
    id: 1,
    title: 'Spring Boot Masterclass - Zero to Hero',
    description: 'Complete Spring Boot course covering REST APIs, JPA, Security, and microservices architecture. Learn to build production-ready applications from scratch.',
    thumbnail: 'https://via.placeholder.com/400x225/1a1a1a/ff0000?text=Spring+Boot+Masterclass',
    duration: '12 hours',
    students: '2.5K',
    rating: 4.8,
    lessons: 45,
    youtubeLink: 'https://youtube.com/playlist?list=example1',
    topics: ['Spring Boot', 'REST API', 'JPA', 'Security', 'Microservices'],
    comments: [
      { name: 'Rahul Kumar', text: 'Best Spring Boot course on YouTube! Explained everything clearly.', avatar: '👨‍💻' },
      { name: 'Priya Singh', text: 'Finally understood microservices after this course. Thank you!', avatar: '👩‍💻' },
      { name: 'Amit Patel', text: 'Production-level code examples. Highly recommended!', avatar: '🧑‍💻' },
    ]
  },
  {
    id: 2,
    title: 'Java DSA Complete Course',
    description: 'Master Data Structures and Algorithms in Java. From arrays to graphs, covering all important concepts with problem-solving techniques.',
    thumbnail: 'https://via.placeholder.com/400x225/1a1a1a/ff0000?text=Java+DSA+Course',
    duration: '20 hours',
    students: '5K',
    rating: 4.9,
    lessons: 80,
    youtubeLink: 'https://youtube.com/playlist?list=example2',
    topics: ['Arrays', 'LinkedList', 'Trees', 'Graphs', 'Dynamic Programming'],
    comments: [
      { name: 'Vikram Sharma', text: 'Cracked my Amazon interview after this course!', avatar: '👨‍💻' },
      { name: 'Sneha Gupta', text: 'Best DSA explanations. Love the problem-solving approach.', avatar: '👩‍💻' },
      { name: 'Rohan Verma', text: 'Clear concepts with great examples. Must watch!', avatar: '🧑‍💻' },
    ]
  },
  {
    id: 3,
    title: 'MongoDB for Beginners',
    description: 'Learn MongoDB from scratch. Covers CRUD operations, aggregation, indexing, and integration with Node.js and Spring Boot.',
    thumbnail: 'https://via.placeholder.com/400x225/1a1a1a/ff0000?text=MongoDB+Course',
    duration: '8 hours',
    students: '1.8K',
    rating: 4.7,
    lessons: 32,
    youtubeLink: 'https://youtube.com/playlist?list=example3',
    topics: ['CRUD', 'Aggregation', 'Indexing', 'Node.js', 'Spring Boot'],
    comments: [
      { name: 'Karan Mehta', text: 'Perfect for beginners. Very well structured!', avatar: '👨‍💻' },
      { name: 'Ananya Roy', text: 'Finally understood aggregation pipelines. Great course!', avatar: '👩‍💻' },
    ]
  },
  {
    id: 4,
    title: 'Docker & Kubernetes Crash Course',
    description: 'Containerization and orchestration made easy. Learn Docker, Docker Compose, and Kubernetes for deploying microservices.',
    thumbnail: 'https://via.placeholder.com/400x225/1a1a1a/ff0000?text=Docker+Kubernetes',
    duration: '10 hours',
    students: '3.2K',
    rating: 4.8,
    lessons: 38,
    youtubeLink: 'https://youtube.com/playlist?list=example4',
    topics: ['Docker', 'Docker Compose', 'Kubernetes', 'Helm', 'CI/CD'],
    comments: [
      { name: 'Deepak Joshi', text: 'Deployed my first K8s cluster after this. Amazing!', avatar: '👨‍💻' },
      { name: 'Meera Nair', text: 'Best DevOps content for beginners. Keep it up!', avatar: '👩‍💻' },
      { name: 'Arjun Reddy', text: 'Clear explanations with real-world examples.', avatar: '🧑‍💻' },
    ]
  },
  {
    id: 5,
    title: 'React.js Complete Guide',
    description: 'Build modern web applications with React. Covers hooks, context, Redux, and building full-stack apps with backend integration.',
    thumbnail: 'https://via.placeholder.com/400x225/1a1a1a/ff0000?text=React+Complete+Guide',
    duration: '15 hours',
    students: '4.1K',
    rating: 4.9,
    lessons: 55,
    youtubeLink: 'https://youtube.com/playlist?list=example5',
    topics: ['React Hooks', 'Context API', 'Redux', 'REST Integration', 'Deployment'],
    comments: [
      { name: 'Sanjay Kumar', text: 'Built my portfolio after this course. Thank you!', avatar: '👨‍💻' },
      { name: 'Pooja Sharma', text: 'Best React course in Hindi. Very detailed!', avatar: '👩‍💻' },
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
          <div className="courses-title-wrapper">
            <FaYoutube className="youtube-icon" />
            <h1 className="courses-title">My Courses</h1>
          </div>
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
              <div className="course-thumbnail-wrapper">
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  className="course-thumbnail"
                />
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
