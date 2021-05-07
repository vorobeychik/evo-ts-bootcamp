import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from '../reducers/rootReducer';
import {logger} from '../midleware/logger';
import {Store} from '../../interfaces/Store';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, undefined, composeEnhancers(
  applyMiddleware(thunk, logger),
));
