import { Action } from '../../interfaces/action';
import { Pizza } from '../../interfaces/pizza';
import { PIZZA_VIEWED } from '../types/types';

export function pizzaReducer(state:Pizza[] = [], action:Action<Pizza[]>) {
  switch (action.type) {
    case PIZZA_VIEWED:
      return action.payload;
    default:
      return state;
  }
}
