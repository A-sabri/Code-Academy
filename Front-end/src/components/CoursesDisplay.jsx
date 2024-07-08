import React, { useEffect, useState } from 'react';
import { getAllCourses, getUserById, createCourse } from '../service/api';
import CourseCard from './CourseCard';

const CoursesDisplay = () => {
  const [courses, setCourses] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    nbOfStudent: 0,
    picture: ''
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

  const handleCreateCourse = async (event) => {
    event.preventDefault();

    const newCourse = {
      name: formData.name,
      description: formData.description,
      nbOfStudent: formData.nbOfStudent,
      picture: formData.picture,
      studentIds: []
    };

    try {
      await createCourse(newCourse);
      fetchCourses(); // Rafraîchit la liste des cours après la création
      setShowForm(false); // Ferme le formulaire après la création
      setFormData({
        name: '',
        description: '',
        nbOfStudent: 0,
        picture: ''
      });
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="bg-stone-50 p-7">
      {isAdmin && (
        <div className="mb-4">
          <button 
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={() => setShowForm(true)}
          >
            Create Course
          </button>
        </div>
      )}
      {showForm && (
        <form onSubmit={handleCreateCourse} className="mb-4 p-4 bg-white shadow-md rounded">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Course Name
            </label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea 
              id="description" 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nbOfStudent">
              Number of Students
            </label>
            <input 
              type="number" 
              id="nbOfStudent" 
              name="nbOfStudent" 
              value={formData.nbOfStudent} 
              onChange={handleChange} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="picture">
              Picture URL
            </label>
            <input 
              type="text" 
              id="picture" 
              name="picture" 
              value={formData.picture} 
              onChange={handleChange} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button 
              type="submit" 
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
            >
              Create Course
            </button>
            <button 
              type="button" 
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
