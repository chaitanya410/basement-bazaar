
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/welcome' },
    { name: 'Join Us', path: '/recruitment' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'ngo-glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2"
            >
              <span className="inline-block h-8 w-8 rounded-full bg-ngo-blue animate-pulse-slow"></span>
              <span className="font-display text-xl font-bold">Basements Social Forum</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`link-underline text-sm font-medium ${
                  location.pathname === link.path ? 'text-ngo-blue' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center space-x-4">
              <Link to="/login" className="btn-ngo-outline">
                Log in
              </Link>
              <Link to="/signup" className="btn-ngo">
                Sign up
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full ngo-glass overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col space-y-4">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-base font-medium py-2 px-3 rounded-md transition-colors duration-200 ${
                location.pathname === link.path 
                  ? 'bg-ngo-blue/20 text-ngo-blue' 
                  : 'hover:bg-ngo-blue/10'
              }`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: isOpen ? 'slide-in 0.4s ease-out forwards' : 'none'
              }}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 flex flex-col space-y-3">
            <Link to="/login" className="btn-ngo-outline w-full justify-center">
              Log in
            </Link>
            <Link to="/signup" className="btn-ngo w-full justify-center">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
