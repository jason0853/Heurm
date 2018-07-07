import { bindActionCreators } from 'redux';
import store from './index';

import { actionCreators as baseActions } from './modules/base';

const { dispatch } = store;

export const BaseActions = bindActionCreators(baseActions, dispatch);
