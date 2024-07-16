import React, { useState, useEffect } from 'react';
import { getUserById, getAllCourses, updateUser } from '../service/api'; // Assurez-vous que le chemin est correct
import Avatar from './Avatar';
import { FaEdit } from 'react-icons/fa';
const UserProfile = () => {
  const [toggleList, setToggleList] = useState(false);
  const [user, setUser] = useState({});
  const [courses, setCourses] = useState([]);
  const [image, setImage] = useState(null);
  const [editingImage, setEditingImage] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editedName, setEditedName] = useState('');
  const userId = localStorage.getItem('userId');

  const toggleCoursesList = () => {
    setToggleList(!toggleList);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await getUserById(userId);
        setUser(userResponse.data);
        setEditedName(userResponse.data.name);
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

  const userCoursesIds = user.courseIds || [];
  const userCourses = courses.filter(course => userCoursesIds.includes(course._id));

  const handleUpdateName = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', editedName);
      await updateUser(userId, formData);
      const userResponse = await getUserById(userId);
      setUser(userResponse.data);
      setEditName(false);
    } catch (error) {
      console.error('Failed to update user name:', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append('picture', image);
    }
    try {
      const response = await updateUser(userId, formData);
      setUser(response.data);
      setEditingImage(false);
      setImage(null);
      window.location.reload()
    } catch (error) {
      console.error('Failed to update user image:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center space-x-4">
          <div className="relative">
            <Avatar size='w-48 h-48' />
            <FaEdit
              className="absolute top-0 right-0 h-4 w-4 text-gray-500 cursor-pointer inline ml-2  hover:text-green-700 hover:scale-125 transition-transform duration-200"
              onClick={() => setEditingImage(true)}
            />
            {editingImage && (
              <form onSubmit={handleImageSubmit}>
                <input
                  id="profile-picture-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="border p-2 mb-4 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                  Save Image
                </button>
              </form>
            )}
          </div>
          <div>
            {editName ? (
              <form onSubmit={handleUpdateName}>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="border p-2 mb-4 w-full"
                  placeholder="Name"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update Name</button>
              </form>
            ) : (
              <h2 className="text-4xl font-bold">
                {user.name}
                <FaEdit
                  className="h-4 w-4 text-gray-500 cursor-pointer inline ml-2  hover:text-green-700 hover:scale-125 transition-transform duration-200"
                  onClick={() => setEditName(true)}
                />
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
                <table class="border-separate  border-slate-400 ...">
                  <thead>
                    <tr>
                      <th class="border border-slate-300 ...">Courses</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {userCourses.map(course => (
                        <td key={course._id} class="flex flex-col border border-slate-300 ...">
                          {course.name}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;



