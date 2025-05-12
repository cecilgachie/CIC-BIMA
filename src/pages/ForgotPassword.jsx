import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/ForgotPassword.css';

export default function ForgotPassword() {
  const [userType, setUserType] = useState('customer');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      // Here you would typically call your API to handle password reset
      // For demo purposes, we'll simulate a successful response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccessMessage('Password reset instructions have been sent to your email');
      
      // After 3 seconds, redirect to login page with a message
      setTimeout(() => {
        navigate('/login', { 
          state: { 
            message: 'Password reset link sent to your email. Please check your inbox.' 
          } 
        });
      }, 3000);
      
    } catch (error) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="forgot-password-root">
      <div className="forgot-password-left" />
      <div className="forgot-password-right">
        <form className="forgot-password-form" onSubmit={handleSubmit}>
          <img src="/logo.svg" alt="CIC GROUP" className="forgot-password-logo" />
          <div className="forgot-password-title">Forgot Your Password?</div>
          <div className="forgot-password-subtitle">Enter your email address and we'll send you instructions to reset your password</div>
          
          <div className="forgot-password-radio-row">
            <span className="forgot-password-radio-label">I am</span>
            <label>
              <input
                type="radio"
                name="userType"
                value="customer"
                checked={userType === 'customer'}
                onChange={() => setUserType('customer')}
              />
              <span className="forgot-password-radio-custom customer" />
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
              <span className="forgot-password-radio-custom intermediary" />
              An Intermediary
            </label>
          </div>
          
          {error && <div className="forgot-password-error">{error}</div>}
          {successMessage && <div className="forgot-password-success">{successMessage}</div>}
          
          <div className="forgot-password-form-group">
            <label>Email Address <span className="forgot-password-required">*</span></label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="forgot-password-input"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="forgot-password-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Reset Password'}
          </button>
          
          <div className="forgot-password-links-row">
            <Link to="/login" className="forgot-password-link">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
} 