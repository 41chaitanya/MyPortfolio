import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiUserGroup } from 'react-icons/hi';
import './CommunityButton.css';

export default function CommunityButton() {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="community-button-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
    >
      <motion.button
        className="community-floating-button"
        onClick={() => navigate('/community')}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        title="All Communities"
      >
        <HiUserGroup className="community-button-icon" />
      </motion.button>
    </motion.div>
  );
}
