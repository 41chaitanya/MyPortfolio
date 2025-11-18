import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { MdOutlineInfo } from 'react-icons/md';
import { MdEmojiEvents } from 'react-icons/md';
import { MdOutlineWorkspaces } from 'react-icons/md';
import { MdOutlineMailOutline } from 'react-icons/md';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: AiOutlineHome, label: 'Home' },
    { path: '/about', icon: MdOutlineInfo, label: 'About' },
    { path: '/achievements', icon: MdEmojiEvents, label: 'Hackathons' },
    { path: '/projects', icon: MdOutlineWorkspaces, label: 'Projects' },
    { path: '/contact', icon: MdOutlineMailOutline, label: 'Contact' },
  ];

  return (
    <nav className="navbar">
      <ul className="nav-links">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon className="nav-icon" />
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
