// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import { getUserById, getAllCourses } from '../service/api'; // Assurez-vous que le chemin est correct
import Avatar from './Avatar';

const UserProfile = () => {
  const [toggleList, setToggleList] = useState(false);
  const [user, setUser] = useState([]);
  const [courses, setCourses] = useState([]);
  const userId = localStorage.getItem('userId');

  const toggleCoursesList = () => {
    setToggleList(!toggleList);
    
};

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await getUserById(userId);
        setUser(userResponse.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const coursesResponse = await getAllCourses();
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchUserData();
    fetchCourses();
  }, [userId]);

  const userCoursesIds = user.courseIds;
  const userCourses = courses.filter(course => userCoursesIds.includes(course._id));
    

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4">
          <Avatar size = 'w-48 h-48'/>
          <div>
            <h2 className="text-4xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="mt-6">
          <button 
            className="text-2xl text-blue-500 hover:underline mb-4"
            onClick={toggleCoursesList}
          >
            My Courses
          </button>
          <ul className="mt-4">
            {toggleList && (
              <div className="course-list">
                <ul>
                  {userCourses.map(course => (
                    <li key={course._id}>
                      {course.name} 
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </ul>
        </div>
      </div>
  </div>
);
};

export default UserProfile;
