export const validateForm = (formData) => {
  const errors = {};
  
  // Full Name validation
  if (!formData.fullName.trim()) {
    errors.fullName = 'Full name is required';
  } else if (formData.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters';
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Subject validation
  if (!formData.subject.trim()) {
    errors.subject = 'Subject is required';
  } else if (formData.subject.trim().length < 5) {
    errors.subject = 'Subject must be at least 5 characters';
  }
  
  // Message validation
  if (!formData.message.trim()) {
    errors.message = 'Message is required';
  } else if (formData.message.trim().length < 20) {
    errors.message = 'Message must be at least 20 characters';
  }
  
  return errors;
};