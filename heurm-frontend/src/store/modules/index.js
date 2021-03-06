import { combineReducers } from 'redux';
import base from './base';
import auth from './auth';
import user from './user';
import home from './home';
import posts from './posts';

export default combineReducers({
  base,
  auth,
  user,
  home,
  posts
});
