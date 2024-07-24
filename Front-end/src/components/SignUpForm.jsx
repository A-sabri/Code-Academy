// src/components/SignUpForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../service/api';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);

      if (response.status === 201) {
        navigate('/login');
      } else {
        console.error('Failed to sign up');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto m-20">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-center items-center">
          <img src="/code-academy.svg" alt="Logo" className="w-28 h-28 rounded-full cursor-pointer" />
        </div>
        <h2 className="text-2xl font-bold mb-5">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700">
          Sign Up
        </button>
        <p className="mt-10 text-center text-sm text-gray-500">
          vous avez deja un compte ?<br />
          <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">connectez vous</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
