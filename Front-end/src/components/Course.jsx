import React, { useEffect, useState } from 'react';
import { getAllUsers, addStudentToCourse } from '../service/api';

const Course = ({ course }) => {

    const [studentList, setStudentList] = useState(false);
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    
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

    const toggleStudentList = () => {
        setStudentList(!studentList);
        getUsers();
    };
    
    const getUsers = async () => {
        getAllUsers()
        .then(response => setUsers(response.data))
        .catch(error => console.error('Error fetching students:', error));
    };

    const studentIds = course.studentIds;
    let studentInCourse = users.filter(user => studentIds.includes(user.id));
    
    return (
        <div className="mb-3 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
                <h5 className="text-lg font-bold mb-2">{course.name}</h5>
                <p className="text-gray-700 mb-4">{course.description}</p>
                <div className="flex justify-between items-center mb-4">
                    <span>Number of students: {course.nbOfStudent}</span>
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => joinCourse(course.id)}
                    >
                        Join
                    </button>
                </div>
                <button 
                    className="text-blue-500 hover:underline mb-4"
                    onClick={toggleStudentList}
                >
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
