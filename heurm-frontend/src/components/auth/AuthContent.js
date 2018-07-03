import React from 'react';
import './auth-content.scss';

const AuthContent = ({ title, children }) => {
  return (
    <div className="auth-content">
      <div className="auth-title">{title}</div>
      {children}
    </div>
  );
};

export default AuthContent;
