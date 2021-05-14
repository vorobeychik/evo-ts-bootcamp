import {BasketItem} from './bascketItem';
import {Pizza} from './pizza';

export interface Store{
  pizza:Pizza[]
  basket:BasketItem[]
}
