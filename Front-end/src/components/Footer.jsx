// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white p-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-col">
          <span className="font-bold text-lg">Code-Academy</span>
          <span>&copy; 2024 All rights reserved.</span>
        </div>
        <div className="flex space-x-4">
          <Link to="/" className="hover:underline">About</Link>
          <Link to="/" className="hover:underline">Contact</Link>
          <Link to="/" className="hover:underline">Privacy Policy</Link>
          <Link to="/" className="hover:underline">Terms of Service</Link>
        </div>
        <div className="flex space-x-4">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            <img src="/facebook.png" alt="Facebook" className="w-6 h-6" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            <img src="/twitter.png" alt="Twitter" className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
            <img src="/linkedin.png" alt="LinkedIn" className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
