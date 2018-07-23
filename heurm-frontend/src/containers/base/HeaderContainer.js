import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header, { LoginButton, UserThumbnail } from 'components/base/Header';
import UserMenuContainer from 'containers/base/UserMenuContainer';
import { BaseActions } from 'store/actionCreators';
// import storage from 'lib/storage';

class HeaderContainer extends Component {
  handleThumbnailClick = () => {
    BaseActions.setUserMenuVisibility(true);
  };

  render() {
    const { visible, user } = this.props;
    const { handleThumbnailClick } = this;
    if (!visible) return null;

    return (
      <Header>
        {user.logged ? (
          <UserThumbnail
            thumbnail={user.loggedInfo.thumbnail}
            onClick={handleThumbnailClick}
          />
        ) : (
          <LoginButton />
        )}
        <UserMenuContainer />
      </Header>
    );
  }
}

export default connect(({ base, user }) => ({
  visible: base.header.visible,
  user: user
}))(HeaderContainer);
