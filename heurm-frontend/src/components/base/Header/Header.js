import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

const Header = ({ children }) => {
  return (
    <div className="header">
      <Link to="/">Heurm</Link>
      {children}
    </div>
  );
};

export default Header;
