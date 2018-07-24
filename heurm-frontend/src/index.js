import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'styles/main.scss';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import store from 'store';
import socket from 'lib/socket';

const socketURI =
  process.env.NODE_ENV === 'production'
    ? (window.location.protocol === 'https:' ? 'wss://' : 'ws://') +
      window.location.host +
      '/ws'
    : 'ws://localhost:4000/ws';
socket.initialize(store, socketURI);

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
registerServiceWorker();
