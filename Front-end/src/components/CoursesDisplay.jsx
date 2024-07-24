/*
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
    image: ''
  });

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

    try {
      await createCourse(formData);
      fetchCourses();
      setShowForm(false);
      setCourseData({ name: '', description: '', image: '' });
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <div>
      {isAdmin && (
        <button
          className="bg-green-500 text-white p-2 rounded m-4 hover:scale-105 transition-transform duration-200"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Create Course'}
        </button>
      )}
      {showForm && (
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
        </form>
      )}
      <div className=" grid grid-cols-1 gap-4 p-7 md:grid-cols-2 lg:grid-cols-3">
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

*/

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
    image: ''
  });

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

    try {
      await createCourse(formData);
      fetchCourses();
      setShowForm(false);
      setCourseData({ name: '', description: '', image: '' });
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  return (
    <div>
      {isAdmin && (
        <button
          className="bg-green-500 text-white p-2 rounded m-4 hover:scale-105 transition-transform duration-200"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Create Course'}
        </button>
      )}
      {showForm && (
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
        </form>
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
