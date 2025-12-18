import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import "@fontsource/inter";
import './App.css';  // Make sure you include the custom CSS for the animation.
import AboutMe from './components/AboutMe';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';  // Changed from Contact
import Contact from './components/Contact'; // Added Contact import

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const timeoutRef = React.useRef(null);

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showNavbarTemporarily = useCallback(() => {
    setShowNavbar(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setShowNavbar(false);
    }, 3000);
  }, []);

  // Handle scroll and mouse move events
  useEffect(() => {
    const handleScroll = () => {
      showNavbarTemporarily();
    };

    const handleMouseMove = () => {
      showNavbarTemporarily();
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutRef.current);
    };
  }, [showNavbarTemporarily]);

  // Navigation link component
  const NavLink = ({ href, children, onClick }) => {
    const isActive = activeSection === href.replace('#', '');
    
    return (
      <a 
        href={href}
        onClick={onClick}
        className={`
          transition-all duration-200=
          ${isActive 
            ? 'font-bold bg-[#F2F4CB] text-[#110B11]' 
            : 'hover:bg-[#F2F4CB] hover:text-[#110B11] hover:font-bold text-[#F2F4CB]'
          }
          ${onClick ? 'block w-full px-4 py-2' : 'text-sm md:text-sm px-2 py-1 rounded-full whitespace-nowrap'}
        `}
      >
        {children}
      </a>
    );
  };

  // Navigation Bar component
  const NavBar = () => {
    const [isActive, setIsActive] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const timerRef = React.useRef(null);

    // Function to show navbar and set timer to hide it
    const showNavbarTemporarily = () => {
      setIsVisible(true);
      clearTimeout(timerRef.current);
      
      timerRef.current = setTimeout(() => {
        if (!isActive) { // Only dim if not being hovered
          setIsVisible(false);
        }
      }, 5000); // Will dim 5 seconds after last interaction
    };

    // Handle scroll events
    useEffect(() => {
      const handleScroll = () => {
        showNavbarTemporarily();
      };

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        clearTimeout(timerRef.current);
      };
    }, []);

    // Initial visibility
    useEffect(() => {
      showNavbarTemporarily();
    }, []);
    
    return (
      <nav 
        className="fixed top-8 left-0 right-0 z-50 transition-opacity duration-300"
        style={{ opacity: isActive || isVisible ? "1" : "0.4" }}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => {
          setIsActive(false);
          showNavbarTemporarily();
        }}
      >
        <div className="max-w-[623px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* Logo/Home - visible on mobile */}
            <div className="md:hidden">
              {/* Intentionally left empty to maintain spacing */}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex justify-center items-center space-x-4 bg-[#B7990D] rounded-[20px] px-4 py-2 w-fit mx-auto">
              <NavLink href="#home">Home</NavLink>
              <NavLink href="#about">About Me</NavLink>
              <NavLink href="#experience">Experience</NavLink>
              <NavLink href="#projects">Projects</NavLink>
              <NavLink href="#skills">Skills</NavLink>
              <NavLink href="#contact">Contact</NavLink>
            </div>

            {/* Hamburger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center p-2 rounded-lg md:hidden bg-[#B7990D] hover:bg-[#B7990D]/90"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg 
                className="w-6 h-6 text-[#110B11]"
                fill="none"
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2"
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div 
            id="mobile-menu"
            className={`
              absolute top-full left-0 right-0 mt-2 mx-4 bg-[#110B11] rounded-lg 
              border border-[#B7990D]/20 shadow-lg transform transition-all duration-200 ease-in-out
              ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
            `}
          >
            <div className="py-2">
              <NavLink 
                href="#home"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-[#F2F4CB] hover:bg-[#B7990D]/10 transition-colors"
              >
                Home
              </NavLink>
              <NavLink 
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-[#F2F4CB] hover:bg-[#B7990D]/10 transition-colors"
              >
                About Me
              </NavLink>
              <NavLink 
                href="#experience"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-[#F2F4CB] hover:bg-[#B7990D]/10 transition-colors"
              >
                Experience
              </NavLink>
              <NavLink 
                href="#projects"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-[#F2F4CB] hover:bg-[#B7990D]/10 transition-colors"
              >
                Projects
              </NavLink>
              <NavLink 
                href="#skills"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-[#F2F4CB] hover:bg-[#B7990D]/10 transition-colors"
              >
                Skills
              </NavLink>
              <NavLink 
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2 text-[#F2F4CB] hover:bg-[#B7990D]/10 transition-colors"
              >
                Contact
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    );
  };

  return (
    <div className="bg-[#110B11] min-h-screen flex flex-col relative">
      {/* Binary Background Pattern */}
      <div className="fixed inset-0 text-[#F2F4CB]/10 font-mono text-xl select-none pointer-events-none overflow-hidden flex justify-evenly px-4">
        {[
          '01000110', // F
          '01010010', // R
          '01000001', // A
          '01001110', // N
          '01001011', // K
          '00100000', // (space)
          '01000011', // C
          '01000001', // A
          '01001100', // L
          '01010101', // U
          '01001101', // M
          '01000001', // A
          '01011001'  // Y
        ].map((binary, i) => (
          <div key={i} className="flex flex-col animate-binary" style={{
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 5}s`
          }}>
            {Array(8).fill().map((_, j) => (
              <div key={j} className="tracking-wider">
                {binary.split('').map((bit, k) => (
                  <div key={k}>{bit}</div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <NavBar />

      {/* Main Content */}
      <main className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6" id="home">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl w-full"
        >
          {/* Mobile Layout */}
          <motion.div 
            className="flex flex-col-reverse gap-4 md:hidden items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex flex-col items-center flex-1">
              <h1 className="text-5xl font-light mb-4">
                <span className="text-[#F2F4CB]">Hi! I'm</span> <span className="text-[#F2F4CB] font-bold">Frank</span>
              </h1>
              <p className="text-gray-400 text-lg text-center mb-8">
                Aspiring IT professional seeking an internship.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
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
              </div>
            </div>
            <div className="w-48 h-48 rounded-[1000px] overflow-hidden flex-shrink-0">
              <img 
                src={process.env.PUBLIC_URL + "/images/profile.jpg"} 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Desktop Layout */}
          <motion.div 
            className="hidden md:flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              className="flex flex-col items-start mr-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h1 className="text-5xl font-light mb-4">
                <span className="text-[#F2F4CB]">Hi! I'm</span> <span className="text-[#F2F4CB] font-bold">Frank</span>
              </h1>
              <p className="text-gray-400 text-lg text-left mb-8">
                Aspiring IT professional seeking an internship.
              </p>
              <motion.div 
                className="flex space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
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
              </motion.div>
            </motion.div>

            <motion.div 
              className="w-48 h-48 rounded-[1000px] overflow-hidden flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <img 
                src={process.env.PUBLIC_URL + "/images/profile.jpg"} 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </main>

      {/* Other Components */}
      <AboutMe />
      <Experience />
      <Projects />
      <Skills />
      <Contact />

      {/* Footer */}
      <motion.footer 
        className="relative z-10 bg-[#B7990D] text-[#110B11] py-4 w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <p>&copy; 2025 Frank Calumay. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
};

export default App;
