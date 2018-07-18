import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthContent from 'components/auth/AuthContent';
import InputWithLabel from 'components/auth/InputWithLabel';
import AuthButton from 'components/auth/AuthButton';
import RightAlignedLink from 'components/auth/RightAlignedLink';
import AuthError from 'components/auth/AuthError';
import { AuthActions, UserActions } from 'store/actionCreators';
import storage from 'lib/storage';

class LoginContainer extends Component {
  componentWillUnmount() {
    AuthActions.initializeForm('login');
  }

  handleError = error => {
    AuthActions.setError({
      form: 'login',
      error
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    AuthActions.changeIntput({
      form: 'login',
      name,
      value
    });
  };

  handleClick = async () => {
    const { form, history } = this.props;
    const { email, password } = form;

    try {
      await AuthActions.localLogin({ email, password });
      const loggedInfo = this.props.result;
      storage.set('loggedInfo', loggedInfo);
      UserActions.setLoggedInfo(loggedInfo);
      history.push('/');
    } catch (err) {
      this.handleError('잘못된 계정정보입니다.');
    }
  };

  render() {
    const { error, form } = this.props;
    const { email, password } = form;
    const { handleChange, handleClick } = this;

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
        {error && <AuthError>{error}</AuthError>}
        <AuthButton onClick={handleClick}>로그인</AuthButton>
        <RightAlignedLink path="/auth/register">회원가입</RightAlignedLink>
      </AuthContent>
    );
  }
}

export default connect(({ auth }) => ({
  form: auth.login.form,
  error: auth.login.error,
  result: auth.result
}))(LoginContainer);
