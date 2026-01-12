import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaYoutube, FaPlay, FaClock, FaUsers, FaStar, FaBookOpen, FaQuoteLeft } from 'react-icons/fa';
import './CourseDetailModal.css';

export default function CourseDetailModal({ isOpen, course, onClose }) {
  if (!course) return null;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="course-modal-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          <motion.div
            className="course-modal-container"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <div className="course-modal-content">
              {/* Close Button */}
              <button className="course-modal-close" onClick={onClose}>
                <FaTimes size={24} />
              </button>

              {/* Header with Thumbnail */}
              <div className="course-modal-header">
                <div className="course-modal-thumbnail-wrapper">
                  <img 
                    src={course.thumbnail} 
                    alt={course.title}
                    className="course-modal-thumbnail"
                  />
                  <div className="course-modal-play-overlay">
                    <FaPlay className="modal-play-icon" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="course-modal-title-section">
                <h1 className="course-modal-title">{course.title}</h1>
                <div className="course-modal-stats">
                  <span className="modal-stat">
                    <FaClock /> {course.duration}
                  </span>
                  <span className="modal-stat">
                    <FaUsers /> {course.students} students
                  </span>
                  <span className="modal-stat">
                    <FaStar className="star-gold" /> {course.rating}
                  </span>
                  <span className="modal-stat">
                    <FaBookOpen /> {course.lessons} lessons
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="course-modal-section">
                <h2 className="section-title">About This Course</h2>
                <p className="course-modal-description">{course.description}</p>
              </div>

              {/* Topics */}
              <div className="course-modal-section">
                <h2 className="section-title">What You'll Learn</h2>
                <div className="course-modal-topics">
                  {course.topics.map((topic, index) => (
                    <span key={index} className="modal-topic-tag">{topic}</span>
                  ))}
                </div>
              </div>

              {/* Student Reviews */}
              {course.comments && course.comments.length > 0 && (
                <div className="course-modal-section">
                  <h2 className="section-title">Student Reviews</h2>
                  <div className="course-modal-comments">
                    {course.comments.map((comment, index) => (
                      <div key={index} className="comment-card">
                        <FaQuoteLeft className="quote-icon" />
                        <p className="comment-text">{comment.text}</p>
                        <div className="comment-author">
                          <span className="author-avatar">{comment.avatar}</span>
                          <span className="author-name">{comment.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* YouTube Link Button */}
              <div className="course-modal-cta">
                <a 
                  href={course.youtubeLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="youtube-cta-button"
                >
                  <FaYoutube className="yt-icon" />
                  Watch on YouTube
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
