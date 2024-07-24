import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserById } from '../service/api';

import Avatar from './Avatar';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const token = localStorage.getItem('token');
  const isLoggedIn = !!localStorage.getItem('userId');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
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

  const checkAdminStatus = async () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const response = await getUserById(userId);
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
  };

  useEffect(() => {
    checkAdminStatus();
  }, []);

  return (
    <header className="relative z-50 w-full h-24">
      <div className="container flex items-center justify-between h-full max-w-6xl px-8 mx-auto xl:px-0">
        <Link to="/" className="relative flex items-center inline-block h-full font-black leading-none">
          <img src="/code-academy-logo.png" alt="Logo" className="w-20 h-20 rounded-full cursor-pointer" />
          <span className="ml-3 text-xl text-gray-800">Code Academy<span className="text-green-500">.</span></span>
        </Link>
        <nav id="nav" className="absolute top-0 left-0 z-50 flex flex-col items-center justify-between hidden w-full h-64 pt-5 mt-24 text-sm text-gray-800 bg-white border-t border-gray-200 md:w-auto md:flex-row md:h-24 lg:text-base md:bg-transparent md:mt-0 md:border-none md:py-0 md:flex md:relative">
          <Link to="/" className="ml-0 mr-0 font-bold duration-100 md:ml-12 md:mr-3 lg:mr-8 transition-color hover:text-indigo-600">
            Home
          </Link>
          <Link to="/courses" className="ml-0 mr-0 font-bold duration-100 md:ml-12 md:mr-3 lg:mr-8 transition-color hover:text-indigo-600">
            Courses
          </Link>
          {isLoggedIn && !isAdmin && (
            <>
              <Link to="/my-courses" className="ml-0 mr-0 font-bold duration-100 md:ml-12 md:mr-3 lg:mr-8 transition-color hover:text-indigo-600">
                My Courses
              </Link>
            </>
          )}
        </nav>
        <div className="flex items-center">
          <ul className="flex space-x-4 items-center">
            {token ? (
              <li className="relative flex items-center" ref={menuRef}>
                <Avatar size='w-16 h-16' onClick={toggleMenu} />
                {menuOpen && (
                  <div className="absolute right-0 mt-52 w-48 bg-white text-black rounded-md shadow-lg py-2">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-indigo-200">Profile</Link>
                    <Link to="/my-courses" className="block px-4 py-2 hover:bg-indigo-200">My Courses</Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 hover:bg-indigo-200"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className="w-full py-2 font-bold text-center text-pink-500">Log In</Link>
                </li>
                <li>
                  <Link to="/register" className="relative inline-block w-full px-5 py-3 text-sm leading-none text-center text-white bg-indigo-700 fold-bold">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      
    </header>
  );
};

export default Header;



