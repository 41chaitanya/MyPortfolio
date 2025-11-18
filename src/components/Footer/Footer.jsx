import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Contact Information */}
        <div className="footer-section">
          <h3 className="footer-section-title">Contact</h3>
          <div className="contact-info">
            <a href="mailto:chaitanya4141sharma@gmail.com" className="contact-link">
              <MdEmail className="contact-icon" />
              <span>chaitanya4141sharma@gmail.com</span>
            </a>
            <a href="tel:+919165926808" className="contact-link">
              <MdPhone className="contact-icon" />
              <span>+91 91659 26808</span>
            </a>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="footer-section">
          <h3 className="footer-section-title">Follow Me</h3>
          <div className="social-links">
            <a
              href="https://www.linkedin.com/in/chaitanya-sharma-799041301"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/41chaitanya"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              title="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-section-title">Quick Links</h3>
          <div className="quick-links">
            <a href="/" className="quick-link">Home</a>
            <a href="/about" className="quick-link">About</a>
            <a href="/projects" className="quick-link">Projects</a>
            <a href="/contact" className="quick-link">Contact</a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p className="copyright">
          &copy; {currentYear} Chaitanya Sharma. All rights reserved.
        </p>
        <p className="footer-tagline">
          Built with passion | Designed for excellence
        </p>
      </div>
    </footer>
  );
}
