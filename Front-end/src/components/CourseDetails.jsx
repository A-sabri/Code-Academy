import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllUsers, addStudentToCourse, removeStudentFromCourse, updateCourse, deleteCourse } from '../service/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faClock, faUserGraduate, faUnlock, faMessage } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from 'react-tooltip';

const CourseDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { course, isAdmin } = location.state;

    const [updatedCourse, setUpdatedCourse] = useState(course);
    const [toggleList, setToggleList] = useState(false);
    const [users, setUsers] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editedCourse, setEditedCourse] = useState({ ...course });
    const [confirmDeleteMode, setConfirmDeleteMode] = useState(false);

    const studentId = localStorage.getItem('userId');

    useEffect(() => {
        if (toggleList) {
            getAllUsers()
                .then(response => setUsers(response.data))
                .catch(error => console.error('Error fetching students:', error));
        }
    }, [toggleList]);

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
                navigate('/courses');

            })
            .catch((error) => {
                console.error('Error updating course:', error);
            });
    };

    const handleDeleteCourse = () => {
        deleteCourse(course._id)
            .then(() => {
                navigate('/courses');
            })
            .catch((error) => {
                console.error('Error deleting course:', error);
            });
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const closeConfirmDeleteModal = () => {
        setConfirmDeleteMode(false);
    };

    const studentInCourse = updatedCourse.studentIds;
    const studentList = users.filter(user => studentInCourse.includes(user._id));
    const isUserEnrolled = studentInCourse.includes(studentId);

    return (
        <div className="m-10 p-1.5">
            <div className="flex flex-col items-center">
                <img src={course.image} alt="Course" className="w-full h-64 border border-gray-300" />
                <h1 className="text-lg font-bold mb-2">{course.name}</h1>
            </div>
            <div className="flex mt-8 p-1.5">
                <div className="w-2/3 pr-4">
                    <p className="text-gray-700">{course.description}</p><br />
                    <div className="mb-6 space-y-3">
                        <p className="text-sm md:text-base font-bold">Course includes:</p>
                        <div className="space-y-2">
                            <div className="space-x-4 flex items-center">
                                <div className="text-accent">
                                    <FontAwesomeIcon icon={faClock} />
                                </div>
                                <p className="text-gray-primary text-sm md:text-base font-light">04:00:00</p>
                            </div>
                            <div className="space-x-4 flex items-center">
                                <div className="text-accent">
                                    <FontAwesomeIcon icon={faUserGraduate} />
                                </div>
                                <p className="text-gray-primary text-sm md:text-base font-light">Certification Upon Completion</p>
                            </div>
                            <div className="space-x-4 flex items-center">
                                <div className="text-accent">
                                    <FontAwesomeIcon icon={faUnlock} />
                                </div>
                                <p className="text-gray-primary text-sm md:text-base font-light">Lifetime Course Access</p>
                            </div>
                            <div className="space-x-4 flex items-center">
                                <div className="text-accent">
                                    <FontAwesomeIcon icon={faMessage} />
                                </div>
                                <p className="text-gray-primary text-sm md:text-base font-light">Access to Group Chat</p>
                            </div>
                        </div>
                    </div>

                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus, similique. Laboriosam blanditiis totam vitae architecto cumque fuga iure et, harum suscipit omnis quod? Consectetur unde nihil distinctio fugiat officiis aut. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam sunt tempore sint, earum, repudiandae aspernatur numquam quidem impedit officia cumque eligendi fuga ducimus eveniet ullam voluptatem aut soluta sapiente non!</p><br />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus enim earum nemo error eos quae. Ullam blanditiis aliquam eveniet laudantium, magnam suscipit voluptatibus! Officiis enim laborum alias ipsam odit. Odit? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus earum error, omnis laborum veniam vitae cum itaque tempore odio animi nobis? Officiis, quo! Assumenda voluptates maiores architecto accusantium repellendus dolor!</p><br />
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perferendis in magnam aliquid, voluptate, corporis unde sint quasi ratione, mollitia inventore dolor harum eius quia quisquam rem minus facere aliquam. Nemo.</p>
                    
                    {(isUserEnrolled || isAdmin) && (
                        <div className="mt-10 p-4 bg-gray-100 rounded-lg shadow">
                            <h2 className="text-lg font-bold mb-2">Lessons</h2>
                            <ul>
                                <li className="mb-2">
                                    <a
                                        href="#"
                                        className="text-blue-500 hover:underline"
                                        onClick={() => window.location.href = 'https://www.youtube.com/watch?v=xvFZjo5PgG0'}
                                    >
                                        Chapitre 1: Introduction
                                    </a>
                                </li>
                            </ul>
                        </div>
                    )}
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
                            onClick={() => setToggleList(!toggleList)}
                        >
                            Student List
                        </button>
                        {toggleList && (
                            <div className="student-list mt-4">
                                <ul>
                                    {studentList.map(student => (
                                        <li key={student._id} className="flex items-center mb-2">
                                            <img src={student.picture} alt="User Avatar" className="rounded-full w-10 h-10" />
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
                <div className="absolute top-36 right-6 flex flex-col space-y-2">
                    <button
                        className="text-stone-500 hover:text-yellow-500 hover:scale-125 transition-transform duration-200"
                        id='edit'
                        onClick={() => setEditMode(true)}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <Tooltip place="top" type="dark" effect="solid" anchorId='edit' content='Edit Course' />
                    <button
                        className="text-stone-500 hover:text-red-700 hover:scale-125 transition-transform duration-200"
                        id='delete'
                        onClick={() => setConfirmDeleteMode(true)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <Tooltip place="top" type="dark" effect="solid" anchorId='delete' content='Delete Course' />
                </div>
            )}

            {editMode && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-black bg-opacity-50 absolute inset-0"></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-3/4">
                        <h2 className="text-2xl mb-4">Edit Course</h2>
                        <form onSubmit={handleUpdateCourse}>
                            <input
                                type="text"
                                value={editedCourse.name}
                                onChange={(e) => setEditedCourse({ ...editedCourse, name: e.target.value })}
                                className="border p-2 mb-4 w-full"
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
                                type="submit"
                                className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600"
                            >
                                Save
                            </button>
                        </form>
                        <button
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                            onClick={() => setEditMode(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {confirmDeleteMode && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-black bg-opacity-50 absolute inset-0"></div>
                    <div className="bg-white p-6 rounded-lg shadow-lg z-10">
                        <h2 className="text-2xl mb-4">Confirm Deletion</h2>
                        <div>Are you sure you want to delete this course?</div>
                        <button
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 hover:scale-105 transition-transform duration-200"
                            onClick={handleDeleteCourse}
                        >
                            Confirm
                        </button>
                        <button
                            className="m-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 hover:scale-105 transition-transform duration-200"
                            onClick={closeConfirmDeleteModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

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

export default CourseDetails;


