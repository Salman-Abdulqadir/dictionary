import { createContext, useReducer, useContext } from "react";

export const SearchHistoryContext = createContext();

export const useSearchHistory = () => useContext(SearchHistoryContext);

export const SEARCH_HISTORY_ACTIONS = {
  SET_SEARCH_HISTORY: "SET_SEARCH_HISTORY",
  SET_SEARCH_VALUE: "SET_SEARCH_VALUE",
  SET_SELECTED_STATE: "SET_SELECTED_STATE",
  SET_SELECTED_HISTORY: "SET_SELECTED_HISTORY",
  CLEAR_STATES: "CLEAR_STATES",
};

export const SearchHistoryContextProvider = ({ children }) => {
  const initialValue = {
    searchHistory: [],
    searchValue: "",
    selectedState: "",
    selectedHistory: [],
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
