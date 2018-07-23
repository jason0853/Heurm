import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { Home, Auth } from 'pages';
import HeaderContainer from 'containers/base/HeaderContainer';
import { UserActions } from 'store/actionCreators';
import storage from 'lib/storage';

class App extends Component {
  initializeUserInfo = async () => {
    const loggedInfo = storage.get('loggedInfo');
    if (!loggedInfo) return;

    UserActions.setLoggedInfo(loggedInfo);

    try {
      await UserActions.checkStatus();
    } catch (err) {
      storage.remove('loggedInfo');
      window.location.href = '/auth/login?expired';
    }
  };

  componentDidMount() {
    this.initializeUserInfo();
  }

  render() {
    return (
      <div className="App">
        <HeaderContainer />
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Auth} />
        <ToastContainer
          style={{ zIndex: 20 }}
          hideProgressBar={true}
          position="bottom-right"
        />
      </div>
    );
  }
}

export default App;
