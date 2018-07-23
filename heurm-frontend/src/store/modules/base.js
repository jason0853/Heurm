import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';

/**
 * Action Types
 */
const SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY';
const SET_USER_MENU_VISIBILITY = 'base/SET_USER_MENU_VISIBILITY';

/**
 * Action Creators
 */
export const actionCreators = {
  setHeaderVisibility: createAction(SET_HEADER_VISIBILITY), // visible
  setUserMenuVisibility: createAction(SET_USER_MENU_VISIBILITY) // visible
};

/**
 * Initial States
 */
const initialState = Record({
  header: Record({
    visible: true
  })(),
  userMenu: Record({
    visible: false
  })()
})();

/**
 * Reducers
 */
export default handleActions(
  {
    [SET_HEADER_VISIBILITY]: (state, action) =>
      state.setIn(['header', 'visible'], action.payload),
    [SET_USER_MENU_VISIBILITY]: (state, action) => {
      return state.setIn(['userMenu', 'visible'], action.payload);
    }
  },
  initialState
);
