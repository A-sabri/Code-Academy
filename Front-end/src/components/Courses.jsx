import React, { useEffect, useState } from 'react';
import { getAllCourses } from '../service/api';
import Course from './Course';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses()
    .then(response => setCourses(response.data))
    .catch(error => console.error('Error fetching courses:', error));
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default Courses;
