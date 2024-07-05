import React, { useEffect, useState } from 'react';
import { getAllCourses } from '../service/api';
import CourseCard from './CourseCard';

const CoursesDisplay = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses()
    .then(response => setCourses(response.data))
    .catch(error => console.error('Error fetching courses:', error));
  }, []);

  return (
    <div className="bg-stone-50 grid grid-cols-1 gap-4 p-7 md:grid-cols-2 lg:grid-cols-3">
      {courses.map(course => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default CoursesDisplay;
