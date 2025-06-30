import React from 'react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-8 border-t border-gray-300 dark:border-gray-700 min-h-[20vh] no-print">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo & Tagline */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">MCA Gateway</h2>
          <p className="text-sm">Empowering NIMCET Aspirants Across India</p>
        </div>

        {/* Social Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="hover:text-blue-600">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="hover:text-blue-600">
            <FaLinkedin size={20} />
          </a>
          <a href="https://instagram.com/yourusername" target="_blank" rel="noreferrer" className="hover:text-pink-500">
            <FaInstagram size={20} />
          </a>
        </div>

        {/* Footer Links */}
        <div className="text-center md:text-right">
          <ul className="text-sm space-y-1">
            <li><a href="/privacy-policy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
            <li><a href="/newsletter" className="hover:underline">Newsletter Signup</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-6 text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} MCA Gateway. All rights reserved.
      </div>
    </footer>
  );
}
