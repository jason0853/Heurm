import React from 'react';
import './auth-button.scss';

const AuthButton = ({ children, onClick }) => {
  return (
    <div className="auth-button" onClick={onClick}>
      {children}
    </div>
  );
};

export default AuthButton;
