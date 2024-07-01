// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-lg font-bold">
          <Link to="/">
            <img src="/Code-Academy.jpg" alt="Logo" className="h-8" />
          </Link>
        </div>
        <nav className="flex space-x-4">
          <Link to="/signup" className="hover:text-gray-400">
            Sign Up
          </Link>
          <Link to="/login" className="hover:text-gray-400">
            Log In
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
