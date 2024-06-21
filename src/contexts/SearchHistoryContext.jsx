import { createContext, useReducer, useContext } from "react";

export const SearchHistoryContext = createContext();

export const useSearchHistory = () => useContext(SearchHistoryContext);

export const SEARCH_HISTORY_ACTIONS = {
  SET_SEARCH_HISTORY: "SET_SEARCH_HISTORY",
  SET_SEARCH_VALUE: "SET_SEARCH_VALUE",
  SET_SELECTED_STATE: "SET_SELECTED_STATE",
  SET_SELECTED_HISTORY: "SET_SELECTED_HISTORY",
  TOGGLE_CLEARING_ENABLED: "TOGGLE_CLEARING_ENABLED",
  SET_CLEARING_INTERVAL: "SET_CLEARING_INTERVAL",
  CLEAR_STATES: "CLEAR_STATES",
};

export const SearchHistoryContextProvider = ({ children }) => {
  const initialValue = {
    searchHistory: [],
    searchValue: "",
    selectedState: "",
    selectedHistory: [],
    clearingInterval: null,
    clearingEnabled: true,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case SEARCH_HISTORY_ACTIONS.CLEAR_STATES:
        return initialValue;
      case SEARCH_HISTORY_ACTIONS.SET_SEARCH_HISTORY:
        return { ...state, searchHistory: action.payload };
      case SEARCH_HISTORY_ACTIONS.SET_SEARCH_VALUE:
        return { ...state, searchValue: action.payload };
      case SEARCH_HISTORY_ACTIONS.SET_SELECTED_STATE:
        return { ...state, selectedState: action.payload };
      case SEARCH_HISTORY_ACTIONS.SET_SELECTED_HISTORY:
        return { ...state, selectedHistory: action.payload };
      case SEARCH_HISTORY_ACTIONS.TOGGLE_CLEARING_ENABLED:
        return { ...state, clearingEnabled: !state.clearingEnabled };
      case SEARCH_HISTORY_ACTIONS.SET_CLEARING_INTERVAL:
        return { ...state, clearingInterval: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialValue);

  return (
    <SearchHistoryContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchHistoryContext.Provider>
  );
};
