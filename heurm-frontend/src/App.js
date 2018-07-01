import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Home, Auth } from 'pages';
import HeaderContainer from 'containers/base/HeaderContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderContainer />
        <Route exact path="/" component={Home} />
        <Route path="/auth" component={Auth} />
      </div>
    );
  }
}

export default App;
