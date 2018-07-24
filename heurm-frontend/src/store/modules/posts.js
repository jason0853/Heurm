import { createAction, handleActions } from 'redux-actions';
import { Record, List, fromJS } from 'immutable';
import * as PostsAPI from 'lib/api/posts';

const LOAD_POST = 'posts/LOAD_POST';
const LOAD_POST_SUCCESS = 'posts/LOAD_POST_SUCCESS';
const PREFETCH_POST = 'posts/PREFETCH_POST';
const PREFETCH_POST_SUCCESS = 'posts/PREFETCH_POST_SUCCESS';
const SHOW_PREFETCH_POST = 'posts/SHOW_PREFETCH_POST';
const RECEIVE_NEW_POST = 'posts/RECEIVE_NEW_POST';

export const actionCreators = {
  loadPost: createAction(LOAD_POST, PostsAPI.list),
  prefetchPost: createAction(PREFETCH_POST, PostsAPI.next), // url
  showPrefetchedPost: createAction(SHOW_PREFETCH_POST)
};

const initialState = Record({
  next: '',
  data: List(),
  nextData: List()
})();

export default handleActions(
  {
    [LOAD_POST_SUCCESS]: (state, action) => {
      const { next, data } = action.payload.data;
      return state.set('next', next).set('data', List(data));
    },
    [PREFETCH_POST_SUCCESS]: (state, action) => {
      const { next, data } = action.payload.data;
      return state.set('next', next).set('nextData', List(data));
    },
    [SHOW_PREFETCH_POST]: (state, action) => {
      const nextData = state.nextData;
      return state
        .update('data', data => data.concat(nextData))
        .set('nextData', List());
    },
    [RECEIVE_NEW_POST]: (state, action) => {
      return state.update('data', data => data.unshift(action.payload));
    }
  },
  initialState
);
