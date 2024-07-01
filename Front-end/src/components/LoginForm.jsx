// src/components/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../service/api';


const LoginForm = () => {
  const [formData, setFormData] = useState({
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
      const response = await login(formData);

      if (response.status === 200) {
        localStorage.setItem('token',response.data.token);
        localStorage.setItem('userId',response.data.userId);
        navigate('/');
      } else {
        console.error('Failed to log in');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Log In</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
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
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
