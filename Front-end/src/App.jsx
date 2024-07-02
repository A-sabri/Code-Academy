// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import Courses from './components/Courses';
//import CourseDetails from './components/CourseDetails';
//import UserProfile from './components/UserProfile';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Courses />} />
            <Route path="/register" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

//<Route path="/courses/:id" element={<CourseDetails />} />
//<Route path="/profile" element={<UserProfile />} />