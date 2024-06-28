import React, { useEffect, useState } from 'react';
import { getAllUsers, addStudentToCourse } from '../service/api';

const Course = ({ course }) => {

    const [studentList, setStudentList] = useState(false);
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const studentIds = course.studentIds;

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
        console.log(courses);
    };


    const toggleStudentList = () => {
    setStudentList(!studentList);
    };

    useEffect(() => {
        getAllUsers()
        .then(response => setUsers(response.data))
        .catch(error => console.error('Error fetching students:', error));
    }, []);

    
    let studentInCourse = users.filter(user => studentIds.includes(user.id));
    
  return (
    <div className="card mb-3">
      <div className="card-body">
            <h5 className="card-title">{course.name}</h5>
            <p className="card-text">{course.description}</p>
            <div className="d-flex justify-content-between align-items-center">
            <span>Number of students: {course.nbOfStudent}</span>
            <button className="btn btn-primary" onClick={() => joinCourse(course.id)}>Join</button>
            </div>
            <button className="btn btn-link" onClick={toggleStudentList}>
                Student List
            </button>
            {studentList && (
                <div className="student-list">
                    <ul>
                        {studentInCourse.map(student => (
                            <li key={student.id}>
                                {student.firstName} {student.lastName}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </div>
    
  );
};

export default Course;