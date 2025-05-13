import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductSelectionModal.css';

export const products = [
  {
    id: 'seniors-mediplan',
    title: 'CIC Seniors Mediplan',
    desc: 'Medical Cover built for comfort in old age.',
    img: '/old-people.png',
    type: 'family',
    hasChildren: 'No',
    numberOfChildren: ''
  },
  {
    id: 'family-medisure',
    title: 'CIC Family Medisure',
    desc: 'Protects insured persons against valid medical expenses, subject to annual benefit limits.',
    img: '/family.png',
    type: 'family',
    hasChildren: 'No',
    numberOfChildren: ''
  },
  {
    id: 'motor-commercial',
    title: 'Motor Commercial Insurance',
    desc: 'This policy provides cover for loss or damage to the insured vehicle and legal liability to third parties for bodily injury and property damage. It also c...',
    img: '/cargo-truck.png',
    type: 'motor'
  },
  {
    id: 'golfers-insurance',
    title: 'Golfers / Sportsman Insurance',
    desc: 'As a sportsperson, your career depends on your well-being. This insurance covers accidents or disabilities that could impact your c...',
    img: '/golfer.png',
    type: 'family'
  },
  {
    id: 'student-accident',
    title: 'Student/Personal Accident Cover',
    desc: 'The Policy will provide monetary payments in the event of body injury sustained by the insured. It covers injuries caused by violent, accident...',
    img: '/student.png',
    type: 'family'
  },
  {
    id: 'motor-private',
    title: 'Private Motor Insurance',
    desc: 'CIC Easy Bima is a monthly motor insurance cover from CIC General Insurance Company. The cover enables you to pay for your motor ve...',
    img: '/car.png',
    type: 'motor'
  },
  {
    id: 'marine-cargo',
    title: 'Marine Cargo Policy',
    desc: 'An insurance cover on all risk basis (ICC-A) that covers losses or damage to goods and/or merchandise in transit from port of ...',
    img: '/cargo-ship.png',
    type: 'motor'
  },
];

const vehicleData = {
  'Toyota': ['Corolla', 'Camry', 'RAV4', 'Land Cruiser', 'Prius', 'Highlander'],
  'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'HR-V'],
  // ... more makes and models
};

export default function ProductSelectionModal({ open, onClose }) {
  const navigate = useNavigate();
  
  if (!open) return null;
  
  const handleProductSelect = (product) => {
    navigate(`/quote/${product.id}`, { state: { product } });
  };

  const handleImageError = (e) => {
    e.target.src = '/cic-logo.svg'; // Fallback to logo if image fails to load
    e.target.onerror = null; // Prevent infinite loop if fallback also fails
  };

  return (
    <div className="product-modal-backdrop">
      <div className="product-modal">
        <div className="product-modal-header">
          <h2>Select product to quote for.</h2>
          <button className="product-modal-close" onClick={onClose} aria-label="Close">
            <span>&times;</span>
          </button>
        </div>
        <hr className="product-modal-divider" />
        <div className="product-modal-grid">
          {products.map((product) => {
            const isFamilyMedisure = product.id === 'family-medisure';
            const isStudentAccident = product.id === 'student-accident';
            return (
              <div 
                className="product-modal-card" 
                key={product.id} 
                onClick={() => handleProductSelect(product)}
                style={{ cursor: 'pointer' }}
              >
                <img 
                  src={product.img} 
                  alt={product.title} 
                  className="product-modal-img" 
                  onError={handleImageError}
                />
                <div className="product-modal-title">{product.title}</div>
                <div className="product-modal-desc">{product.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 