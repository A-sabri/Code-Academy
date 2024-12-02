import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course, isAdmin }) => {
    const navigate = useNavigate();

    const goToDetails = () => {
        navigate(`/course/${course._id}`, { state: { course, isAdmin } });
    };

    return (
        <div 
            className="m-5 bg-stone-50 shadow-lg rounded-lg overflow-hidden p-1.5 relative w-full max-w-md mx-auto transition-transform transform hover:scale-105"
            onClick={goToDetails}
            style={{ cursor: 'pointer' }}
        >
            <div className="flex flex-col items-center">
                <img src={course.image} alt="Course" className="w-full h-40 border border-gray-300 rounded-lg" />
                <h5 className="text-lg font-bold mt-4">{course.name}</h5>
            </div>
            <div className="flex mt-2 p-1.5 text-center">
                <p className="text-gray-700">{course.description}</p>
            </div>
            
        </div>
    );
};

export default CourseCard;
