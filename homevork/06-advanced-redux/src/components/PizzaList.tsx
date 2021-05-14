import React from 'react';
import { PizzaItem } from './PizzaItem';
import {Pizza} from '../interfaces/pizza';

interface PizzaListProps {
  pizza:Pizza[];
}

export function PizzaList({pizza}: PizzaListProps) {
  const pizzaList = pizza.map((p) => (
    <PizzaItem
      key={p._id}
      _id={p._id}
      name={p.name}
      price={p.price}
    />
  ));
  return (
    <>
      {pizzaList}
    </>
  );
}
