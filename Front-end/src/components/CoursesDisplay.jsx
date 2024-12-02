import React, { useEffect, useState } from 'react';
import { getAllCourses, createCourse, getUserById } from '../service/api';
import CourseCard from './CourseCard';

const CoursesDisplay = () => {
  const [courses, setCourses] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [courseData, setCourseData] = useState({
    name: '',
    description: '',
    image: '',
    time: ''
  });
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchCourses();
    checkAdminStatus();
  }, []);

  const fetchCourses = () => {
    getAllCourses()
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  };

  const checkAdminStatus = async () => {
    if (userId) {
      try {
        const response = await getUserById(userId);
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setCourseData({
      ...courseData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', courseData.name);
    formData.append('description', courseData.description);
    formData.append('image', courseData.image);
    formData.append('time', courseData.time);


    try {
      await createCourse(formData);
      fetchCourses();
      setShowForm(false);
      setCourseData({ name: '', description: '', image: '', time: '' });
      setModalMessage('Course created successfully!');
      setModalType('success');
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error creating course:', error);
      setModalMessage('Failed to create course.');
      setModalType('error');
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      {isAdmin && (
        <button
          className="bg-green-500 text-white p-2 rounded mt-8 ml-10 hover:scale-105 transition-transform duration-200"
          onClick={() => setShowForm(true)}
        >
          Create Course
        </button>
      )}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10 w-1/2">
            <h2 className="text-2xl mb-4">Create Course</h2>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Course Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={courseData.name}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  name="description"
                  value={courseData.description}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  onChange={handleInputChange}
                  min="00:00"
                  max="23:59"
                  step="60"
                  value={courseData.time}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                  Picture URL
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Create Course
              </button>
              <button
                type="button"
                className="bg-red-500 text-white p-2 rounded ml-4"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </form>
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
      <div className="grid grid-cols-1 gap-4 p-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map(course => (
          <CourseCard
            key={course._id}
            course={course}
            isAdmin={isAdmin}
            fetchCourses={fetchCourses}
          />
        ))}
      </div>
    </div>
  );
};

export default CoursesDisplay;
