import { ThunkAction } from 'redux-thunk';
import {PIZZA_VIEWED, PIZZA_ADDED_INTO_BASKET, PIZZA_REMOVED_FROM_BASKET} from '../types/types';
import {Action} from '../../interfaces/action';
import {Pizza} from '../../interfaces/pizza';
import {Store} from '../../interfaces/Store';
import {getPizza} from '../../services/api';

export function pizzaViewed(pizza:Pizza[]): Action<Pizza[]> {
  return {
    type: PIZZA_VIEWED,
    payload: pizza,
  };
}

export function getListOfPizza():ThunkAction<void, Store, {}, Action<Pizza[]>> {
  return (dispatch) => {
    getPizza().then((pizza) => {
      console.log(2);
      dispatch(pizzaViewed(pizza.items));
    });
  };
}

export function pizzaAddedIntoBasket(_id:string, name:string, price:number): Action<Pizza> {
  return {
    type: PIZZA_ADDED_INTO_BASKET,
    payload: {
      _id,
      name,
      price,
    },
  };
}

export function pizzaRemovedFromBasket(_id:string): Action<{_id:string}> {
  return {
    type: PIZZA_REMOVED_FROM_BASKET,
    payload: {_id},
  };
}
