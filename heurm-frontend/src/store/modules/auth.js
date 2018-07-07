import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';

const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

export const actionCreators = {
  changeIntput: createAction(CHANGE_INPUT), // { form, name, value }
  initializeForm: createAction(INITIALIZE_FORM) // form
};

const initialState = Record({
  login: Record({
    form: Record({
      email: '',
      password: ''
    })()
  })(),
  register: Record({
    form: Record({
      email: '',
      username: '',
      password: '',
      passwordConfirm: ''
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
      const initialForm = initialState[action.payload];
      return state.set(action.payload, initialForm);
    }
  },
  initialState
);
