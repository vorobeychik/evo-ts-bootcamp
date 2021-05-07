import {Pizza} from './pizza';

export interface BasketItem extends Pizza{
  count: number;
}
