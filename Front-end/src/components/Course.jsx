import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAllUsers, addStudentToCourse, removeStudentFromCourse, getCourseById } from '../service/api';


const Course = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [toggleList, setToggleList] = useState(false);
    const [studentList, setStudentList] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState(''); 
    
    const studentId = localStorage.getItem('userId');
    
    useEffect(() => {
        getCourseById(courseId)
        .then(response => {
            setStudentList(response.data.studentIds);
            setCourse(response.data);
        })  
        .catch(error => console.error('Error fetching course', error));
    }, [courseId]);

    console.log(studentList);

    const joinCourse = () => {
        addStudentToCourse(studentId, courseId)
            .then(() => {
                setStudentList(prevIds => [...prevIds, studentId]);
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

    const leaveCourse = async () => {
        try {
            await removeStudentFromCourse(studentId, courseId);
            setStudentList(prevIds => prevIds.filter(id => id !== studentId));
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
    };

    let isUserEnrolled = studentList.includes(studentId);
    
    const closeModal = () => {
        setModalIsOpen(false);
    };

    if (!course) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto my-8 p-4 bg-white shadow-md rounded-lg">
            <div className="flex flex-col items-center">
                <img src="/Code-Academy.jpg" alt="Course" className="w-full h-64 object-cover rounded-lg" />
                <h1 className="text-3xl font-bold mt-4">{course.name}</h1>
            </div>
            <div className="flex mt-8">
                <div className="w-2/3 pr-4">
                    <h2 className="text-2xl font-semibold mb-4">Description</h2>
                    <p className="text-gray-700">{course.description}</p>
                </div>
                <div className="w-1/3 pl-4">
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                        {isUserEnrolled ? (
                            <button
                                className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600 mb-4"
                                onClick={leaveCourse}
                            >
                                Leave
                            </button>
                        ) : (
                            <button
                                className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 mb-4"
                                onClick={joinCourse}
                            >
                                Join
                            </button>
                        )}
                        <p className="mb-4">Number of students: {studentList.length}</p>
                        <button 
                            className="text-blue-500 hover:underline"
                            onClick={toggleStudentList}
                        >
                            Student List
                        </button>
                        {toggleList && (
                            <div className="student-list mt-4">
                                <ul>
                                    {studentList.map(student => (
                                        <li key={student._id} className="flex items-center mb-2">
                                            
                                            <span className="ml-2">{student.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
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

