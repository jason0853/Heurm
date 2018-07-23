import { createAction, handleActions } from 'redux-actions';
import { Record } from 'immutable';
import * as PostsAPI from 'lib/api/posts';

const CHANGE_WRITE_POST_INPUT = 'home/CHANGE_WRITE_POST_INPUT';
const WRITE_POST = 'home/WRITE_POST';
const WRITE_POST_LOADING = 'home/WRITE_POST_LOADING';

export const actionCreators = {
  changeWritePostInput: createAction(CHANGE_WRITE_POST_INPUT), // value
  writePost: createAction(WRITE_POST, PostsAPI.write) // content
};

const initialState = Record({
  writePost: Record({
    value: ''
  })()
})();

export default handleActions(
  {
    [CHANGE_WRITE_POST_INPUT]: (state, action) =>
      state.setIn(['writePost', 'value'], action.payload),
    [WRITE_POST_LOADING]: (state, action) =>
      state.setIn(['writePost', 'value'], '')
  },
  initialState
);
