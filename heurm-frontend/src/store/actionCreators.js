import { bindActionCreators } from 'redux';
import store from './index';

import { actionCreators as baseActionCreators } from './modules/base';

const { dispatch } = store;

export const BaseActionCreators = bindActionCreators(
  baseActionCreators,
  dispatch
);
