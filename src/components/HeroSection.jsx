import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeroSection.css';

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Buy CIC Insurance Online</h1>
        <p>Simple, fast and affordable. Get covered in minutes from anywhere.</p>
        <Link to="/quote" className="hero-btn">Get a Quote</Link>
      </div>
    </section>
  );
}

export default HeroSection;
