import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaFileDownload } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  const [lastSubmission, setLastSubmission] = useState(0);
  const SUBMIT_COOLDOWN = 60000; // 1 minute cooldown

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailPattern.test(formData.email)) {
      setSubmitStatus({
        submitted: true,
        success: false,
        message: 'Please enter a valid email address.'
      });
      return false;
    }
    if (formData.message.length < 10) {
      setSubmitStatus({
        submitted: true,
        success: false,
        message: 'Message must be at least 10 characters long.'
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastSubmission < SUBMIT_COOLDOWN) {
      setSubmitStatus({
        submitted: true,
        success: false,
        message: 'Please wait a minute before sending another message.'
      });
      return;
    }
    if (!validateForm()) {
      return;
    }

    // Check if EmailJS is configured
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      // Fallback to mailto if EmailJS is not configured
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:fcalumay2021@gmail.com?subject=${subject}&body=${body}`;
      setSubmitStatus({
        submitted: true,
        success: true,
        message: 'Opening your email client. Please send the message from there.'
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      return;
    }

    try {
      await emailjs.sendForm(
        serviceId,
        templateId,
        form.current,
        publicKey
      );
      setLastSubmission(now);
      setSubmitStatus({
        submitted: true,
        success: true,
        message: 'Thank you for your message! I will get back to you soon.'
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      let errorMessage = 'Oops! Something went wrong. Please try again later.';
      
      if (error.text) {
        if (error.text.includes('Invalid API key') || error.text.includes('invalid api')) {
          errorMessage = 'Email service is not configured. Please contact me directly at fcalumay2021@gmail.com';
        } else if (error.text.includes('Service ID')) {
          errorMessage = 'Email service configuration error. Please contact me directly at fcalumay2021@gmail.com';
        }
      }
      
      setSubmitStatus({
        submitted: true,
        success: false,
        message: errorMessage
      });
    }
  };

  const handleDownloadCV = () => {
    const cvUrl = process.env.PUBLIC_URL + '/documents/frank-calumay-cv.pdf';
    window.open(cvUrl, '_blank');
  };

  return (
    <section id="contact" className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 pt-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        <h2 className="text-[#F2F4CB] text-5xl font-light mb-12">
          get in <span className="font-bold">touch</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#110B11]/50 rounded-xl p-6 border border-[#B7990D]/20"
          >
            <form ref={form} onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-[#F2F4CB] mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#110B11] border border-[#B7990D]/20 rounded-lg text-[#F2F4CB] focus:outline-none focus:border-[#B7990D]"
                />
              </div>
              
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-[#F2F4CB] mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#110B11] border border-[#B7990D]/20 rounded-lg text-[#F2F4CB] focus:outline-none focus:border-[#B7990D]"
                />
              </div>
              
              {/* Subject Input */}
              <div>
                <label htmlFor="subject" className="block text-[#F2F4CB] mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-[#110B11] border border-[#B7990D]/20 rounded-lg text-[#F2F4CB] focus:outline-none focus:border-[#B7990D]"
                />
              </div>
              
              {/* Message Input */}
              <div>
                <label htmlFor="message" className="block text-[#F2F4CB] mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 bg-[#110B11] border border-[#B7990D]/20 rounded-lg text-[#F2F4CB] focus:outline-none focus:border-[#B7990D]"
                ></textarea>
              </div>

              {/* Send Message Button */}
              <button
                type="submit"
                className="w-full bg-[#B7990D] text-[#110B11] py-2 px-4 rounded-lg font-semibold hover:bg-[#B7990D]/90 transition-colors flex items-center justify-center gap-2"
              >
                <FaEnvelope />
                Send Message
              </button>

              {submitStatus.submitted && (
                <div className={`text-center p-3 rounded-lg ${submitStatus.success ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                  {submitStatus.message}
                </div>
              )}
            </form>
          </motion.div>

          {/* Contact Info & CV Download */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-[#110B11]/50 rounded-xl p-6 border border-[#B7990D]/20"
            >
              <h3 className="text-[#F2F4CB] text-2xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-4 text-gray-400">
                <p>Feel free to reach out to me through the contact form or directly via email.</p>
                <p>Email: <a href="mailto:fcalumay2021@gmail.com" className="text-[#B7990D] hover:text-[#B7990D]/80">fcalumay2021@gmail.com</a></p>
                <p>Location: Valenzuela City, Philippines</p>
                <div className="flex space-x-4 pt-2">
                  <a href="https://www.instagram.com/xafrnk_/" target="_blank" rel="noopener noreferrer" className="bg-[#F2F4CB] p-3 rounded-full hover:bg-[#F2F4CB]/90 transition-colors">
                    <svg className="w-6 h-6 text-[#110B11]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/frank.angelo.792/" target="_blank" rel="noopener noreferrer" className="bg-[#F2F4CB] p-3 rounded-full hover:bg-[#F2F4CB]/90 transition-colors">
                    <svg className="w-6 h-6 text-[#110B11]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/frank-angelo-sarto-calumay-708b9b369/" target="_blank" rel="noopener noreferrer" className="bg-[#F2F4CB] p-3 rounded-full hover:bg-[#F2F4CB]/90 transition-colors">
                    <svg className="w-6 h-6 text-[#110B11]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.32 8.32h4.36V24H.32V8.32zM8.12 8.32h4.18v2.13h.06c.58-1.1 2-2.26 4.12-2.26 4.4 0 5.21 2.9 5.21 6.68V24h-4.36v-7.32c0-1.75-.03-4-2.44-4-2.44 0-2.81 1.9-2.81 3.86V24H8.12V8.32z"/>
                    </svg>
                  </a>
                </div>
              </div>        
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-[#110B11]/50 rounded-xl p-6 border border-[#B7990D]/20"
            >
              <h3 className="text-[#F2F4CB] text-2xl font-bold mb-4">Download CV</h3>
              <p className="text-gray-400 mb-4">
                Get a copy of my detailed curriculum vitae to learn more about my experience and skills.
              </p>
              <button
                onClick={handleDownloadCV}
                className="w-full bg-[#B7990D] text-[#110B11] py-2 px-4 rounded-lg font-semibold hover:bg-[#B7990D]/90 transition-colors flex items-center justify-center gap-2"
              >
                <FaFileDownload />
                Download CV
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
