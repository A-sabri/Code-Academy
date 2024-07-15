import React, { useState, useEffect } from 'react';
import { getAllCourses, getUserById } from '../service/api';
import CourseCard from './CourseCard';

const UserCourses = () => {
  const [userCourses, setUserCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    getUserById(userId)
    .then(response => {
      setUserCourses(response.data.courseIds);
    })
    .catch(error => console.error('Error fetching user courses:', error));
  
    getAllCourses()
    .then(response => {
      setAllCourses(response.data);
    })
      .catch(error => console.error('Error fetching all courses:', error));
  }, [userId]);

  const userCoursesData = allCourses.filter(course => userCourses.includes(course._id));

  return (
    <div className="grid grid-cols-1 gap-4 p-7 md:grid-cols-1">
      {userCoursesData.map(course => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default UserCourses;
