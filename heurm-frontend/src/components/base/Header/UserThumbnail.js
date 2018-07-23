import React from 'react';
import './user-thumbnail.scss';

const UserThumbnail = ({ thumbnail, onClick }) => {
  return (
    <div
      className="user-thumbnail"
      onClick={onClick}
      style={{ backgroundImage: `url(${thumbnail})` }}
    />
  );
};

export default UserThumbnail;
