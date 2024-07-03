// src/components/Header.js
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
  
  /*
  useEffect(() => {
    const fetchUser = async () => {

      if (token && userId) {
        try {
          const response = await getUserById(userId);
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user data:', error);
        }
      }
    };

    fetchUser();
  }, []);
  */
  

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link to="/">
          <img src="/Code-Academy.jpg" alt="Logo" className="w-20 h-20 rounded-full cursor-pointer" />
        </Link>
      </div>
      <nav>
        <ul className="flex space-x-4 items-center">
          {token ? (
            <li className="relative flex items-center" ref={menuRef}>
              <Avatar onClick={toggleMenu}/>
              {menuOpen && (
                <div className="absolute right-0 mt-44 w-48 bg-white text-black rounded-md shadow-lg py-2">
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
