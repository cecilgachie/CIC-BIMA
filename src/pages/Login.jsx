import React, { useState, useEffect } from 'react';
import '../styles/Login.css';
import { Link, useLocation } from 'react-router-dom';

export default function Login() {
  const [userType, setUserType] = useState('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    // Check if there's a message in the location state (from redirect)
    if (location.state && location.state.message) {
      setSuccessMessage(location.state.message);
      
      // Clear the message after 5 seconds
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="login-root">
      <div className="login-left" />
      <div className="login-right">
        <form className="login-form">
          {successMessage && (
            <div className="login-success-message">
              {successMessage}
            </div>
          )}
          <img src="/logo.svg" alt="CIC GROUP" className="login-logo" />
          <div className="login-title">Sign in to CIC EasyBima</div>
          <div className="login-subtitle">Getting Insured with us is easy as 1-2-3</div>
          <div className="login-radio-row">
            <span className="login-radio-label">I am</span>
            <label>
              <input
                type="radio"
                name="userType"
                value="customer"
                checked={userType === 'customer'}
                onChange={() => setUserType('customer')}
              />
              <span className="login-radio-custom customer" />
              A Customer
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="intermediary"
                checked={userType === 'intermediary'}
                onChange={() => setUserType('intermediary')}
              />
              <span className="login-radio-custom intermediary" />
              An Intermediary
            </label>
          </div>
          <div className="login-form-group">
            <label>{userType === 'intermediary' ? 'KRA PIN' : 'ID/Passport Number'} <span className="login-required">*</span></label>
            <input
              type="text"
              placeholder={userType === 'intermediary' ? 'Enter your KRA PIN' : 'Enter your ID/Passport Number'}
              className="login-input"
              required
            />
          </div>
          <div className="login-form-group">
            <label>Password</label>
            <div className="login-password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="login-input"
                required
              />
              <button
                type="button"
                className="login-password-toggle"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                aria-label="Show/Hide password"
              >
                <i className={`fa-regular fa-eye${showPassword ? '-slash' : ''}`}></i>
              </button>
            </div>
          </div>
          <div className="login-links-row">
            <a href="#" className="login-link">Create</a>
            <span className="login-link-divider">\\</span>
            <Link to="/forgot-password" className="login-link">Forgot your Password</Link>
          </div>
          <button className="login-submit-btn" type="submit">Sign In</button>
          <div className="login-register-row">
            Don't have an account? <Link to="/register" className="login-link">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
} 
