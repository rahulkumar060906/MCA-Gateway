import React from 'react';
import { useState, useEffect } from 'react';
import { FaGraduationCap, FaHome, FaInfoCircle, FaEnvelope, FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [theme, setTheme] = useState('light');
  const isLoggedIn = true;
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav className="w-full px-4 py-3 min-h-[10vh] bg-white dark:bg-blue-950 border-b-2 border-b-gray-200 dark:border-b-blue-900 shadow-md flex flex-col justify-around md:flex-row md:items-center md:justify-between">
      {/* Logo */}
      <div className="flex items-center justify-between md:justify-start gap-2">
        <div className="flex items-center gap-2">
          <FaGraduationCap className="text-2xl text-blue-600 dark:text-blue-400" />
          <span className="text-xl font-bold text-gray-800 dark:text-white">MCA Gateway</span>
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="flex flex-col md:flex-row gap-4 md:gap-6 mt-4 md:mt-0 text-gray-700 dark:text-gray-200 items-center">
        <li>
          <Link to="/" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/notice" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <FaBell /> Notice
          </Link>
        </li>
        <li>
          <Link to="/about" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <FaInfoCircle /> About
          </Link>
        </li>
        <li>
          <Link to="/contact" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            <FaEnvelope /> Contact
          </Link>
        </li>
      </ul>
      <div className='flex items-center gap-3 justify-between mt-4 md:mt-0'>

        <Link
          to={isLoggedIn ? "/dashboard" : "/login"}
          className="mt-4 md:mt-0 ml-0 md:ml-4 px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 transition-colors"
        >
          {isLoggedIn ? "Dashboard" : "Login"}
        </Link>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </nav>
  );
};

export default Navbar;


