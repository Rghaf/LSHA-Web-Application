import { createContext, useReducer, useMemo } from "react";

export const CustomCsContext = createContext();

const initialState = {
  id: null,
  name: null,
  email: null,
  resampleStrategy: null,
  events: [
    {
      channel: null,
      condition: null,
      symbol: null,
    },
  ],
};

export function CustomCsReducer(state, action) {
  switch (action.type) {
    case "CREATED":
      return {
        ...state,
        ...action.payload,
      };
    case "ADD_EVENT":
      return {
        ...state,
        events: [
          ...state.events,
          {
            channel: null,
            condition: null,
            symbol: null,
          },
        ],
      };
    case "REMOVE_EVENT":
      return {
        ...state,
        events: state.events.filter((_, idx) => idx !== action.payload.index),
      };
    case "UPDATE_EVENT_FIELD":
      const updatedEvents = [...state.events];
      updatedEvents[action.payload.index] = {
        ...updatedEvents[action.payload.index],
        [action.payload.key]: action.payload.value,
      };
      return {
        ...state,
        events: updatedEvents,
      };
    case "LOAD_EVENTS":
      return {
        ...state,
        events: action.payload,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function CustomCsProvider({ children }) {
  const [state, dispatch] = useReducer(CustomCsReducer, initialState);

  const value = useMemo(
    () => ({ customCsState: state, customCsDispatch: dispatch }),
    [state, dispatch]
  );

  return (
    <CustomCsContext.Provider value={value}>
      {children}
    </CustomCsContext.Provider>
  );
}
