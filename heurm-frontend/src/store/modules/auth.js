import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';

const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

export const actionCreators = {
  changeInput: createAction(CHANGE_INPUT), // { form, name, value }
  initializeForm: createAction(INITIALIZE_FORM) // form
};

const initialState = Record({
  register: Record({
    form: Record({
      email: '',
      username: '',
      password: '',
      passwordConfirm: ''
    })()
  })(),
  login: Record({
    form: Record({
      email: '',
      password: ''
    })()
  })()
})();

export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => {
      const { form, name, value } = action.payload;
      return state.setIn([form, 'form', name], value);
    },
    [INITIALIZE_FORM]: (state, action) => {
      const form = action.payload;
      const initialForm = initialState[form];
      return state.set(form, initialForm);
    }
  },
  initialState
);
