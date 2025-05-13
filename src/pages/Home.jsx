import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* Custom Fixed Header */}
      <header className="cic-header-fixed">
        <div className="cic-header-left">
          <img src="/cic-logo.jpeg" alt="CIC GROUP" className="cic-logo-img" />
        </div>
        <div className="cic-header-center">
          <a href="/easyBima-FAQs.pdf" download className="cic-faq-link">FAQs</a>
        </div>
        <div className="cic-header-right">
          <Link to="/login" className="cic-login-link"><i className="fa-regular fa-user"></i> Login</Link>
          <span className="cic-header-divider">|</span>
          <Link to="/register" className="cic-register-link">Register</Link>
        </div>
      </header>

      <main className="cic-home-main">
        <div className="cic-welcome">Welcome to CIC Insurance Group</div>
        <h1 className="cic-main-heading">We keep our word</h1>
        <div className="cic-subtitle">Getting Insured with us is easy as 1-2-3</div>
        <div className="cic-steps">
          <div className="cic-step">
            <img src="/step1.png" alt="Fill in some details" className="cic-step-img" />
            <div className="cic-step-num">1</div>
            <div className="cic-step-title">Fill in some details</div>
            <div className="cic-step-desc">Fill in basic information about yourself and what you want to cover.</div>
          </div>
          <div className="cic-step">
            <img src="/step2.png" alt="Get a quotation" className="cic-step-img" />
            <div className="cic-step-num">2</div>
            <div className="cic-step-title">Get a quotation</div>
            <div className="cic-step-desc">Pick from different quotations the cover that is best for you.</div>
          </div>
          <div className="cic-step">
            <img src="/step3.png" alt="Buy & Get Covered" className="cic-step-img" />
            <div className="cic-step-num">3</div>
            <div className="cic-step-title">Buy & Get Covered</div>
            <div className="cic-step-desc">Buy the cover you like and enjoy the personal attention you deserve.</div>
          </div>
        </div>
        <button className="cic-start-btn" onClick={() => navigate('/quote')}>
          Let's start! <i className="fa-solid fa-arrow-right"></i>
        </button>
      </main>

      <footer className="cic-yellow-footer">
        <div className="cic-yellow-footer-content">
          <div>Let us guide you through your life's journey</div>
          <div className="cic-yellow-footer-contact">
            Call us directly on 0703 099 120 or Email us at callc@cic.co.ke.
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
