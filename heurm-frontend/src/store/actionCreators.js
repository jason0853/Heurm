import { bindActionCreators } from 'redux';
import store from './index';

import { actionCreators as baseActions } from './modules/base';
import { actionCreators as authActions } from './modules/auth';
import { actionCreators as userActions } from './modules/user';
import { actionCreators as homeActions } from './modules/home';
import { actionCreators as postsActions } from './modules/posts';

const { dispatch } = store;

export const BaseActions = bindActionCreators(baseActions, dispatch);
export const AuthActions = bindActionCreators(authActions, dispatch);
export const UserActions = bindActionCreators(userActions, dispatch);
export const HomeActions = bindActionCreators(homeActions, dispatch);
export const PostsActions = bindActionCreators(postsActions, dispatch);
