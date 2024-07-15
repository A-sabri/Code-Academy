import React, { useState } from 'react';
import { getAllUsers, addStudentToCourse, removeStudentFromCourse, updateCourse, deleteCourse } from '../service/api';
import Avatar from './Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const CourseCard = ({ course, isAdmin, fetchCourses }) => {

    const [toggleList, setToggleList] = useState(false);
    const [users, setUsers] = useState([]);
    const [updatedCourse, setUpdatedCourse] = useState(course);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editedCourse, setEditedCourse] = useState({ ...course });

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
 
    const closeModal = () => {
        setModalIsOpen(false);
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
    
    const handleUpdateCourse = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', editedCourse.name);
        formData.append('description', editedCourse.description);
        if (editedCourse.image) {
            formData.append('image', editedCourse.image);
        }
        updateCourse(course._id, formData)
        .then(() => {
            setUpdatedCourse({ ...updatedCourse, ...editedCourse });
            setEditMode(false);
            fetchCourses(); 
        })
        .catch((error) => {
                console.error('Error updating course:', error);
        });
    };
     
    const handleDeleteCourse = () => {
        deleteCourse(course._id)
        .then(() => {
            fetchCourses(); 
        })
        .catch((error) => {
            console.error('Error deleting course:', error);
        });
    };

    return (
        <div className="m-5 bg-stone-50 shadow-lg rounded-lg overflow-hidden p-1.5 relative">
            <div className="flex flex-col items-center">
                <img src={course.image} alt="Course" className="w-full h-40 object-cover border border-gray-300 rounded-lg" />
                <h5 className="text-lg font-bold mb-2">{course.name}</h5>
            </div>
            <div className="flex mt-8 p-1.5">
                <div className="w-2/3 pr-4">
                    <h2 className="text-2xl font-semibold mb-4">Description</h2>
                    <p className="text-gray-700">{course.description}</p>
                </div>
                <div className="w-1/3 pl-4">
                    <div className="bg-gray-100 p-4 rounded-lg shadow">
                        {isUserEnrolled ? (
                            <button
                                className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600 hover:scale-105 transition-transform duration-200 mb-4"
                                onClick={() => leaveCourse(course._id)}
                            >
                                Leave
                            </button>
                        ) : (
                            <button
                                className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 hover:scale-105 transition-transform duration-200 mb-4"
                                onClick={() => joinCourse(course._id)}
                            >
                                Join
                            </button>
                        )}
                        <p className="mb-4">Number of students: {updatedCourse.nbOfStudent}</p>
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
                                            <Avatar size = 'w-10 h-10' userId={student._id} />
                                            <span className="ml-2">{student.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isAdmin && (
                <div className="absolute top-2 right-2 flex flex-col space-y-2">
                    <button
                        className="text-gray-500 hover:text-green-700 hover:scale-125 transition-transform duration-200"
                        onClick={() => setEditMode(true)}
                    >
                    <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                        className="text-gray-500 hover:text-red-700 hover:scale-125 transition-transform duration-200"
                        onClick={handleDeleteCourse}
                    >
                    <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            )}
            {editMode && (
                <div className="mt-4">
                    <input
                        type="text"
                        value={editedCourse.name}
                        onChange={(e) => setEditedCourse({ ...editedCourse, name: e.target.value })}
                        className="border p-2 mb-4 w-full "
                        placeholder="Course Name"
                    />
                    <textarea
                        value={editedCourse.description}
                        onChange={(e) => setEditedCourse({ ...editedCourse, description: e.target.value })}
                        className="border p-2 mb-4 w-full"
                        placeholder="Course Description"
                    />
                    <input
                        type="file"
                        onChange={(e) => setEditedCourse({ ...editedCourse, image: e.target.files[0] })}
                        className="border p-2 mb-4 w-full"
                    />
                    <button
                        className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
                        onClick={handleUpdateCourse}
                    >
                    Save
                    </button>
                </div>
            )}

            
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

export default CourseCard;


