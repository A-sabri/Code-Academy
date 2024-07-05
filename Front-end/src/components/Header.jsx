/*
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserById } from '../service/api';
import Avatar from './Avatar';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const token = localStorage.getItem('token');
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gradient-to-b from-blue-500 text-white p-4 flex justify-between items-center relative z-50">
      <div className="text-lg font-bold">
        <Link to="/">
          <img src="/code-academy-logo.png" alt="Logo" className="w-20 h-20 rounded-full cursor-pointer" />
        </Link>
      </div>
      <nav>
        <ul className="flex space-x-4 items-center">
          {token ? (
            <li className="relative flex items-center" ref={menuRef}>
              <Avatar size = 'w-16 h-16' onClick={toggleMenu}/>
              {menuOpen && (
                <div className="absolute right-0  mt-60 w-48 bg-white text-black rounded-md shadow-lg py-2">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                  <Link to="/courses" className="block px-4 py-2 hover:bg-gray-200">Courses</Link>
                  <button 
                    onClick={handleLogout} 
                    className="w-full text-left block px-4 py-2 hover:bg-gray-200"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </li>
          ) : (
            <>
              <li>
                <Link to="/register" className="bg-green-500 px-4 py-2 rounded hover:bg-green-700">Sign Up</Link>
              </li>
              <li>
                <Link to="/login" className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-900">Log In</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
*/

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from './Avatar';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-gradient-to-b from-blue-500 text-black p-4 flex justify-between items-center relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img src="/code-academy-logo.png" alt="Logo" className="w-20 h-20 rounded-full cursor-pointer" />
          </Link>
        </div>
        <nav className="flex-grow text-center">
          <ul className="flex justify-center space-x-8">
            <li>
              <Link to="/" className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-gray-400">
                  Profile
              </Link>
            </li>
            <li>
              <Link to="/my-courses" className="hover:text-gray-400">
                My Courses
              </Link>
            </li>
          </ul>
        </nav>
        <nav>
          <ul className="flex space-x-4 items-center">
            {token ? (
              <li className="relative flex items-center" ref={menuRef}>
                <Avatar size = 'w-16 h-16' onClick={toggleMenu}/>
                {menuOpen && (
                  <div className="absolute right-0  mt-60 w-48 bg-white text-black rounded-md shadow-lg py-2">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                    <Link to="/courses" className="block px-4 py-2 hover:bg-gray-200">Courses</Link>
                    <button 
                      onClick={handleLogout} 
                      className="w-full text-left block px-4 py-2 hover:bg-gray-200"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </li>
              ) : (
              <>
              <li>
                <Link to="/register" className="bg-green-500 px-4 py-2 rounded hover:bg-green-700">Sign Up</Link>
              </li>
              <li>
                <Link to="/login" className="bg-blue-700 px-4 py-2 rounded hover:bg-blue-900">Log In</Link>
              </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

