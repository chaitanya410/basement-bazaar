
import React from 'react';

interface DoodleProps {
  className?: string;
}

const Doodle: React.FC<DoodleProps> = ({ className = '' }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M20,50 C20,35 35,20 50,20 C65,20 80,35 80,50 C80,65 65,80 50,80 C35,80 20,65 20,50 Z" 
        className="doodle-path"
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      <path 
        d="M30,50 C30,40 40,30 50,30 C60,30 70,40 70,50 C70,60 60,70 50,70 C40,70 30,60 30,50 Z" 
        className="doodle-path"
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
        style={{ animationDelay: '0.3s' }}
      />
      <path 
        d="M40,50 C40,45 45,40 50,40 C55,40 60,45 60,50 C60,55 55,60 50,60 C45,60 40,55 40,50 Z" 
        className="doodle-path"
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
        style={{ animationDelay: '0.6s' }}
      />
      <circle 
        cx="50" 
        cy="50" 
        r="3" 
        className="doodle-path"
        fill="currentColor"
        style={{ animationDelay: '0.9s' }}
      />
    </svg>
  );
};

export default Doodle;
