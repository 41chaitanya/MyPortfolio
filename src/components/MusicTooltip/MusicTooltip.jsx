import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MusicTooltip.css';

export default function MusicTooltip() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already seen the tooltip
    const hasSeenTooltip = localStorage.getItem('hasSeenMusicTooltip');
    
    if (hasSeenTooltip) {
      return; // Don't show if already seen
    }

    // Show tooltip after 4 seconds (after page loads)
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Hide tooltip after 4 more seconds (8 seconds total)
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('hasSeenMusicTooltip', 'true');
    }, 8000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="music-tooltip-fixed"
          initial={{ opacity: 0, scale: 0.8, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.8, x: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="music-tooltip-arrow-pointer"></div>
          <div className="music-tooltip-content">
            <span className="music-tooltip-emoji">🎵</span>
            <span className="music-tooltip-text">Vibe with music!</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
