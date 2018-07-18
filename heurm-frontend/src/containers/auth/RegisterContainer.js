import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmail, isAlphanumeric, isLength } from 'validator';
import { debounce } from 'lodash';

import AuthContent from 'components/auth/AuthContent';
import InputWithLabel from 'components/auth/InputWithLabel';
import AuthButton from 'components/auth/AuthButton';
import RightAlignedLink from 'components/auth/RightAlignedLink';
import AuthError from 'components/auth/AuthError';
import { AuthActions, UserActions } from 'store/actionCreators';
import storage from 'lib/storage';

class RegisterContainer extends Component {
  componentWillUnmount() {
    AuthActions.initializeForm('register');
  }

  handleError = error => {
    AuthActions.setError({
      form: 'register',
      error
    });
  };

  validate = {
    email: value => {
      if (!isEmail(value)) {
        this.handleError('잘못된 이메일 형식 입니다.');
        return false;
      }
      return true;
    },
    username: value => {
      if (!isAlphanumeric(value) || !isLength(value, { min: 6, max: 15 })) {
        this.handleError(
          '아이디는 4~15 글자의 알파벳 혹은 숫자로 이뤄져야 합니다.'
        );
        return false;
      }
      return true;
    },
    password: value => {
      if (!isLength(value, { min: 6 })) {
        this.handleError('비밀번호를 6자 이상 입력하세요.');
        return false;
      }
      this.handleError(null);
      return true;
    },
    passwordConfirm: value => {
      if (value !== this.props.form.password) {
        this.handleError('비밀번호확인이 일치하지 않습니다.');
        return false;
      }
      this.handleError(null);
      return true;
    }
  };

  checkEmailExists = debounce(async email => {
    try {
      await AuthActions.checkEmailExists(email);
      if (this.props.exists.email) {
        this.handleError('이미 존재하고 있는 이메일입니다.');
      } else {
        this.handleError(null);
      }
    } catch (err) {
      console.log(err);
    }
  }, 300);

  checkUsernameExists = debounce(async username => {
    try {
      await AuthActions.checkUsernameExists(username);
      if (this.props.exists.username) {
        this.handleError('이미 존재하고 있는 아이디입니다.');
      } else {
        this.handleError(null);
      }
    } catch (err) {
      console.log(err);
    }
  }, 300);

  handleChange = e => {
    const { name, value } = e.target;

    AuthActions.changeIntput({
      form: 'register',
      name,
      value
    });

    const isValidated = this.validate[name](value);

    if (name.indexOf('password') > -1 || !isValidated) return;

    const check =
      name === 'email' ? this.checkEmailExists : this.checkUsernameExists;
    check(value);
  };

  handleClick = async () => {
    const { form, history, error } = this.props;
    const { email, username, password, passwordConfirm } = form;

    const { validate } = this;

    if (error) return;
    if (
      !validate['email'](email) ||
      !validate['username'](username) ||
      !validate['password'](password) ||
      !validate['passwordConfirm'](passwordConfirm)
    ) {
      return;
    }

    try {
      await AuthActions.localRegister({ email, username, password });
      const loggedInfo = this.props.result;
      storage.set('loggedInfo', loggedInfo);
      UserActions.setLoggedInfo(loggedInfo);
      UserActions.setValidated(true);
      history.push('/');
    } catch (err) {
      if (err.response.status === 409) {
        this.handleError(err.response.data.message);
        return;
      }
      this.handleError('알 수 없는 에러가 발생했습니다.');
    }
  };

  render() {
    const { form, error } = this.props;
    const { email, username, password, passwordConfirm } = form;
    const { handleChange, handleClick } = this;

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
        {error && <AuthError>{error}</AuthError>}
        <AuthButton onClick={handleClick}>회원가입</AuthButton>
        <RightAlignedLink path="/auth/login">로그인</RightAlignedLink>
      </AuthContent>
    );
  }
}

export default connect(({ auth }) => ({
  form: auth.register.form,
  error: auth.register.error,
  exists: auth.register.exists,
  result: auth.result
}))(RegisterContainer);
