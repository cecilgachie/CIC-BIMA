import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src="/logo.svg" alt="EasyBima" />
          </Link>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}></span>
        </button>

        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/quote" className="nav-link">Get a Quote</Link>
          <Link to="/faqs" className="nav-link">FAQs</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/login" className="nav-link login-btn">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
