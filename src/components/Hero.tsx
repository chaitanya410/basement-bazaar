
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Doodle from './Doodle';

const Hero: React.FC = () => {
  const circleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!circleRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = circleRef.current.getBoundingClientRect();
      
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      
      const deltaX = (clientX - centerX) / 50;
      const deltaY = (clientY - centerY) / 50;
      
      circleRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative pt-24 pb-40 overflow-hidden">
      {/* Background circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div 
          ref={circleRef}
          className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-ngo-blue/20 blur-3xl"
        />
        <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-ngo-blue/10 blur-3xl animate-spin-slow" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 hero-text-glow animate-fade-in">
              Transforming Communities in <span className="text-ngo-blue">Wardha</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Join us in our mission to empower, educate, and enhance lives through social innovation and community engagement.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/welcome" className="btn-ngo">
                Explore Our Events
              </Link>
              <Link to="/recruitment" className="btn-ngo-outline">
                Become a Member
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/2 mt-12 lg:mt-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="relative">
              <div className="absolute inset-0 bg-ngo-blue/20 rounded-lg translate-x-4 translate-y-4"></div>
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=2070&auto=format&fit=crop" 
                  alt="Community gathering" 
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
              <Doodle className="absolute -bottom-10 -right-10 w-32 h-32 text-ngo-blue" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
