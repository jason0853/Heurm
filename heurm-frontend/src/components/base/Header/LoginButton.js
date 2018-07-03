import React from 'react';
import { Link } from 'react-router-dom';
import './login-button.scss';

const LoginButton = () => {
  return (
    <Link className="login-button" to="/auth/login">
      로그인 / 가입
    </Link>
  );
};

export default LoginButton;
