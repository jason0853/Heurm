import React from 'react';
import { Link } from 'react-router-dom';
import './auth-template.scss';

const AuthTemplate = ({ children }) => {
  return (
    <div className="auth-template">
      <div className="link-logo">
        <Link to="/">HEURM</Link>
      </div>
      {children}
    </div>
  );
};

export default AuthTemplate;
