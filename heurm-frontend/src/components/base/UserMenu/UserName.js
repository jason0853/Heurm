import React from 'react';
import './user-name.scss';

const UserName = ({ username }) => {
  return <div className="user-name">{username}</div>;
};

export default UserName;
