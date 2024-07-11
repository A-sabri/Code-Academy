// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import { getUserById, updateUser, getAllCourses } from '../service/api'; // Assurez-vous que le chemin est correct
import Avatar from './Avatar';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faEdit } from '@fortawesome/free-solid-svg-icons';


const UserProfile = () => {
  const [toggleList, setToggleList] = useState(false);
  const [user, setUser] = useState([]);
  const [courses, setCourses] = useState([]);
  const [editName, setEditName] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [editedUser, setEditedUser] = useState({ name: user.name, image: null });

  const userId = localStorage.getItem('userId');

  const toggleCoursesList = () => {
    setToggleList(!toggleList);
    
};

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await getUserById(userId);
        setUser(userResponse.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const coursesResponse = await getAllCourses();
        setCourses(coursesResponse.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchUserData();
    fetchCourses();
  }, [userId]);

  const userCoursesIds = user.courseIds;
  const userCourses = courses.filter(course => userCoursesIds.includes(course._id));
    
  const handleUpdateName = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', editedUser.name);

    try {
        await updateUser(userId, formData);
        const userResponse = await getUserById(userId);
        setUser(userResponse.data);
        setEditName(false);
    } catch (error) {
        console.error('Failed to update user name:', error);
    }
  };

  const handleUpdateImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (editedUser.image) {
        formData.append('image', editedUser.image);
    }

    try {
        await updateUser(userId, formData);
        const userResponse = await getUserById(userId);
        setUser(userResponse.data);
        setEditImage(false);
    } catch (error) {
        console.error('Failed to update user image:', error);
    }
  };




  return (
    <div className="container mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <Avatar size='w-48 h-48' />
                    {editImage && (
                        <form onSubmit={handleUpdateImage}>
                            <input
                                type="file"
                                onChange={(e) => setEditedUser({ ...editedUser, image: e.target.files[0] })}
                                className="border p-2 mb-4 w-full"
                            />
                            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update Image</button>
                        </form>
                    )}
                    <div className="absolute top-0 right-0">
                        <svg onClick={() => setEditImage(true)} xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H3m0 0l3.75-3.75M3 12l3.75 3.75M21 12h-6m0 0l3.75-3.75M21 12l-3.75 3.75" />
                        </svg>
                    </div>
                </div>
                <div>
                    {editName ? (
                        <form onSubmit={handleUpdateName}>
                            <input
                                type="text"
                                value={editedUser.name}
                                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                                className="border p-2 mb-4 w-full"
                                placeholder="Name"
                            />
                            <button type="submit" className="bg-blue-500 text-white p-2 rounded">EDIT</button>
                        </form>
                    ) : (
                        <h2 className="text-4xl font-bold">
                            {user.name}
                            <svg onClick={() => setEditName(true)} xmlns="http://www.w3.org/2000/svg" className="h-5 w- text-gray-500 cursor-pointer inline ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12H3m0 0l3.75-3.75M3 12l3.75 3.75M21 12h-6m0 0l3.75-3.75M21 12l-3.75 3.75" />
                            </svg>
                        </h2>
                    )}
                    <p className="text-gray-600">{user.email}</p>
                </div>
            </div>
            <div className="mt-6">
                <button 
                    className="text-2xl text-blue-500 hover:underline mb-4"
                    onClick={toggleCoursesList}
                >
                    My Courses
                </button>
                <ul className="mt-4">
                    {toggleList && (
                        <div className="course-list">
                            <ul>
                                {userCourses.map(course => (
                                    <li key={course._id}>
                                        {course.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    </div>
);


};

export default UserProfile;
