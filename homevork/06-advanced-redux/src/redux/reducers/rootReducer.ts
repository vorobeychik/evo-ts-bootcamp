import { combineReducers } from 'redux';
import { pizzaReducer } from './pizzaReducer';
import { basketReducer } from './basketReducer';

export const rootReducer = combineReducers({
  pizza: pizzaReducer,
  basket: basketReducer,
});
