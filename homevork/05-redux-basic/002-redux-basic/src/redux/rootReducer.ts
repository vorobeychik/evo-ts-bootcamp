type Action = {
  type: string;
  payload: any;
};
export function rootReducer(state: number = 0, action: Action) {
  switch (action.type) {
    case "UPDATE_BALANCE":
      return action.payload;
    case "CREDIT":
      return state - action.payload;
    case "DEBIT":
      return state + action.payload;
    case "SET_BALANCE_WITH_TAX":
      return state - state * 0.14;
    default:
      return state;
  }
}
