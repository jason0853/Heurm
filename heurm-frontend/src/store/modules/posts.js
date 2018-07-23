import { createAction, handleActions } from 'redux-actions';
import { Record, List } from 'immutable';
import * as PostsAPI from 'lib/api/posts';

const LOAD_POST = 'posts/LOAD_POST';
const LOAD_POST_SUCCESS = 'posts/LOAD_POST_SUCCESS';

export const actionCreators = {
  loadPost: createAction(LOAD_POST, PostsAPI.list)
};

const initialState = Record({
  next: '',
  data: List()
})();

export default handleActions(
  {
    [LOAD_POST_SUCCESS]: (state, action) => {
      const { next, data } = action.payload.data;
      return state.set('next', next).set('data', List(data));
    }
  },
  initialState
);
