import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header, { LoginButton } from 'components/base/Header';

class HeaderContainer extends Component {
  render() {
    const { visible } = this.props;
    if (!visible) return null;

    return (
      <Header>
        <LoginButton />
      </Header>
    );
  }
}

export default connect(({ base }) => ({
  visible: base.header.visible
}))(HeaderContainer);
