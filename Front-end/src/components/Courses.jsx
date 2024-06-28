import React, { useEffect, useState } from 'react';
import { getAllCourses, addStudentToCourse } from '../service/api';
import Course from './Course';

const Courses = ({ studentId }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses()
    .then(response => setCourses(response.data))
    .catch(error => console.error('Error fetching courses:', error));
  }, []);

  /*
  const joinCourse = async (courseId) => {
    try {
      await addStudentToCourse(studentId, courseId);
      setCourses(prevCourses =>
        prevCourses.map(course =>
          course.id === courseId
            ? { ...course, nbOfStudent: course.nbOfStudent + 1 }
            : course
        )
      );
    } catch (error) {
      console.error('Error joining course:', error);
    }
  };
  */

  return (
    <div>
      {courses.map(course => (
        <Course key={course.id} course={course} /*joinCourse={joinCourse}*/ />
      ))}
    </div>
  );
};

export default Courses;