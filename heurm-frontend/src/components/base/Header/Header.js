import React from 'react';
import './header.scss';

const Header = ({ children }) => {
  return (
    <div className="header">
      <h1>Heurm</h1>
      {children}
    </div>
  );
};

export default Header;
