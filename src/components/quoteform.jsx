import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/QuoteForm.css';

function QuoteForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idNumber: '',
    vehicleType: '',
    vehicleMake: '',
    vehicleModel: '',
    yearOfManufacture: '',
    coverType: 'comprehensive',
    startDate: '',
    paymentOption: 'monthly'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // In production, send this to backend via fetch/axios
  };

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

      <div className="quote-form-container">
        <div className="cic-welcome">Get Your Insurance Quote</div>
        <h1 className="cic-main-heading">We keep our word</h1>
        <div className="cic-subtitle">Fill in your details below</div>
        
        <form onSubmit={handleSubmit} className="quote-form">
          <div className="form-row">
            <label>
              First Name
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Last Name
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Email Address
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Phone Number
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label>
            ID Number
            <input
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              required
            />
          </label>

          <div className="form-row">
            <label>
              Vehicle Type
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                required
              >
                <option value="">Select Vehicle Type</option>
                <option value="private">Private</option>
                <option value="commercial">Commercial</option>
                <option value="motorcycle">Motorcycle</option>
              </select>
            </label>
            <label>
              Vehicle Make
              <input
                type="text"
                name="vehicleMake"
                value={formData.vehicleMake}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Vehicle Model
              <input
                type="text"
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Year of Manufacture
              <input
                type="number"
                name="yearOfManufacture"
                value={formData.yearOfManufacture}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear()}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Cover Type
              <select
                name="coverType"
                value={formData.coverType}
                onChange={handleChange}
                required
              >
                <option value="comprehensive">Comprehensive</option>
                <option value="thirdParty">Third Party</option>
                <option value="thirdPartyFireAndTheft">Third Party Fire & Theft</option>
              </select>
            </label>
            <label>
              Cover Start Date
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <label>
            Payment Option
            <select
              name="paymentOption"
              value={formData.paymentOption}
              onChange={handleChange}
              required
            >
              <option value="monthly">Monthly</option>
              <option value="annually">Annually</option>
            </select>
          </label>

          <button type="submit">Get Quote</button>
        </form>
      </div>
    </>
  );
}

export default QuoteForm;
