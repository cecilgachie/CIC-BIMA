import React from 'react';
import './ProductSelectionModal.css';

const products = [
  {
    title: 'CIC Seniors Mediplan',
    desc: 'Medical Cover built for comfort in old age.',
    img: '/product-seniors.svg',
  },
  {
    title: 'CIC Family Medisure',
    desc: 'Protects insured persons against valid medical expenses, subject to annual benefit limits.',
    img: '/product-family.svg',
  },
  {
    title: 'Motor Commercial Insurance',
    desc: 'This policy provides cover for loss or damage to the insured vehicle and legal liability to third parties for bodily injury and property damage. It also c...',
    img: '/product-motor.svg',
  },
  {
    title: 'Golfers / Sportsman Insurance',
    desc: 'As a sportsperson, your career depends on your well-being. This insurance covers accidents or disabilities that could impact your c...',
    img: '/product-golf.svg',
  },
  {
    title: 'Student/Personal Accident Cover',
    desc: 'The Policy will provide monetary payments in the event of body injury sustained by the insured. It covers injuries caused by violent, accident...',
    img: '/product-student.svg',
  },
  {
    title: 'Private Motor Insurance',
    desc: 'CIC Easy Bima is a monthly motor insurance cover from CIC General Insurance Company. The cover enables you to pay for your motor ve...',
    img: '/product-private.svg',
  },
  {
    title: 'Marine Cargo Policy',
    desc: 'An insurance cover on all risk basis (ICC-A) that covers losses or damage to goods and/or merchandise in transit from port of ...',
    img: '/product-marine.svg',
  },
];

export default function ProductSelectionModal({ open, onClose }) {
  if (!open) return null;
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
          {products.map((p, i) => (
            <div className="product-modal-card" key={i}>
              <img src={p.img} alt={p.title} className="product-modal-img" />
              <div className="product-modal-title">{p.title}</div>
              <div className="product-modal-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 