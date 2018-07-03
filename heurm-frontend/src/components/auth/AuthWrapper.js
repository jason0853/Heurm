import React from 'react';
import { Link } from 'react-router-dom';
import './auth-wrapper.scss';

const AuthWrapper = ({ children }) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-logo">
        <Link to="/">HEURM</Link>
      </div>
      {children}
    </div>
  );
};

export default AuthWrapper;
