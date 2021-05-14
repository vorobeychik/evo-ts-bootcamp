import { Action } from '../../interfaces/action';
import { PIZZA_ADDED_INTO_BASKET, PIZZA_REMOVED_FROM_BASKET } from '../types/types';
import { BasketItem } from '../../interfaces/bascketItem';

export function basketReducer(state:BasketItem[] = [], action:Action<BasketItem>) {
  const pizzaInBasket = state.find((basketItem) => basketItem._id === action.payload._id);
  console.log('пэйлоад', action.payload);
  console.log(pizzaInBasket);

  switch (action.type) {
    case PIZZA_ADDED_INTO_BASKET:
      if (pizzaInBasket) {
        return state.map((pizza) => {
          if (pizzaInBasket._id === pizza._id) {
            const count = pizza.count + 1;
            return { ...pizza, count };
          }
          return pizza;
        });
      }

      return [...state, {...action.payload, count: 1}];
    case PIZZA_REMOVED_FROM_BASKET:
      if (pizzaInBasket && pizzaInBasket.count > 1) {
        return state.map((pizza) => {
          if (pizzaInBasket._id === pizza._id) {
            const count = pizza.count - 1;
            return {...pizza, count};
          }
          return pizza;
        });
      }

      if (pizzaInBasket) {
        return state.filter((pizza) => pizza._id !== pizzaInBasket._id);
      }

      return state;

    default:
      return state;
  }
}
