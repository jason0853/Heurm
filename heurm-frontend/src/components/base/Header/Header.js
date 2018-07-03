import React from 'react';
import './header.scss';

const Header = ({ children }) => {
  return (
    <div className="header">
      <div className="logo">Heurm</div>
      {children}
    </div>
  );
};

export default Header;
