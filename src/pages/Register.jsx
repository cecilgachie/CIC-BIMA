import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Register.css';
import logo from '/cic-logo.jpeg';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    idPassportNo: '',
    kraPin: '',
    nationality: '',
    postalAddress: '',
    mobileNo: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    consentMarketing: false,
  });
  
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.idPassportNo.trim()) newErrors.idPassportNo = 'ID/Passport Number is required';
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Validate mobile number
    if (!formData.mobileNo.trim()) {
      newErrors.mobileNo = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobileNo.replace(/\D/g, ''))) {
      newErrors.mobileNo = 'Please enter a valid mobile number';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Validate terms
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    return newErrors;
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.idPassportNo.trim()) newErrors.idPassportNo = 'ID/Passport Number is required';
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      
      if (!formData.mobileNo.trim()) {
        newErrors.mobileNo = 'Mobile number is required';
      } else if (!/^[0-9]{10}$/.test(formData.mobileNo.replace(/\D/g, ''))) {
        newErrors.mobileNo = 'Please enter a valid mobile number';
      }
    } else if (step === 2) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      
      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      }
    }
    
    return newErrors;
  };

  const nextStep = () => {
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    console.log('Form submitted:', formData);
    // Add form submission logic here (e.g., API call)
    
    // For demo purposes, navigate to login after successful registration
    alert('Registration successful! Please login.');
    navigate('/login');
  };

  const renderStepLabel = () => {
    switch (currentStep) {
      case 1:
        return 'Personal Information';
      case 2:
        return 'Account Security';
      default:
        return '';
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-wrapper">
        <form className="register-form" onSubmit={currentStep === totalSteps ? handleSubmit : (e) => e.preventDefault()}>
          <div className="register-title">Create an Account</div>
          <div className="register-subtitle">Join CIC Insurance and get started with your insurance journey</div>
          
          <div className="step-indicator" style={{display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px'}}>
            {Array.from({ length: totalSteps }, (_, i) => (
              <div 
                key={i}
                style={{
                  width: '30px', 
                  height: '30px', 
                  borderRadius: '50%', 
                  backgroundColor: currentStep > i ? '#B71C1C' : currentStep === i + 1 ? '#FFC400' : '#BDBDBD',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontWeight: 'bold'
                }}
              >
                <span>{i + 1}</span>
              </div>
            ))}
          </div>
          <h3 style={{marginBottom: '20px', textAlign: 'center', color: '#B71C1C'}}>{renderStepLabel()}</h3>
          
          {currentStep === 1 && (
            <>
              <div style={{display: 'flex', gap: '15px', width: '100%', marginBottom: '15px'}}>
                <div className="register-form-group" style={{flex: 1}}>
                  <label htmlFor="title">Title</label>
                  <select
                    name="title"
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="register-input"
                  >
                    <option value="">Select Title</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Miss">Miss</option>
                  </select>
                </div>
                
                <div className="register-form-group" style={{flex: 1}}>
                  <label htmlFor="gender">Gender <span className="register-required">*</span></label>
                  <select
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="register-input"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && <span className="register-error">{errors.gender}</span>}
                </div>
              </div>
              
              <div style={{display: 'flex', gap: '15px', width: '100%', marginBottom: '15px'}}>
                <div className="register-form-group" style={{flex: 1}}>
                  <label htmlFor="firstName">First Name <span className="register-required">*</span></label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className={`register-input ${errors.firstName ? 'register-input-error' : ''}`}
                  />
                  {errors.firstName && <span className="register-error">{errors.firstName}</span>}
                </div>
                
                <div className="register-form-group" style={{flex: 1}}>
                  <label htmlFor="middleName">Middle Name</label>
                  <input
                    type="text"
                    id="middleName"
                    name="middleName"
                    placeholder="Middle Name (Optional)"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="register-input"
                  />
                </div>
              </div>
              
              <div style={{display: 'flex', gap: '15px', width: '100%', marginBottom: '15px'}}>
                <div className="register-form-group" style={{flex: 1}}>
                  <label htmlFor="lastName">Last Name <span className="register-required">*</span></label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className={`register-input ${errors.lastName ? 'register-input-error' : ''}`}
                  />
                  {errors.lastName && <span className="register-error">{errors.lastName}</span>}
                </div>
                
                <div className="register-form-group" style={{flex: 1}}>
                  <label htmlFor="idPassportNo">ID/Passport No <span className="register-required">*</span></label>
                  <input
                    type="text"
                    id="idPassportNo"
                    name="idPassportNo"
                    placeholder="ID/Passport No"
                    value={formData.idPassportNo}
                    onChange={handleChange}
                    required
                    className={`register-input ${errors.idPassportNo ? 'register-input-error' : ''}`}
                  />
                  {errors.idPassportNo && <span className="register-error">{errors.idPassportNo}</span>}
                </div>
              </div>
              
              <div style={{display: 'flex', gap: '15px', width: '100%', marginBottom: '15px'}}>
                <div className="register-form-group" style={{flex: 1}}>
                  <label htmlFor="kraPin">KRA Pin</label>
                  <input
                    type="text"
                    id="kraPin"
                    name="kraPin"
                    placeholder="KRA Pin"
                    value={formData.kraPin}
                    onChange={handleChange}
                    className="register-input"
                  />
                </div>
                
                <div className="register-form-group" style={{flex: 1}}>
                  <label htmlFor="nationality">Nationality</label>
                  <select
                    name="nationality"
                    id="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    className="register-input"
                  >
                    <option value="">Select Nationality</option>
                    <option value="Kenyan">Kenyan</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              
              <div style={{display: 'flex', gap: '15px', width: '100%', marginBottom: '15px'}}>
                <div className="register-form-group" style={{flex: 1}}>
                  <label htmlFor="mobileNo">Mobile No <span className="register-required">*</span></label>
                  <input
                    type="text"
                    id="mobileNo"
                    name="mobileNo"
                    placeholder="Mobile No"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    required
                    className={`register-input ${errors.mobileNo ? 'register-input-error' : ''}`}
                  />
                  {errors.mobileNo && <span className="register-error">{errors.mobileNo}</span>}
                </div>
                
                <div className="register-form-group" style={{flex: 1}}>
                  <label htmlFor="email">Email <span className="register-required">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`register-input ${errors.email ? 'register-input-error' : ''}`}
                  />
                  {errors.email && <span className="register-error">{errors.email}</span>}
                </div>
              </div>
              
              <div className="register-form-group">
                <label htmlFor="postalAddress">Postal Address</label>
                <input
                  type="text"
                  id="postalAddress"
                  name="postalAddress"
                  placeholder="Postal Address"
                  value={formData.postalAddress}
                  onChange={handleChange}
                  className="register-input"
                />
              </div>
            </>
          )}
          
          {currentStep === 2 && (
            <>
              <div className="register-form-group">
                <label htmlFor="password">Password <span className="register-required">*</span></label>
                <div className="register-password-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={`register-input ${errors.password ? 'register-input-error' : ''}`}
                  />
                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    <i className={`fa-regular fa-eye${showPassword ? '-slash' : ''}`}></i>
                  </button>
                </div>
                {errors.password && <span className="register-error">{errors.password}</span>}
              </div>
              
              <div className="register-form-group">
                <label htmlFor="confirmPassword">Confirm Password <span className="register-required">*</span></label>
                <div className="register-password-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={`register-input ${errors.confirmPassword ? 'register-input-error' : ''}`}
                  />
                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    <i className={`fa-regular fa-eye${showConfirmPassword ? '-slash' : ''}`}></i>
                  </button>
                </div>
                {errors.confirmPassword && <span className="register-error">{errors.confirmPassword}</span>}
              </div>
              
              <div className="register-form-group" style={{display: 'flex', alignItems: 'flex-start', marginTop: '10px'}}>
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  style={{marginRight: '10px', marginTop: '3px'}}
                />
                <label htmlFor="agreeToTerms" style={{cursor: 'pointer'}}>
                  By creating an account you are agreeing to our <a href="#" className="register-link">Privacy Policy</a> and <a href="#" className="register-link">Terms of Use</a>
                </label>
              </div>
              {errors.agreeToTerms && <span className="register-error">{errors.agreeToTerms}</span>}
              
              <div className="register-form-group" style={{display: 'flex', alignItems: 'flex-start', marginTop: '10px'}}>
                <input
                  type="checkbox"
                  id="consentMarketing"
                  name="consentMarketing"
                  checked={formData.consentMarketing}
                  onChange={handleChange}
                  style={{marginRight: '10px', marginTop: '3px'}}
                />
                <label htmlFor="consentMarketing" style={{cursor: 'pointer'}}>
                  I consent to receiving marketing information by CIC Insurance Group.
                </label>
              </div>
            </>
          )}
          
          <div style={{display: 'flex', gap: '15px', width: '100%', marginTop: '20px'}}>
            {currentStep > 1 && (
              <button 
                type="button" 
                onClick={prevStep}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#fff',
                  color: '#B71C1C',
                  border: '1px solid #B71C1C',
                  borderRadius: '10px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Back
              </button>
            )}
            
            {currentStep < totalSteps ? (
              <button 
                type="button" 
                onClick={nextStep}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#B71C1C',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Next
              </button>
            ) : (
              <button 
                type="submit" 
                className="register-submit-btn"
              >
                Register
              </button>
            )}
          </div>
          
          <div className="register-login-row" style={{marginTop: '20px'}}>
            Already have an account? <Link to="/login" className="register-link">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
