import React, { useState, useEffect } from 'react';
import { FaGraduationCap, FaHome, FaInfoCircle, FaEnvelope, FaBell } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import LoginSignup from '../pages/LoginSignup';
const Navbar = () => {
  const [theme, setTheme] = useState('light');
  const [menuOpen, setMenuOpen] = useState(false);
  const isLoggedIn = false; // replace with actual auth logic
  const [showLoginModal, setShowLoginModal] = useState(false);
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  const handleMenuToggle = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="w-full px-4 py-3 min-h-[10vh] bg-white dark:bg-blue-950 border-b-2 border-b-gray-200 dark:border-b-blue-900 shadow-md flex items-center justify-between no-print relative z-50">

      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <FaGraduationCap className="text-2xl text-blue-600 dark:text-blue-400" />
        <span className="text-xl font-bold text-gray-800 dark:text-white">MCA Gateway</span>
      </div>

      {/* Center: Navigation (desktop only) */}
      <ul className="hidden md:flex gap-6 items-center text-gray-700 dark:text-gray-200">
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

      {/* Right: Buttons (desktop only) */}
      <div className="hidden md:flex items-center gap-3">
        {isLoggedIn ? (
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
        ) : (
          <button
            onClick={() => {
              setMenuOpen(false);
              setShowLoginModal(true);
            }}
            className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 transition-colors"
          >
            Login
          </button>
        )}
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
      <div className="md:hidden flex items-center gap-3">
        {isLoggedIn ? (
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
        ) : (
          <button
            onClick={() => {
              setMenuOpen(false);
              setShowLoginModal(true);
            }}
            className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-900 transition-colors"
          >
            Login
          </button>
        )}
      </div>

      {/* LoginSignup Modal */}
      {!isLoggedIn && showLoginModal && (
        <LoginSignup onClose={() => setShowLoginModal(false)} />
      )}
      {/* Mobile: Hamburger icon */}
      <button
        className="md:hidden text-3xl text-blue-700 dark:text-blue-300 focus:outline-none"
        onClick={handleMenuToggle}
        aria-label="Toggle menu"
      >
        {menuOpen ? <HiX /> : <HiMenu />}
      </button>

      {/* Mobile: Full dropdown menu */}
      {menuOpen && (
        <ul className="absolute top-full left-0 right-0 bg-white dark:bg-blue-950 flex flex-col items-center gap-4 text-gray-700 dark:text-gray-200 py-4 shadow-md rounded-b-xl md:hidden z-40">
          <li>
            <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <FaHome /> Home
            </Link>
          </li>
          <li>
            <Link to="/notice" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <FaBell /> Notice
            </Link>
          </li>
          <li>
            <Link to="/about" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <FaInfoCircle /> About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <FaEnvelope /> Contact
            </Link>
          </li>

          <li>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
