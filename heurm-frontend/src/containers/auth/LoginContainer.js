import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthContent from 'components/auth/AuthContent';
import InputWithLabel from 'components/auth/InputWithLabel';
import AuthButton from 'components/auth/AuthButton';
import RightAlignedLink from 'components/auth/RightAlignedLink';
import { AuthActions } from 'store/actionCreators';

class LoginContainer extends Component {
  componentWillUnmount() {
    AuthActions.initializeForm('login');
  }

  handleChange = e => {
    const { name, value } = e.target;
    AuthActions.changeIntput({
      form: 'login',
      name,
      value
    });
  };

  render() {
    const { email, password } = this.props.form;
    const { handleChange } = this;

    return (
      <AuthContent title="로그인">
        <InputWithLabel
          label="이메일"
          name="email"
          placeholder="이메일"
          value={email}
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
        <AuthButton>로그인</AuthButton>
        <RightAlignedLink path="/auth/register">회원가입</RightAlignedLink>
      </AuthContent>
    );
  }
}

export default connect(({ auth }) => ({
  form: auth.login.form
}))(LoginContainer);
