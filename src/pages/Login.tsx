
import React from 'react';
import Layout from '../components/Layout';
import AuthForm from '../components/AuthForm';
import AnimatedSection from '../components/AnimatedSection';
import Doodle from '../components/Doodle';

const Login: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-16 flex items-center relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-40 right-10 opacity-10 animate-float">
          <Doodle className="w-48 h-48 text-ngo-blue" />
        </div>
        <div className="absolute bottom-20 left-10 opacity-10 animate-float" style={{ animationDelay: '1s' }}>
          <Doodle className="w-32 h-32 text-ngo-blue" />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection className="hidden lg:block" animation="slide-in">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl font-bold mb-6">Welcome Back</h1>
                <p className="text-gray-600 mb-8 max-w-md">
                  Sign in to access exclusive member resources, event information, and connect with our community.
                </p>
                <div className="relative">
                  <div className="absolute inset-0 bg-ngo-blue/20 rounded-lg translate-x-4 translate-y-4"></div>
                  <div className="relative rounded-lg overflow-hidden shadow-xl">
                    <img 
                      src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto=format&fit=crop" 
                      alt="Team collaboration" 
                      className="w-full h-auto object-cover aspect-[4/3]"
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="scale-in">
              <AuthForm type="login" />
            </AnimatedSection>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
