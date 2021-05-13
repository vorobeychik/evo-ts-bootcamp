type Action = {
  type: string;
  payload?: any;
};

type Store<T> = {
  getState: () => T;
  dispatch: (action: Action) => void;
};

type Reducer<S = any, A extends Action = any> = (
  state: S | undefined,
  action: A
) => S;

type ReducersMapObject<S = any, A extends Action = any> = {
  [K in keyof S]: Reducer<S[K], A>;
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

function combineReducers(reducers: ReducersMapObject) {
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

const store = createStore<ReducersMapObject<{counterOne:number,counterTwo:number},Action>>(
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
