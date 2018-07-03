import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AuthContent,
  InputWithLabel,
  AuthButton,
  RightAlignedLink
} from 'components/auth';
import { AuthActions } from 'store/actionCreators';

class RegisterContainer extends Component {
  componentWillUnmount() {
    AuthActions.initializeForm('register');
  }

  handleChange = e => {
    const { name, value } = e.target;

    AuthActions.changeInput({
      name,
      value,
      form: 'register'
    });
  };

  render() {
    const { email, username, password, passwordConfirm } = this.props.form;
    const { handleChange } = this;

    return (
      <AuthContent title="회원가입">
        <InputWithLabel
          label="이메일"
          name="email"
          placeholder="이메일"
          value={email}
          onChange={handleChange}
        />
        <InputWithLabel
          label="아이디"
          name="username"
          placeholder="아이디"
          value={username}
          onChange={handleChange}
        />
        <InputWithLabel
          label="비밀번호"
          name="password"
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={handleChange}
        />
        <InputWithLabel
          label="비밀번호 확인"
          name="passwordConfirm"
          placeholder="비밀번호 확인"
          type="password"
          value={passwordConfirm}
          onChange={handleChange}
        />
        <AuthButton>회원가입</AuthButton>
        <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
      </AuthContent>
    );
  }
}

export default connect(state => ({
  form: state.auth.register.form
}))(RegisterContainer);
