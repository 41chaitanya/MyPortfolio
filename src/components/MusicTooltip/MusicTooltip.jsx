import { useState, useEffect } from 'react';
import './MusicTooltip.css';

export default function MusicTooltip() {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Show tooltip after a short delay (to ensure page is loaded)
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Hide tooltip after 5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div 
      className="music-tooltip"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="music-tooltip-arrow"></div>
      <div className="music-tooltip-content">
        <span className="music-tooltip-text">Play music track to vibe! 🎵</span>
      </div>
    </div>
  );
}
