import React, { useEffect } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  PizzaList,
  PizzaBasket,
  TotalPrice,
} from './components';
import { Store } from './interfaces/Store';
import { getListOfPizza } from './redux/actions/actions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getListOfPizza());
  }, []);

  const pizza = useSelector((store:Store) => store.pizza);
  const basket = useSelector((store:Store) => store.basket);
  const totalPrice = basket.reduce((acc, cur) => acc + (cur.price * cur.count), 0);

  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      <div className="col-span-2 p-8">
        <div className="grid grid-cols-4 gap-4">
          <PizzaList pizza={pizza} />
        </div>
      </div>
      <div className="col-span-1 bg-white overflow-y-auto h-full">
        <div className="flex flex-col p-8">
          <TotalPrice price={totalPrice} />
          <PizzaBasket pizza={basket} />
          <div className="flex flex-col">
            <button
              className="bg-yellow-400 rounded-xl pt-2 pb-2"
            >
              Make Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
