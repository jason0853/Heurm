import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';

/**
 * Action Types
 */
const SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY';

/**
 * Action Creators
 */
export const actionCreators = {
  setHeaderVisibility: createAction(SET_HEADER_VISIBILITY) // visible
};

/**
 * Initial State
 */
const initialState = Record({
  header: Record({
    visible: true
  })()
})();

/**
 * Reducers
 */
export default handleActions(
  {
    [SET_HEADER_VISIBILITY]: (state, action) =>
      state.setIn(['header', 'visible'], action.payload)
  },
  initialState
);
