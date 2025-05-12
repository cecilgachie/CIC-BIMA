import React, { useState } from 'react';
import './QuoteFormWithSummary.css';

const productFormFields = {
  'CIC Seniors Mediplan': [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your full name', required: true },
    { name: 'phone', label: 'Phone Number', type: 'text', placeholder: 'Enter your phone number', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email address', required: true },
    { name: 'dob', label: 'What is your Date of Birth?', type: 'date', placeholder: 'Pick Date of Birth', required: true },
    { name: 'spouse', label: 'Do you have and want to insure your spouse?', type: 'select', options: ['No', 'Yes'], required: true },
  ],
  'CIC Family Medisure': [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your full name', required: true },
    { name: 'phone', label: 'Phone Number', type: 'text', placeholder: 'Enter your phone number', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email address', required: true },
    { name: 'dob', label: 'What is your Date of Birth?', type: 'date', placeholder: 'Pick Date of Birth', required: true },
    { name: 'spouse', label: 'Do you have and want to insure your spouse?', type: 'select', options: ['No', 'Yes'], required: true },
    { name: 'children', label: 'Do you have children you want to insure?', type: 'select', options: ['No', 'Yes'], required: true },
  ],
  'Motor Commercial Insurance': [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your full name', required: true },
    { name: 'phone', label: 'Phone Number', type: 'text', placeholder: 'Enter your phone number', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email address', required: true },
    { name: 'vehicleMake', label: 'Vehicle Make', type: 'select', options: ['Select Vehicle Make'], required: true },
    { name: 'vehicleModel', label: 'Vehicle Model', type: 'select', options: ['Select Vehicle Model'], required: true },
    { name: 'year', label: 'Year of Manufacture', type: 'text', placeholder: 'YOM', required: true, note: 'Maximum vehicle age for comprehensive cover is 15 yrs' },
    { name: 'vehicleValue', label: 'Vehicle Value', type: 'text', placeholder: 'Kes', required: true, note: 'Minimum value for comprehensive cover is Kes 500,000' },
    { name: 'vehicleBodyType', label: 'Vehicle Body Type', type: 'select', options: ['Select Vehicle Body Type'], required: true },
    { name: 'vehicleTonnage', label: 'Vehicle Tonnage', type: 'text', placeholder: '1', required: true },
    { name: 'specialNote', type: 'note', value: 'N/B: Refer to back office on +254 793 772 728 or +254 113 921 047 for special type e.g Petroleum tankers, Ambulance, Fire engines, psv assets among others', color: 'red' },
  ],
  'Student/Personal Accident Cover': [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your full name', required: true },
    { name: 'phone', label: 'Phone Number', type: 'text', placeholder: 'Enter your phone number', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email address', required: true },
    { name: 'occupation', label: 'Occupation', type: 'select', options: ['Select Occupation', 'Student', 'Intern'], required: true, note: 'For students on industrial attachment, pick Occupation as ', noteHighlight: 'Student or Intern' },
    { name: 'placeOfAttachment', label: 'Place of Attachment', type: 'text', placeholder: 'Enter place of attachment', required: true },
    { name: 'natureOfAttachment', label: 'Nature of Attachment', type: 'text', placeholder: 'Enter nature of attachment', required: true },
    { name: 'attachmentStart', label: 'Attachment Start Date', type: 'date', placeholder: 'Pick Policy Start Date', required: true },
    { name: 'duration', label: 'Duration of Attachment', type: 'select', options: ['12 Months'], required: true },
  ],
  'Private Motor Insurance': [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your full name', required: true },
    { name: 'phone', label: 'Phone Number', type: 'text', placeholder: 'Enter your phone number', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email address', required: true },
    { name: 'vehicleMake', label: 'Vehicle Make', type: 'select', options: ['Select Vehicle Make'], required: true },
    { name: 'vehicleModel', label: 'Vehicle Model', type: 'select', options: ['Select Vehicle Model'], required: true },
    { name: 'year', label: 'Year of Manufacture', type: 'text', placeholder: 'YOM', required: true, note: 'Maximum vehicle age for comprehensive cover is 15 yrs' },
    { name: 'vehicleValue', label: 'Vehicle Value', type: 'text', placeholder: 'Kes', required: true, note: 'Minimum value for comprehensive cover is Kes 500,000' },
    { name: 'specialNote', type: 'note', value: 'N/B: This product does not cover vehicles used for hire and reward.', color: 'red' },
  ],
  'Golfers / Sportsman Insurance': [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your full name', required: true },
    { name: 'phone', label: 'Phone Number', type: 'text', placeholder: 'Enter your phone number', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email address', required: true },
    { name: 'clubs', label: 'Which clubs are you a member of?', type: 'select', options: ['Select Club(s)'], required: true },
    { name: 'occupation', label: 'Occupation', type: 'select', options: ['Select Occupation'], required: true },
    { name: 'policyStart', label: 'Proposed Policy Start Date', type: 'date', placeholder: 'Pick Policy Start Date', required: true },
  ],
  'Marine Cargo Policy': [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter your full name', required: true },
    { name: 'phone', label: 'Phone Number', type: 'text', placeholder: 'Enter your phone number', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter your email address', required: true },
    { name: 'goodsValue', label: 'Value of Goods', type: 'text', placeholder: 'Kes', required: true },
    { name: 'mode', label: 'Mode of Conveyance', type: 'select', options: ['Select Option'], required: true },
    { name: 'countryOrigin', label: 'Country of Origin', type: 'select', options: ['Select Option'], required: true },
    { name: 'portOrigin', label: 'Port of Origin', type: 'select', options: ['Select Option'], required: true },
    { name: 'countryDest', label: 'Country of Destination', type: 'select', options: ['Select Option'], required: true },
    { name: 'portDest', label: 'Port of Destination', type: 'select', options: ['Select Option'], required: true },
  ],
};

export default function QuoteFormWithSummary({ product, onBack }) {
  if (!product) return null;
  const fields = productFormFields[product.title] || [];
  const [form, setForm] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  if (!fields.length) {
    return (
      <div className="quote-form-section">
        <button className="quote-form-back" onClick={onBack}>&larr; Back</button>
        <h2 className="quote-form-title">Get Your Quote Now</h2>
        <div>No form available for this product.</div>
      </div>
    );
  }

  return (
    <div className="quote-form-section">
      <button className="quote-form-back" onClick={onBack}>&larr; Back</button>
      <h2 className="quote-form-title">Get Your Quote Now</h2>
      <div className="quote-form-layout">
        <form className="quote-form-main">
          {fields.map((field, idx) => {
            if (field.type === 'note') {
              return (
                <div key={field.name || idx} className="quote-form-note" style={{ color: field.color || '#888' }}>
                  {field.value}
                  {field.noteHighlight && <span style={{ color: 'red', fontWeight: 600 }}> {field.noteHighlight}</span>}
                </div>
              );
            }
            return (
              <div className="quote-form-group" key={field.name}>
                <label>
                  {field.label} {field.required && <span className="required">*</span>}
                  {field.type === 'select' ? (
                    <select name={field.name} value={form[field.name] || ''} onChange={handleChange} required={field.required}>
                      {field.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      name={field.name}
                      type={field.type}
                      value={form[field.name] || ''}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  )}
                  {field.note && (
                    <div className="quote-form-field-note">
                      {field.note}
                    </div>
                  )}
                </label>
              </div>
            );
          })}
          <button className="quote-form-submit" type="submit">Display Quotes</button>
        </form>
        <div className="quote-form-summary">
          <div className="quote-summary-card">
            <div className="quote-summary-title">Quoting For</div>
            <img src={product.img} alt={product.title} className="quote-summary-img" />
            <div className="quote-summary-name">{product.title}</div>
            <div className="quote-summary-desc-label">Product Description</div>
            <div className="quote-summary-desc">{product.desc}</div>
          </div>
        </div>
      </div>
    </div>
  );
} 