import {Middleware} from 'redux';
import {Action} from '../../interfaces/action';

type Event = {
  eventName:string,
  pizzaName:string,
  pizzaPrice:number,
};

export const logger:Middleware = () => (next) => (action) => {
  const event = {
    eventName: action.type,
    pizzaName: action.payload.name,
    pizzaPrice: action.payload.price,
  };
  makeLog(event);
  return next(action);
};

function makeLog(event:Event) {
  fetch('http://localhost:3001/log', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  }).then((json) => {
    console.log(json);
  }).catch((ex) => {
    console.log(ex);
  });
}
