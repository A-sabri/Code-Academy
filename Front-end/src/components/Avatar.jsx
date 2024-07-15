import React, { useState, useEffect } from 'react';
import { getUserById } from '../service/api';

const Avatar = ({ size }) => {
    const [user, setUser] = useState({});
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await getUserById(userId);
                setUser(userResponse.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUserData();
    }, [userId]);

    const imageUrl = user.picture;

    return (
        <div className={`relative ${size}`}>
            <img src={imageUrl} alt="User Avatar" className="rounded-full object-cover" />
        </div>
    );
};

export default Avatar;
