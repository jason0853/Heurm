import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header, { LoginButton } from 'components/base/Header';
import { UserActions } from 'store/actionCreators';
import storage from 'lib/storage';

class HeaderContainer extends Component {
  handleLogout = async () => {
    try {
      await UserActions.logout();
    } catch (err) {
      console.log(err);
    }

    storage.remove('loggedInfo');
    window.location.href = '/';
  };

  render() {
    const { visible, user } = this.props;
    const { handleLogout } = this;
    if (!visible) return null;

    return (
      <Header>
        {user.logged ? (
          <div>
            {user.loggedInfo.username}
            <div onClick={handleLogout}>로그아웃</div>
          </div>
        ) : (
          <LoginButton />
        )}
      </Header>
    );
  }
}

export default connect(({ base, user }) => ({
  visible: base.header.visible,
  user: user
}))(HeaderContainer);
