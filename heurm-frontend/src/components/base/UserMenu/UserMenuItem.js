import React from 'react';
import './user-menu-item.scss';

const UserMenuItem = ({ onClick, children }) => {
  return (
    <li className="user-menu-item" onClick={onClick}>
      {children}
    </li>
  );
};

export default UserMenuItem;
