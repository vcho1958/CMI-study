import React, { createContext, useReducer } from "react";

const initialState = {
  today: new Date(),
  selectedDate: new Date(),
  select: true
};
const DateContext = createContext(initialState);
const { Provider } = DateContext;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    const newState = {}
    switch (action.type) {
      case 'changeMonth':
        switch (action.keyword) {
          case 'before': newState.selectedDate = new Date(state.selectedDate.getFullYear(), state.selectedDate.getMonth() - 1);
            break;
          case 'after': newState.selectedDate = new Date(state.selectedDate.getFullYear(), state.selectedDate.getMonth() + 1);
            break;
          default:
            throw new Error();
        }
        newState.checked = false;
        for (let prop in state) if (!newState[prop]) newState[prop] = state[prop];
        return newState;
      case 'changeDate':
        switch (action.keyword) {
          case 'before': newState.selectedDate = new Date(state.selectedDate.getFullYear(), state.selectedDate.getMonth() - 1, action.date);
            break;
          case 'after': newState.selectedDate = new Date(state.selectedDate.getFullYear(), state.selectedDate.getMonth() + 1, action.date);
            break;
          default:
            newState.selectedDate = new Date(state.selectedDate.getFullYear(), state.selectedDate.getMonth(), action.date);
        }
        newState.checked = true;
        for (let prop in state) if (!newState[prop]) newState[prop] = state[prop];
        return newState;
      case 'reset':
        return action.payload;
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export { DateContext, StateProvider }