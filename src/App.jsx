import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FlowerMenu from './components/FlowerMenu';
import MusicToggleButton from './components/MusicToggleButton';
import Loading from './pages/Loading';
import Home from './pages/Home';
import About from './pages/About';
import Achievements from './pages/Achievements';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineInfo, MdEmojiEvents, MdOutlineWorkspaces, MdOutlineMailOutline } from 'react-icons/md';
import './App.css';

function App() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Auto-hide loading after 8 seconds
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoading && (
        <Loading onLoadComplete={() => setShowLoading(false)} />
      )}
      
      {!showLoading && (
        <>
          <video autoPlay muted loop className="background-video">
            <source src="https://www.youtube.com/watch?v=aJOTlE1K90k&list=RDRgKAFK5djSk&index=5" type="video/mp4" />
          </video>
          <Router>
            <Navbar />
            <MusicToggleButton />
            <FlowerMenu
              menuItems={[
                { icon: AiOutlineHome, href: '/' },
                { icon: MdOutlineInfo, href: '/about' },
                { icon: MdEmojiEvents, href: '/achievements' },
                { icon: MdOutlineWorkspaces, href: '/projects' },
                { icon: MdOutlineMailOutline, href: '/contact' },
              ]}
              backgroundColor="rgba(39, 39, 42, 0.95)"
              iconColor="#fafafa"
              animationDuration={400}
              togglerSize={50}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
          </Router>
        </>
      )}
    </>
  );
}

export default App;
