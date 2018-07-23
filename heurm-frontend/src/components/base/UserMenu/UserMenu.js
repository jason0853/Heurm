import React from 'react';
import './user-menu.scss';

const UserMenu = ({ children }) => {
  return <ul className="user-menu">{children}</ul>;
};

export default UserMenu;
