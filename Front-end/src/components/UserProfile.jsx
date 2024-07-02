// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import { getUserById, getAllCourses } from '../service/api'; // Assurez-vous que le chemin est correct
import Avatar from './Avatar';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const userId = localStorage.getItem('userId');

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

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4">
          <Avatar size = 'w-20 h-20'/>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold">My Courses</h3>
          <ul className="mt-4">
            {courses.map(course => (
              <li key={course.id} className="border-b py-2">
                <div className="flex justify-between">
                  <span className="text-lg">{course.title}</span>
                  <span className="text-gray-600">{course.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
