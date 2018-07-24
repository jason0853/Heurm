import { connect } from 'net';
import store from 'store';

const parseJSON = str => {
  let parsed = null;

  try {
    parsed = JSON.parse(str);
  } catch (err) {
    return null;
  }

  return parsed;
};

export default (function socketHelper() {
  let _store = null;
  let _socket = null;
  let _uri = null;

  const listener = message => {
    const data = parseJSON(message.data);
    if (!data || !data.type) return;
    _store.dispatch(data);
  };

  const reconnect = () => {
    console.log('reconnecting..');
    setTimeout(() => connect(_uri), 3000);
  };

  const connect = uri => {
    _uri = uri;
    _socket = new WebSocket(uri);
    _socket.onmessage = listener;
    _socket.onopen = event => {
      console.log('connected to ' + uri);
    };
    _socket.onclose = reconnect;
  };

  return {
    initialize: (store, uri) => {
      _store = store;
      connect(uri);
    }
  };
})();
