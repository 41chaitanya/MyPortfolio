import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FlowerMenu from './components/FlowerMenu';
import MusicPlayer from './components/MusicPlayer';
import ScrollToTop from './components/ScrollToTop';
import CustomCursor from './components/CustomCursor';
import Loading from './pages/Loading';
import Home from './pages/Home';
import About from './pages/About';
import Achievements from './pages/Achievements';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Community from './pages/Community';
import CommunityDetail from './pages/CommunityDetail';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineInfo, MdEmojiEvents, MdOutlineWorkspaces, MdOutlineMailOutline } from 'react-icons/md';
import { HiUserGroup } from 'react-icons/hi';
import './App.css';
import './mobile-optimizations.css';

// Wrapper component to conditionally render Footer
function ConditionalFooter() {
  const location = useLocation();
  const isCommunityDetailPage = location.pathname.startsWith('/community/');
  
  if (isCommunityDetailPage) {
    return null;
  }
  return <Footer />;
}

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
            <ScrollToTop />
            <CustomCursor />
            <Navbar />
            <MusicPlayer />
            <FlowerMenu
              menuItems={[
                { icon: AiOutlineHome, href: '/' },
                { icon: MdOutlineInfo, href: '/about' },
                { icon: MdEmojiEvents, href: '/achievements' },
                { icon: MdOutlineWorkspaces, href: '/projects' },
                { icon: HiUserGroup, href: '/community' },
                { icon: MdOutlineMailOutline, href: '/contact' },
              ]}
              backgroundColor="rgba(39, 39, 42, 0.95)"
              iconColor="#fafafa"
              animationDuration={350}
              togglerSize={54}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/community" element={<Community />} />
              <Route path="/community/:slug" element={<CommunityDetail />} />
            </Routes>
            <Footer />
          </Router>
        </>
      )}
    </>
  );
}

export default App;
