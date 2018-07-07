import React from 'react';
import { Link } from 'react-router-dom';
import './login-button.scss';

const LoginButton = () => {
  return (
    <Link className="btn-login" to="/auth/login">
      로그인 / 회원가입
    </Link>
  );
};

export default LoginButton;
