import React, { useEffect, useState } from 'react';
import { getAllUsers, addStudentToCourse, removeStudentFromCourse } from '../service/api';

const Course = ({ course }) => {

    const [toggleList, setToggleList] = useState(false);
    const [users, setUsers] = useState([]);
    const [updatedCourse, setUpdatedCourse] = useState(course);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState(''); // 'success' or 'error'

    
    const studentId = localStorage.getItem('userId');

    
    const joinCourse = (courseId) => {
        addStudentToCourse(studentId, courseId)
        .then(() => {    
            setUpdatedCourse(prevCourse => ({
                ...prevCourse,
                studentIds: [...prevCourse.studentIds, studentId],
                nbOfStudent: prevCourse.nbOfStudent + 1
            }));

            setModalMessage('Successfully joined the course!');
            setModalType('success');
            setModalIsOpen(true);
        })
        .catch(error => {    
            console.error('Error joining course:', error);
            setModalMessage('Failed to join the course.');
            setModalType('error');
            setModalIsOpen(true);
        });
    };

    const leaveCourse = async (courseId) => {
        try {
            await removeStudentFromCourse(studentId, courseId);

            // Mise à jour du nombre d'étudiants localement
            setUpdatedCourse(prevCourse => ({
                ...prevCourse,
                studentIds: prevCourse.studentIds.filter(id => id !== studentId),
                nbOfStudent: prevCourse.nbOfStudent - 1
            }));

            setModalMessage('Successfully left the course!');
            setModalType('success');
            setModalIsOpen(true);
        } catch (error) {
            console.error('Error leaving course:', error);
            setModalMessage('Failed to leave the course.');
            setModalType('error');
            setModalIsOpen(true);
        }
    };


    const toggleStudentList = () => {
        setToggleList(!toggleList);
        getUsers();
    };
    
    const getUsers = async () => {
        getAllUsers()
        .then(response => setUsers(response.data))
        .catch(error => console.error('Error fetching students:', error));
    };

    const studentInCourse = updatedCourse.studentIds;
    let studentList = users.filter(user => studentInCourse.includes(user._id));
    const isUserEnrolled = studentInCourse.includes(studentId);
    
    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="mb-3 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
                <h5 className="text-lg font-bold mb-2">{course.name}</h5>
                <p className="text-gray-700 mb-4">{course.description}</p>
                <div className="flex justify-between items-center mb-4">
                    <span>Number of students: {updatedCourse.nbOfStudent}</span>
                    {isUserEnrolled ? (
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={() => leaveCourse(updatedCourse._id)}
                        >
                            Leave
                        </button>
                    ) : (
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={() => joinCourse(updatedCourse._id)}
                        >
                            Join
                        </button>
                    )}
                </div>
                <button 
                    className="text-blue-500 hover:underline mb-4"
                    onClick={toggleStudentList}
                    >
                    Student List
                </button>
                {toggleList && (
                    <div className="student-list">
                        <ul>
                            {studentList.map(student => (
                                <li key={student._id}>
                                    {student.name} 
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            
            

            {/* Modal */}
            {modalIsOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-black bg-opacity-50 absolute inset-0"></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg z-10">
                        <h2 className="text-2xl mb-4">{modalType === 'success' ? 'Success' : 'Error'}</h2>
                        <div>{modalMessage}</div>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Course;
