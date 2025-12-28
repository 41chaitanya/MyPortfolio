import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Loading.css';

export default function Loading({ onLoadComplete }) {
  const [countdown, setCountdown] = useState(3);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
      if (onLoadComplete) {
        onLoadComplete();
      }
    }
  }, [countdown, onLoadComplete]);

  const countdownVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 1.5,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="loading-container">
      <motion.div
        className="loading-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Logo/Title */}
        <motion.div variants={itemVariants} className="loading-title">
          <h1>Chaitanya Sharma</h1>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div variants={itemVariants} className="countdown-container">
          <motion.div
            key={countdown}
            className="countdown-number"
            variants={countdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {countdown}
          </motion.div>
        </motion.div>

        {/* Loading Text */}
        <motion.div variants={itemVariants} className="loading-text">
          <p>Loading Portfolio</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div variants={itemVariants} className="loading-progress">
          <div className="progress-bar">
            <motion.div
              className="progress-fill"
              animate={{ width: `${((3 - countdown) / 3) * 100}%` }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
            ></motion.div>
          </div>
          <p className="progress-text">{Math.round(((3 - countdown) / 3) * 100)}%</p>
        </motion.div>
      </motion.div>

      {/* Background Elements */}
      <div className="loading-bg-elements">
        <motion.div
          className="bg-element element-1"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        ></motion.div>
        <motion.div
          className="bg-element element-2"
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        ></motion.div>
      </div>
    </div>
  );
}
