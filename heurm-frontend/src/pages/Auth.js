import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { BaseActions } from 'store/actionCreators';
import AuthTemplate from 'components/auth/AuthTemplate';
import LoginContainer from 'containers/auth/LoginContainer';
import RegisterContainer from 'containers/auth/RegisterContainer';

class Auth extends Component {
  constructor() {
    super();

    BaseActions.setHeaderVisibility(false);
  }

  componentWillUnmount() {
    BaseActions.setHeaderVisibility(true);
  }

  render() {
    return (
      <AuthTemplate>
        <Route path="/auth/login" component={LoginContainer} />
        <Route path="/auth/register" component={RegisterContainer} />
      </AuthTemplate>
    );
  }
}

export default Auth;
