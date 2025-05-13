import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import ProductSelectionModal from '../components/ProductSelectionModal';
import QuoteFormWithSummary from '../components/QuoteFormWithSummary';
import '../styles/Quote.css';

// Import products data to be able to find product by ID
import { products } from '../components/ProductSelectionModal';

function Quote() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const { productId } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (productId) {
      // If we have state, use it
      if (location.state?.product) {
        setSelectedProduct(location.state.product);
      } else {
        // If no state (e.g. on refresh), find product by ID
        const product = products.find(p => p.id === productId);
        if (product) {
          setSelectedProduct(product);
        } else {
          // If product not found, go back to selection
          navigate('/quote');
        }
      }
      setShowModal(false);
    } else {
      setShowModal(true);
      setSelectedProduct(null);
    }
  }, [productId, location.state, navigate]);

  const handleBack = () => {
    if (productId) {
      navigate('/quote');
    } else {
      navigate('/');
    }
  };

  const handleModalClose = () => {
    if (productId) {
      navigate('/quote');
    } else {
      navigate('/');
    }
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

      <main className="quote-page-main">
        {selectedProduct ? (
          <QuoteFormWithSummary
            product={selectedProduct}
            onBack={handleBack}
          />
        ) : (
          <div className="quote-selection-prompt">
            <h1>Select Your Insurance Product</h1>
            <p>Choose from our range of insurance products to get started with your quote.</p>
          </div>
        )}
        <ProductSelectionModal
          open={showModal}
          onClose={handleModalClose}
        />
      </main>
    </>
  );
}

export default Quote;
