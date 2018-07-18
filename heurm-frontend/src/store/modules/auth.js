import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';
import * as AuthAPI from 'lib/api/auth';

const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const SET_ERROR = 'auth/SET_ERROR';
const CHECK_EMAIL_EXISTS = 'auth/CHECK_EMAIL_EXISTS';
const CHECK_EMAIL_EXISTS_SUCCESS = 'auth/CHECK_EMAIL_EXISTS_SUCCESS';
const CHECK_USERNAME_EXISTS = 'auth/CHECK_USERNAME_EXISTS';
const CHECK_USERNAME_EXISTS_SUCCESS = 'auth/CHECK_USERNAME_EXISTS_SUCCESS';
const LOCAL_REGISTER = 'auth/LOCAL_REGISTER';
const LOCAL_REGISTER_SUCCESS = 'auth/LOCAL_REGISTER_SUCCESS';
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN';
const LOCAL_LOGIN_SUCCESS = 'auth/LOCAL_LOGIN_SUCCESS';

export const actionCreators = {
  changeIntput: createAction(CHANGE_INPUT), // { form, name, value }
  initializeForm: createAction(INITIALIZE_FORM), // form
  setError: createAction(SET_ERROR), // { form, error }
  checkEmailExists: createAction(CHECK_EMAIL_EXISTS, AuthAPI.checkEmailExists), // email
  checkUsernameExists: createAction(
    CHECK_USERNAME_EXISTS,
    AuthAPI.checkUsernameExists
  ), // username
  localRegister: createAction(LOCAL_REGISTER, AuthAPI.localRegister), // email, usernmae, password
  localLogin: createAction(LOCAL_LOGIN, AuthAPI.localLogin) // email, password
};

const initialState = Record({
  login: Record({
    form: Record({
      email: '',
      password: ''
    })(),
    error: null
  })(),
  register: Record({
    form: Record({
      email: '',
      username: '',
      password: '',
      passwordConfirm: ''
    })(),
    exists: Record({
      email: false,
      username: false
    })(),
    error: null
  })(),
  result: Record({})()
})();

export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => {
      const { form, name, value } = action.payload;
      return state.setIn([form, 'form', name], value);
    },
    [INITIALIZE_FORM]: (state, action) => {
      const initialForm = initialState[action.payload];
      return state.set(action.payload, initialForm);
    },
    [SET_ERROR]: (state, action) => {
      const { form, error } = action.payload;
      return state.setIn([form, 'error'], error);
    },
    [CHECK_EMAIL_EXISTS_SUCCESS]: (state, action) =>
      state.setIn(['register', 'exists', 'email'], action.payload.data.exists),
    [CHECK_USERNAME_EXISTS_SUCCESS]: (state, action) =>
      state.setIn(
        ['register', 'exists', 'username'],
        action.payload.data.exists
      ),
    [LOCAL_REGISTER_SUCCESS]: (state, action) =>
      state.set('result', action.payload.data),
    [LOCAL_LOGIN_SUCCESS]: (state, action) =>
      state.set('result', action.payload.data)
  },
  initialState
);
