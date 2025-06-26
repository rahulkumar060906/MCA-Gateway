import React from 'react';

const Footer = () => {
  return (
    <footer className="footer w-full text-center py-4 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 mt-8 text-sm">
      <p>&copy; {new Date().getFullYear()} MCA Gateway. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
