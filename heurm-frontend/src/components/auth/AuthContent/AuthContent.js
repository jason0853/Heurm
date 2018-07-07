import React from 'react';
import './auth-content.scss';

const AuthContent = ({ title, children }) => {
  return (
    <div className="auth-content">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default AuthContent;
