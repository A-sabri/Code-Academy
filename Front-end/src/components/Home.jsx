import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative w-full h-full bg-white">
      <div className="relative items-center w-full px-5 py-12 mx-auto lg:px-20 max-w-7xl">
        <div className="flex w-full mx-auto text-left">
          <div className="relative inline-flex items-center mx-auto align-middle">
            <div className="text-center">
              <h1 className="max-w-5xl text-4xl font-bold leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-6xl lg:max-w-7xl">
                Welcome to Code Academy
              </h1>
              <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-gray-500">
                Code Academy is an online coding school dedicated to providing high-quality education in software development. Our mission is to empower individuals by teaching them the skills needed to thrive in the tech industry.
              </p>
              <div className="flex justify-center w-full max-w-2xl gap-2 mx-auto mt-6">
                <Link to="/register" className="relative inline-flex items-center justify-center w-full px-8 py-3 text-base font-bold leading-6 text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 md:w-auto">
                  Get Started
                </Link>
                <Link to="/courses" className="relative inline-flex items-center justify-center w-full px-8 py-3 text-base font-bold leading-6 text-indigo-600 bg-white border border-indigo-600 rounded-md hover:bg-gray-100 md:w-auto">
                  View Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mx-auto mt-20 text-center">
          <h2 className="text-3xl font-bold leading-tight text-gray-800">
            Why Choose Code Academy?
          </h2>
          <div className="flex flex-col items-center justify-center w-full mt-10 lg:flex-row">
            <div className="flex flex-col items-center w-full max-w-xs p-6 mx-auto mb-10 bg-white rounded-lg shadow lg:mb-0">
              <img src="https://via.placeholder.com/150" alt="High Quality Curriculum" className="mb-4"/>
              <h3 className="text-xl font-semibold">High Quality Curriculum</h3>
              <p className="mt-2 text-base leading-relaxed text-gray-500">
                Our curriculum is designed by industry experts and is constantly updated to meet the latest standards.
              </p>
            </div>
            <div className="flex flex-col items-center w-full max-w-xs p-6 mx-auto mb-10 bg-white rounded-lg shadow lg:mb-0">
              <img src="https://via.placeholder.com/150" alt="Expert Instructors" className="mb-4"/>
              <h3 className="text-xl font-semibold">Expert Instructors</h3>
              <p className="mt-2 text-base leading-relaxed text-gray-500">
                Learn from experienced instructors who are passionate about teaching and helping you succeed.
              </p>
            </div>
            <div className="flex flex-col items-center w-full max-w-xs p-6 mx-auto bg-white rounded-lg shadow">
              <img src="https://via.placeholder.com/150" alt="Flexible Learning" className="mb-4"/>
              <h3 className="text-xl font-semibold">Flexible Learning</h3>
              <p className="mt-2 text-base leading-relaxed text-gray-500">
                Study at your own pace with our flexible online courses, accessible anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
