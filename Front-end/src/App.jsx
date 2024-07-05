// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import CoursesDisplay from './components/CoursesDisplay';
import Course from './components/Course';
import UserProfile from './components/UserProfile';
import UserCourses from './components/UserCourses';




const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<CoursesDisplay />} />
            <Route path="/register" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/courses/:courseId" element={<Course />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/my-courses" element={<UserCourses />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
