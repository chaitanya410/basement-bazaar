
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize dark mode based on user preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button 
      onClick={toggleDarkMode}
      className="relative flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-800"
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Sun className={`absolute transform transition-all duration-500 ${isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100 animate-mode-toggle'}`} size={18} />
      <Moon className={`absolute transform transition-all duration-500 ${isDarkMode ? 'opacity-100 rotate-0 scale-100 animate-mode-toggle' : 'opacity-0 -rotate-90 scale-0'}`} size={18} />
    </button>
  );
};

export default DarkModeToggle;
