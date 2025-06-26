import React from 'react';
import sun from '../assets/sun.png';
import moon from '../assets/moon.png';
const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle  bg-gray-200 dark:bg-gray-700 rounded-full p-2 shadow hover:scale-110 transition"
      aria-label="Toggle dark/light mode"
    >
      {theme === 'dark' ? (
        <img src={moon} width="28" alt="moon" className="block" />
      ) : (
        <img src={sun} width="28" alt="sun" className="block" />
      )}
    </button>
  );
};

export default ThemeToggle;
