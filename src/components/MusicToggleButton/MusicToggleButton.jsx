import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const MusicToggleButton = () => {
  const bars = 5;
  const audioRef = useRef(null);

  const musicTracks = [
    { id: 0, name: 'Track 1', file: '/audio/gta4themesong.mp3' },
    { id: 1, name: 'Track 2', file: '/audio/bgmiThemeSong.mp3' },
    { id: 2, name: 'Track 3', file: '/audio/GTASanAndThemeSong.mp3' },
    { id: 3, name: 'Track 4', file: '/audio/rdr2ThemeSong.mp3' },
  ];

  const getRandomHeights = () => {
    return Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2);
  };

  const [heights, setHeights] = useState(getRandomHeights());
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize audio element on first load
    if (!audioRef.current && !isInitialized) {
      const audioElement = new Audio();
      audioElement.src = musicTracks[currentTrackIndex].file;
      audioElement.loop = false;
      audioElement.volume = 0.05;
      
      audioElement.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        setAudioError('Audio file not found or cannot be played');
      });
      
      audioElement.addEventListener('canplay', () => {
        console.log('Audio can play');
        setAudioError(null);
      });

      audioElement.addEventListener('ended', () => {
        // Play next track
        const nextIndex = (currentTrackIndex + 1) % musicTracks.length;
        setCurrentTrackIndex(nextIndex);
      });

      audioRef.current = audioElement;
      setIsInitialized(true);
      
      // Try to auto-play music on page load
      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            localStorage.setItem('musicPlaying', 'true');
          })
          .catch(error => {
            console.log('Auto-play blocked by browser:', error);
            setIsPlaying(false);
            localStorage.setItem('musicPlaying', 'false');
          });
      }
    }
  }, [isInitialized]);

  useEffect(() => {
    // Update track when currentTrackIndex changes
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = musicTracks[currentTrackIndex].file;
      
      // If music is playing, play the new track
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.log('Play error:', error);
        });
      }
    }
  }, [currentTrackIndex]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      const waveformIntervalId = setInterval(() => {
        setHeights(getRandomHeights());
      }, 100);

      audioRef.current.play().catch(error => {
        console.log('Auto-play blocked by browser:', error);
        setAudioError('Auto-play blocked. Click to play music.');
        setIsPlaying(false);
      });

      return () => {
        clearInterval(waveformIntervalId);
      };
    } else {
      setHeights(Array(bars).fill(0.1));
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleClick = () => {
    // Toggle play/pause on main button click
    if (isPlaying) {
      // Stop music
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
      localStorage.setItem('musicPlaying', 'false');
    } else {
      // Start music
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.log('Play error:', error);
        });
      }
      setIsPlaying(true);
      localStorage.setItem('musicPlaying', 'true');
    }
  };

  // Enable auto-play after user interaction
  useEffect(() => {
    const handleUserInteraction = () => {
      if (audioRef.current && !isPlaying) {
        const shouldPlay = localStorage.getItem('musicPlaying') !== 'false';
        if (shouldPlay) {
          audioRef.current.play().catch(error => {
            console.log('Play error:', error);
          });
          setIsPlaying(true);
        }
      }
      // Remove listener after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [isPlaying]);

  const handlePlaylistToggle = () => {
    // Toggle playlist visibility
    setShowPlaylist(!showPlaylist);
  };

  const handleTrackSelect = (index) => {
    setCurrentTrackIndex(index);
    // Always play music when selecting a track
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.log('Play error:', error);
      });
      setIsPlaying(true);
    }
  };

  return (
    <>
      {audioError && (
        <div className="fixed top-8 left-24 text-xs text-red-400 bg-black/50 px-3 py-1 rounded z-50">
          {audioError}
        </div>
      )}
      <motion.div 
        className="fixed top-8 left-8 z-50 flex flex-col items-center gap-2"
        onHoverStart={() => setShowPlaylist(true)}
        onHoverEnd={() => setShowPlaylist(false)}
      >
        <motion.button
          onClick={handleClick}
          initial={{ padding: '14px 14px' }}
          whileHover={{ padding: '18px 22px' }}
          whileTap={{ padding: '18px 22px' }}
          transition={{ duration: 1, bounce: 0.6, type: 'spring' }}
          className="bg-zinc-900 hover:bg-zinc-800 cursor-pointer rounded-full p-2 transition-all duration-300 active:scale-95"
          aria-label="Toggle music"
        >
          <motion.div
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{
              opacity: 1,
              filter: 'blur(0px)',
            }}
            transition={{ type: 'spring', bounce: 0.35 }}
            className="flex h-[18px] w-full items-center gap-1 rounded-full"
          >
            {/* Waveform visualization */}
            {heights.map((height, index) => (
              <motion.div
                key={index}
                className="bg-white w-px rounded-full"
                initial={{ height: 1 }}
                animate={{
                  height: Math.max(4, height * 14),
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 10,
                }}
              />
            ))}
          </motion.div>
        </motion.button>

        <span className="text-xs text-white font-medium">🎵 Music</span>

        {/* Playlist with Radio Buttons - Positioned on Right - Shows on Hover */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-8 left-32 bg-zinc-900 border border-zinc-800 rounded-lg px-6 py-5 flex flex-col gap-4 min-w-max shadow-lg"
            >
              {musicTracks.map((track) => (
                <motion.div
                  key={track.id}
                  className="flex items-center gap-4 cursor-pointer group px-2 py-2 rounded hover:bg-zinc-800/50 transition-colors"
                  whileHover={{ x: 3 }}
                  onClick={() => handleTrackSelect(track.id)}
                >
                  {/* Custom Radio Button */}
                  <motion.div
                    className="relative w-4 h-4 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0"
                    whileHover={{ scale: 1.1 }}
                  >
                    {currentTrackIndex === track.id && (
                      <motion.div
                        layoutId="radio-indicator"
                        className="w-2 h-2 bg-white rounded-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                  
                  {/* Track Name - White Text */}
                  <span
                    className={`text-xs font-medium transition-colors ${
                      currentTrackIndex === track.id
                        ? 'text-white'
                        : 'text-gray-300 group-hover:text-white'
                    }`}
                  >
                    {track.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default MusicToggleButton;
