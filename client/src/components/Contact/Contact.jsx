import React, { useState } from 'react';
import { validateForm } from '../../utils/validation';
import './Contact.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
      
      setTimeout(() => setSubmitStatus(null), 5000);
    }, 2000);
  };

  return (
    <div className="contact-form-section">
      <h2>Send us a message</h2>
      
      {submitStatus === 'success' && (
        <div className="alert alert-success">
          Message sent successfully! We'll get back to you soon.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Your full name"
            className={errors.fullName ? 'error' : ''}
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="What is this about?"
            className={errors.subject ? 'error' : ''}
          />
          {errors.subject && <span className="error-message">{errors.subject}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us more about your inquiry..."
            rows="5"
            className={errors.message ? 'error' : ''}
          />
          {errors.message && <span className="error-message">{errors.message}</span>}
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'SUBMIT'}
          <svg className="submit-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22,2 15,22 11,13 2,9"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
};

const ContactInfo = () => {
  return (
    <div className="contact-info-section">
      <h2>Contact Information</h2>
      
      <div className="organization-info">
        <h3>YOUR CLUB NAME</h3>
        
        <div className="contact-item">
          <div className="contact-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <div className="contact-details">
            <p>Krishnankoil, Srivilliputhur, Tamil Nadu</p>
            <p>626126</p>
          </div>
        </div>

        <div className="contact-item">
          <div className="contact-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <div className="contact-details">
            <p>yourclub@college.edu</p>
          </div>
        </div>

        <div className="contact-item">
          <div className="contact-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <div className="contact-details">
            <p>+1 (555) 123-4567</p>
          </div>
        </div>
      </div>

      <div className="association-info">
        <h4>Association for Computing Machinery</h4>
        <p className="chapter-link">
          <a href="#" className="club-link">YOUR CLUB Student Chapter</a>
        </p>
      </div>

      <div className="social-media">
        <h4>Follow Us</h4>
        <div className="social-links">
          <a href="https://linkedin.com/company/yourclub" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://instagram.com/yourclub" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://facebook.com/yourclub" target="_blank" rel="noopener noreferrer">Facebook</a>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1>Get In Touch</h1>
          <p>Have questions about our club? We would love to hear from you. Send us a message and we will respond as soon as possible.</p>
        </div>
      </div>
      
      <div className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
