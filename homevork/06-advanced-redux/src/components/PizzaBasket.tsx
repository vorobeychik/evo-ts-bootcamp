import React from 'react';

import {PizzaBasketItem} from './PizzaBasketItem';
import {BasketItem} from '../interfaces/bascketItem';

interface PizzaBucketProps {
  pizza: BasketItem[],
}

export function PizzaBasket({pizza}: PizzaBucketProps) {
  const basket = pizza.map((p) => (
    <PizzaBasketItem
      _id={p._id}
      key={p._id}
      price={p.price}
      name={p.name}
      count={p.count}
    />
  ));
  return (
    <>
      {basket}
    </>
  );
}
