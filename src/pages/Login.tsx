
import React from 'react';
import Layout from '../components/Layout';
import AuthForm from '../components/AuthForm';
import AnimatedSection from '../components/AnimatedSection';

const Login: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-md mx-auto">
          <AnimatedSection animation="slide-up" delay={0.1}>
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Welcome Back</h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
              Log in to your Basements Social Forum account
            </p>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-in" delay={0.3}>
            <AuthForm 
              type="login"
              onSubmit={(data) => console.log('Login data:', data)}
            />
          </AnimatedSection>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
