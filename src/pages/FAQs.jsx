import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import '../styles/FAQs.css';

function FAQs() {
  return (
    <>
      <Navbar />
      <main className="faqs-page">
        <div className="faqs-container">
          <h1>Frequently Asked Questions</h1>
          <div className="faqs-list">
            <div className="faq-item">
              <h3>What types of insurance do you offer?</h3>
              <p>We offer comprehensive motor insurance, third-party insurance, and third-party fire and theft insurance for various types of vehicles including private cars, commercial vehicles, and motorcycles.</p>
            </div>
            <div className="faq-item">
              <h3>How do I get a quote?</h3>
              <p>Getting a quote is easy! Simply fill out our online quote form with your details and vehicle information. We'll provide you with a competitive quote within minutes.</p>
            </div>
            <div className="faq-item">
              <h3>What documents do I need to get insured?</h3>
              <p>You'll need your ID number, vehicle registration details, and contact information. For commercial vehicles, additional documentation may be required.</p>
            </div>
            <div className="faq-item">
              <h3>How can I make a claim?</h3>
              <p>In case of an accident or damage, you can make a claim by calling our 24/7 claims hotline or through our online claims portal. Our claims team will guide you through the process.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default FAQs;
