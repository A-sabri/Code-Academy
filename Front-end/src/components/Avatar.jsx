// src/components/Avatar.js
import React from 'react';
import PropTypes from 'prop-types';
//mport { AVATAR_URL } from '../config'; // Importez l'URL de l'avatar depuis la configuration

const Avatar = ({ src = '/random-user.png', alt, size = 'w-10 h-10', onClick }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`rounded-full cursor-pointer ${size}`}
      onClick={onClick}
      
    />
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string.isRequired,
  size: PropTypes.string,
  onClick: PropTypes.func,
};

export default Avatar;
