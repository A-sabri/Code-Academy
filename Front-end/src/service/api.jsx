// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Students API
export const getAllUsers = () => axios.get(`${API_URL}/users`);
export const getUserById = (userId) => axios.get(`${API_URL}/users/${userId}`);
export const createUser = (user) => axios.post(`${API_URL}/users`, user);
export const updateUser = (id, user) => axios.put(`${API_URL}/users/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API_URL}/users/${id}`);

// Courses API
export const getAllCourses = () => axios.get(`${API_URL}/courses`);
export const getCourseById = (id) => axios.get(`${API_URL}/courses/${id}`);
export const createCourse = (course) => axios.post(`${API_URL}/courses`, course);
export const updateCourse = (id, formData) => axios.put(`${API_URL}/courses/${id}`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
export const deleteCourse = (id) => axios.delete(`${API_URL}/courses/${id}`);

// Enrollments API
export const addStudentToCourse = (studentId, courseId) => axios.post(`${API_URL}/courses/${courseId}/join`, { studentId });
export const removeStudentFromCourse = (studentId, courseId) => axios.delete(`${API_URL}/courses/${courseId}/removeStudent`, { data: { studentId } });


// Auth API
export const register = (user) => axios.post(`${API_URL}/users/register`, user);
export const login = (user) => axios.post(`${API_URL}/users/login`, user);


