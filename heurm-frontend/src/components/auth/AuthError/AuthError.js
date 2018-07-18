import React from 'react';
import './auth-error.scss';

const AuthError = ({ children }) => {
  return <div className="auth-error">{children}</div>;
};

export default AuthError;
