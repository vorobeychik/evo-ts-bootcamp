type Action = {
  type: string;
  payload?: any;
};

type Store<T> = {
  getState: () => T;
  dispatch: (action: Action) => void;
};

function counterOne(state: number = 0, action: Action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}
function counterTwo(state: number = 0, action: Action) {
  switch (action.type) {
    case "INCREMENT_TWICE":
      return state + +2;
    case "DECREMENT_TWICE":
      return state - 2;
    default:
      return state;
  }
}

function createStore<T>(reducer: any) {
  let state: T;

  const store: Store<T> = {
    getState: () => {
      return state;
    },
    dispatch: (action) => {
      state = reducer(state, action);
    },
  };

  store.dispatch({ type: "INIT" });

  return store;
}

//я знаю что any это очень плохо но я просто не могу придумать как тут правильно орпеделить типы *( был бы очень рад
//если бы проверяющий мог показать как правильно
function combineReducers(reducers: any) {
  let combined: any = {};

  return function (state: any, action: Action) {
    let localState = state;

    Object.keys(reducers).forEach((reducerName) => {
      if (state) {
        localState = state[reducerName];
      }

      combined = {
        ...combined,
        [reducerName]: reducers[reducerName](localState, action),
      };
    });

    return combined;
  };
}

const store = createStore<number>(
  combineReducers({
    counterOne,
    counterTwo,
  })
);

console.log(store.getState());
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "DECREMENT_TWICE" });
console.log(store.getState());
store.dispatch({ type: "DECREMENT" });
store.dispatch({ type: "INCREMENT_TWICE" });
console.log(store.getState());
