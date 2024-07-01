// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Courses from './components/Courses';
//import CourseDetails from './components/CourseDetails';
//import UserProfile from './components/UserProfile';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
};

export default App;

//<Route path="/courses/:id" element={<CourseDetails />} />
//<Route path="/profile" element={<UserProfile />} />