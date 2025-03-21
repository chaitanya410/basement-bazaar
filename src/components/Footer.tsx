
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-ngo-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="inline-block h-8 w-8 rounded-full bg-ngo-blue"></span>
              <span className="font-display text-xl font-bold">Basements Social Forum</span>
            </Link>
            <p className="text-gray-400 max-w-xs">
              Empowering communities in Wardha through social initiatives, education, and cultural engagement.
            </p>
          </div>
          
          <div>
            <h3 className="font-display text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-ngo-blue transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/welcome" className="text-gray-400 hover:text-ngo-blue transition-colors">Events</Link>
              </li>
              <li>
                <Link to="/recruitment" className="text-gray-400 hover:text-ngo-blue transition-colors">Join Our Team</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-ngo-blue transition-colors">Member Login</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display text-xl mb-4">Contact Us</h3>
            <ul className="space-y-2 text-gray-400">
              <li>123 Social Avenue, Wardha, India</li>
              <li>contact@basementsforum.org</li>
              <li>+91 98765 43210</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} The Basements Social Forum. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-ngo-blue transition-colors">
              Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-ngo-blue transition-colors">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-ngo-blue transition-colors">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
