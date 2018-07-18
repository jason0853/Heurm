import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';
import * as AuthAPI from 'lib/api/auth';

const SET_LOGGED_INFO = 'user/SET_LOGGED_INFO';
const SET_VALIDATED = 'user/SET_VALIDATED';
const CHECK_STATUS = 'user/CHECK_STATUS';
const CHECK_STATUS_SUCCESS = 'user/CHECK_STATUS_SUCCESS';
const CHECK_STATUS_FAILURE = 'user/CHECK_STATUS_FAILURE';
const LOGOUT = 'auth/LOGOUT';

export const actionCreators = {
  setLoggedInfo: createAction(SET_LOGGED_INFO), // loggedInfo
  setValidated: createAction(SET_VALIDATED), // validated
  checkStatus: createAction(CHECK_STATUS, AuthAPI.checkStatus),
  logout: createAction(LOGOUT, AuthAPI.logout)
};

const initialState = Record({
  loggedInfo: Record({
    thumbnail: null,
    username: null
  })(),
  logged: false,
  validated: false
})();

export default handleActions(
  {
    [SET_LOGGED_INFO]: (state, action) =>
      state.set('loggedInfo', action.payload).set('logged', true),
    [SET_VALIDATED]: (state, action) => state.set('validated', action.payload),
    [CHECK_STATUS_SUCCESS]: (state, action) =>
      state.set('loggedInfo', action.payload.data).set('validated', true),
    [CHECK_STATUS_FAILURE]: (state, action) => initialState
  },
  initialState
);
