import React, { Component } from 'react';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';

import UserMenu, { UserMenuItem, UserName } from 'components/base/UserMenu';
import { BaseActions, UserActions } from 'store/actionCreators';
import storage from 'lib/storage';

class UserMenuContainer extends Component {
  handleClickOutside = e => {
    BaseActions.setUserMenuVisibility(false);
  };

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
    const { username, visible } = this.props;
    const { handleLogout } = this;

    if (!visible) return null;

    return (
      <UserMenu>
        <UserName username={username} />
        <UserMenuItem>나의 흐름</UserMenuItem>
        <UserMenuItem>설정</UserMenuItem>
        <UserMenuItem onClick={handleLogout}>로그아웃</UserMenuItem>
      </UserMenu>
    );
  }
}

export default connect(({ base, user }) => ({
  visible: base.userMenu.visible,
  username: user.loggedInfo.username
}))(onClickOutside(UserMenuContainer));
