import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlay, FaPause, FaStepForward, FaStepBackward, 
  FaSearch, FaTimes, FaVolumeUp, FaVolumeMute
} from 'react-icons/fa';
import './MusicPlayer.css';

// Local tracks as fallback
const LOCAL_TRACKS = [
  { id: 1, name: 'GTA 4 Theme', artist: 'Michael Hunter', file: '/audio/gta4themesong.mp3' },
  { id: 2, name: 'BGMI Theme', artist: 'PUBG Mobile', file: '/audio/bgmiThemeSong.mp3' },
  { id: 3, name: 'GTA San Andreas Theme', artist: 'Young Maylay', file: '/audio/GTASanAndThemeSong.mp3' },
  { id: 4, name: 'RDR2 Theme', artist: 'Woody Jackson', file: '/audio/rdr2ThemeSong.mp3' },
  { id: 5, name: 'The Boys BGM', artist: 'The Boys', file: '/audio/the boys bgm.mp3', isTheBoys: true },
];

// JioSaavn API endpoints
const API_ENDPOINTS = [
  'https://saavn.dev/api',
  'https://jiosaavn-api-ts.vercel.app',
  'https://jiosaavn-api.vercel.app'
];

// The Boys BGM track index
const THE_BOYS_TRACK_INDEX = 4;

export default function MusicPlayer() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState(LOCAL_TRACKS.map(t => ({
    id: t.id,
    name: t.name,
    artist: t.artist,
    url: t.file,
    image: null,
    isLocal: true,
    isTheBoys: t.isTheBoys || false
  })));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeTab, setActiveTab] = useState('local');
  const [apiError, setApiError] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [theBoysModeActive, setTheBoysModeActive] = useState(false);
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
  
  // Waveform animation
  const bars = 5;
  const [heights, setHeights] = useState(Array(bars).fill(0.1));
  
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  // Waveform animation when playing
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setHeights(Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setHeights(Array(bars).fill(0.1));
    }
  }, [isPlaying]);

  // Auto-play The Boys BGM when on The Boys community page
  useEffect(() => {
    const isTheBoysCommunity = location.pathname === '/community/com.the-boys-dev';
    
    if (isTheBoysCommunity && !hasAutoPlayed) {
      // Small delay to ensure preloader has finished
      const timer = setTimeout(() => {
        const theBoysBGM = playlist[THE_BOYS_TRACK_INDEX];
        if (theBoysBGM) {
          setCurrentTrack(theBoysBGM);
          setCurrentIndex(THE_BOYS_TRACK_INDEX);
          setVolume(0.3); // 30% volume for The Boys BGM
          setTheBoysModeActive(true);
          setIsPlaying(true);
          setHasAutoPlayed(true);
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }
    
    // When leaving The Boys community page
    if (!isTheBoysCommunity && theBoysModeActive) {
      setTheBoysModeActive(false);
    }
  }, [location.pathname, hasAutoPlayed, playlist, theBoysModeActive]);

  // Search songs from JioSaavn
  const searchSongs = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    setApiError(false);
    
    for (const apiUrl of API_ENDPOINTS) {
      try {
        console.log('Trying API:', apiUrl);
        const response = await fetch(`${apiUrl}/search/songs?query=${encodeURIComponent(query)}&limit=15`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        });
        
        if (!response.ok) continue;
        
        const data = await response.json();
        console.log('Search response:', data);
        
        let results = [];
        if (data.success && data.data?.results) {
          results = data.data.results;
        } else if (data.results) {
          results = data.results;
        }
        
        if (results.length > 0) {
          setSearchResults(results);
          setIsSearching(false);
          return;
        }
      } catch (error) {
        console.log('API error:', apiUrl, error.message);
      }
    }
    
    setApiError(true);
    setSearchResults([]);
    setIsSearching(false);
  };

  // Handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchSongs(searchQuery);
    }
  };

  // Play a JioSaavn song
  const playJioSaavnSong = async (song) => {
    try {
      console.log('Playing JioSaavn song:', song);
      
      for (const apiUrl of API_ENDPOINTS) {
        try {
          const response = await fetch(`${apiUrl}/songs/${song.id}`);
          if (!response.ok) continue;
          
          const data = await response.json();
          console.log('Song details:', data);
          
          let songData = data.success && data.data?.[0] ? data.data[0] : (data[0] || data);
          
          if (songData) {
            let downloadUrl = null;
            
            if (songData.downloadUrl) {
              if (Array.isArray(songData.downloadUrl)) {
                downloadUrl = songData.downloadUrl.find(d => d.quality === '320kbps')?.url 
                  || songData.downloadUrl.find(d => d.quality === '160kbps')?.url
                  || songData.downloadUrl[0]?.url;
              } else {
                downloadUrl = songData.downloadUrl;
              }
            }
            
            if (!downloadUrl) {
              downloadUrl = songData.media_url || songData.url;
            }
            
            if (downloadUrl) {
              const track = {
                id: songData.id,
                name: songData.name || songData.song || song.name,
                artist: getArtistName(songData),
                image: getImageUrl(songData),
                url: downloadUrl,
                isLocal: false
              };
              
              setCurrentTrack(track);
              
              if (!playlist.find(s => s.id === track.id)) {
                setPlaylist(prev => [...prev, track]);
                setCurrentIndex(playlist.length);
              } else {
                setCurrentIndex(playlist.findIndex(s => s.id === track.id));
              }
              
              setIsPlaying(true);
              return;
            }
          }
        } catch (error) {
          console.log('Song fetch error:', error);
        }
      }
      
      alert('Unable to play this song. API might be unavailable.');
    } catch (error) {
      console.error('Error playing song:', error);
    }
  };

  // Play local track
  const playLocalTrack = (track) => {
    setCurrentTrack(track);
    setCurrentIndex(playlist.findIndex(s => s.id === track.id));
    setIsPlaying(true);
  };

  // Audio controls
  useEffect(() => {
    if (audioRef.current && currentTrack?.url) {
      audioRef.current.src = currentTrack.url;
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current.play().catch(e => console.log('Autoplay blocked:', e));
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Play error:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    if (audioRef.current && !isNaN(newTime)) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  const playNext = () => {
    if (playlist.length > 0) {
      const nextIndex = (currentIndex + 1) % playlist.length;
      setCurrentIndex(nextIndex);
      setCurrentTrack(playlist[nextIndex]);
      setIsPlaying(true);
    }
  };

  const playPrevious = () => {
    if (playlist.length > 0) {
      const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentTrack(playlist[prevIndex]);
      setIsPlaying(true);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getImageUrl = (song) => {
    if (!song) return null;
    if (song.image) {
      if (Array.isArray(song.image)) {
        return song.image[2]?.url || song.image[1]?.url || song.image[0]?.url;
      }
      return song.image;
    }
    return song.image_url || null;
  };

  const getArtistName = (song) => {
    if (!song) return 'Unknown Artist';
    if (song.artists?.primary) return song.artists.primary.map(a => a.name).join(', ');
    if (song.primaryArtists) return song.primaryArtists;
    if (song.singers) return song.singers;
    return song.artist || 'Unknown Artist';
  };

  const getSongName = (song) => song?.name || song?.song || song?.title || 'Unknown Song';

  return (
    <>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={playNext} />
      
      {/* Waveform Music Button */}
      <motion.div className="music-toggle-container">
        <motion.button
          onClick={() => {
            // If music is playing, toggle play/pause
            if (currentTrack) {
              setIsPlaying(!isPlaying);
            } else {
              // If no track, open the modal
              setIsOpen(true);
            }
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setIsOpen(true); // Right-click opens modal
          }}
          onDoubleClick={() => setIsOpen(true)} // Double-click opens modal
          initial={{ padding: '14px 14px' }}
          whileHover={{ padding: '18px 22px' }}
          whileTap={{ padding: '18px 22px' }}
          transition={{ duration: 1, bounce: 0.6, type: 'spring' }}
          className="music-waveform-btn"
          title={currentTrack ? (isPlaying ? 'Click to pause' : 'Click to play') : 'Click to open music player'}
        >
          <motion.div className="waveform-bars">
            {heights.map((height, index) => (
              <motion.div
                key={index}
                className="waveform-bar"
                animate={{ height: Math.max(4, height * 14) }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              />
            ))}
          </motion.div>
        </motion.button>
        <span className="music-label" onClick={() => setIsOpen(true)}>🎵 Music</span>
      </motion.div>

      {/* Music Player Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="music-player-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="music-player-modal"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-player" onClick={() => setIsOpen(false)}>
                <FaTimes />
              </button>

              {/* Search Section */}
              <form onSubmit={handleSearch} className="search-section">
                <div className="search-input-wrapper">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search Bollywood songs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                  {searchQuery && (
                    <button type="button" className="clear-search" onClick={() => { setSearchQuery(''); setSearchResults([]); }}>
                      <FaTimes />
                    </button>
                  )}
                </div>
                <button type="submit" className="search-btn">Search</button>
              </form>

              {/* Tabs */}
              {!searchQuery && (
                <div className="tabs">
                  <button className={`tab ${activeTab === 'local' ? 'active' : ''}`} onClick={() => setActiveTab('local')}>
                    🎮 Game Themes
                  </button>
                  <button className={`tab ${activeTab === 'queue' ? 'active' : ''}`} onClick={() => setActiveTab('queue')}>
                    📝 Queue ({playlist.length})
                  </button>
                </div>
              )}

              {/* Songs List */}
              <div className="songs-list">
                {isSearching ? (
                  <div className="loading-songs">Searching JioSaavn...</div>
                ) : searchQuery && searchResults.length > 0 ? (
                  searchResults.map((song) => (
                    <div 
                      key={song.id} 
                      className={`song-item ${currentTrack?.id === song.id ? 'active' : ''}`}
                      onClick={() => playJioSaavnSong(song)}
                    >
                      <img src={getImageUrl(song) || '/image/dummy_project_image.webp'} alt={getSongName(song)} className="song-thumb" />
                      <div className="song-info">
                        <span className="song-name">{getSongName(song)}</span>
                        <span className="song-artist">{getArtistName(song)}</span>
                      </div>
                      {currentTrack?.id === song.id && isPlaying && (
                        <div className="now-playing-bars"><span></span><span></span><span></span></div>
                      )}
                    </div>
                  ))
                ) : searchQuery && apiError ? (
                  <div className="api-error">
                    <p>⚠️ JioSaavn API is currently unavailable.</p>
                    <p>Try again later or enjoy the local tracks!</p>
                  </div>
                ) : searchQuery ? (
                  <div className="no-results">No songs found. Try a different search.</div>
                ) : activeTab === 'queue' ? (
                  playlist.map((track, index) => (
                    <div 
                      key={`${track.id}-${index}`} 
                      className={`song-item ${currentIndex === index ? 'active' : ''}`}
                      onClick={() => { setCurrentIndex(index); setCurrentTrack(track); setIsPlaying(true); }}
                    >
                      {track.image ? (
                        <img src={track.image} alt={track.name} className="song-thumb" />
                      ) : (
                        <div className="song-thumb-placeholder">🎵</div>
                      )}
                      <div className="song-info">
                        <span className="song-name">{track.name}</span>
                        <span className="song-artist">{track.artist}</span>
                      </div>
                      {currentIndex === index && isPlaying && (
                        <div className="now-playing-bars"><span></span><span></span><span></span></div>
                      )}
                    </div>
                  ))
                ) : (
                  // Local tracks
                  LOCAL_TRACKS.map((track, index) => (
                    <div 
                      key={track.id} 
                      className={`song-item ${currentTrack?.id === track.id ? 'active' : ''}`}
                      onClick={() => playLocalTrack(playlist[index])}
                    >
                      <div className="song-thumb-placeholder">🎮</div>
                      <div className="song-info">
                        <span className="song-name">{track.name}</span>
                        <span className="song-artist">{track.artist}</span>
                      </div>
                      {currentTrack?.id === track.id && isPlaying && (
                        <div className="now-playing-bars"><span></span><span></span><span></span></div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Now Playing Section */}
              {currentTrack && (
                <div className="now-playing-section">
                  <div className="now-playing-info">
                    {currentTrack.image ? (
                      <img src={currentTrack.image} alt={currentTrack.name} className="now-playing-image" />
                    ) : (
                      <div className="now-playing-image-placeholder">🎵</div>
                    )}
                    <div className="now-playing-details">
                      <span className="now-playing-name">{currentTrack.name}</span>
                      <span className="now-playing-artist">{currentTrack.artist}</span>
                    </div>
                  </div>

                  <div className="progress-section">
                    <span className="time-display">{formatTime(progress)}</span>
                    <div className="progress-bar" ref={progressRef} onClick={handleSeek}>
                      <div className="progress-fill" style={{ width: `${(progress / duration) * 100 || 0}%` }} />
                    </div>
                    <span className="time-display">{formatTime(duration)}</span>
                  </div>

                  <div className="player-controls">
                    <button className="control-btn" onClick={playPrevious}><FaStepBackward /></button>
                    <button className="control-btn play-btn" onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <FaPause /> : <FaPlay />}
                    </button>
                    <button className="control-btn" onClick={playNext}><FaStepForward /></button>
                    <button className="control-btn volume-btn" onClick={() => setIsMuted(!isMuted)}>
                      {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="volume-slider"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
