
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Doodle from './Doodle';
import { supabase } from "@/integrations/supabase/client";

interface AuthFormProps {
  type: 'login' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (type === 'signup' && formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        setIsLoading(false);
        return;
      }
      
      if (type === 'login') {
        // Login user
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        
        if (error) throw error;
        
        toast.success('Login successful!');
        navigate('/'); // Redirect to home page after login
      } else {
        // Signup user
        const { data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name,
            }
          }
        });
        
        if (error) throw error;
        
        toast.success('Account created successfully!');
        navigate('/'); // Redirect to home page after signup
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      toast.error(error.message || 'An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-md w-full mx-auto">
      <div className="bg-ngo-blue/20 py-6 px-8 relative">
        <h2 className="text-2xl font-bold font-display text-center">
          {type === 'login' ? 'Welcome Back' : 'Join Our Community'}
        </h2>
        <Doodle className="absolute -bottom-6 -right-6 w-20 h-20 text-ngo-blue opacity-50" />
      </div>
      
      <form onSubmit={handleSubmit} className="py-8 px-8 space-y-6">
        {type === 'signup' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ngo-blue focus:border-transparent transition-all"
              placeholder="Enter your name"
            />
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ngo-blue focus:border-transparent transition-all"
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ngo-blue focus:border-transparent transition-all"
            placeholder="Enter your password"
          />
        </div>
        
        {type === 'signup' && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ngo-blue focus:border-transparent transition-all"
              placeholder="Confirm your password"
            />
          </div>
        )}
        
        <button
          type="submit"
          className="w-full btn-ngo py-3"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : (type === 'login' ? 'Sign In' : 'Create Account')}
        </button>
        
        <div className="text-center mt-4 text-sm">
          {type === 'login' ? (
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="text-ngo-blue hover:underline">
                Sign up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <Link to="/login" className="text-ngo-blue hover:underline">
                Log in
              </Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
