import { createStore, compose, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import modules from './modules';

const isDev = process.env.NODE_ENV === 'development';
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools || compose;
const composeStoreWithMiddleware = promiseMiddleware({
  promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'FAILURE']
});
const middlewares = [composeStoreWithMiddleware];

const configure = preloadedState =>
  createStore(
    modules,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

export default configure;
