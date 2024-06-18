import React, { useContext, useEffect } from "react";

import Drawer from "../Drawer";
import EmptySearchHistory from "./widgets/EmptySearchHistory";
import Title from "./widgets/Title";
import SearchHistoryContent from "./widgets/SearchHistoryContent";

//services
import { SearchHistoryService } from "../../services/searchHistory.service";
import {
  SEARCH_HISTORY_ACTIONS,
  SearchHistoryContext,
  SearchHistoryContextProvider,
} from "./context";

const SearchHistory = ({ isModalOpen, setIsModalOpen, onWordClick }) => {
  const { state: searchHistoryState, dispatch } =
    useContext(SearchHistoryContext);

  const { searchHistory, searchValue, selectedState, selectedHistory } =
    searchHistoryState;

  const searchWord = (word) => {
    setIsModalOpen(false);
    onWordClick(word);
  };

  const removeSearchEntry = (id) => {
    if (!id) return;
    SearchHistoryService.deleteSearchHistoryById(id);
    dispatch({ type: SEARCH_HISTORY_ACTIONS.CLEAR_STATES });
    dispatch({
      type: SEARCH_HISTORY_ACTIONS.SET_SEARCH_HISTORY,
      payload: SearchHistoryService.getSearchHistories(),
    });
  };

  const removeSelectedHistory = () => {
    if (!selectedHistory?.length) return;
    const confim = window.confirm(
      `Are you sure you want to delete, ${selectedHistory?.length} search histories?`
    );
    if (!confim) return;
    SearchHistoryService.removeSelectedHistory(selectedHistory);
    setSelectedHistory([]);
    dispatch({
      type: SEARCH_HISTORY_ACTIONS.SET_SEARCH_HISTORY,
      payload: SearchHistoryService.getSearchHistories(),
    });
  };
  const clearSearchHistory = () => {
    const confirm = window.confirm(
      "Are you sure you want to clear the search history? This action is irreversible"
    );
    if (!confirm) return;
    SearchHistoryService.clearSearchHistory();
    dispatch({
      type: SEARCH_HISTORY_ACTIONS.SET_SEARCH_HISTORY,
      payload: [],
    });
  };

  useEffect(() => {
    if (isModalOpen) {
      dispatch({
        type: SEARCH_HISTORY_ACTIONS.SET_SEARCH_HISTORY,
        payload: SearchHistoryService.getSearchHistories(),
      });
      return;
    }
    dispatch({ type: SEARCH_HISTORY_ACTIONS.CLEAR_STATES });
  }, [isModalOpen]);

  let filteredSearchHistory = searchHistory;
  if (searchValue) {
    filteredSearchHistory = filteredSearchHistory?.filter((element) =>
      element?.searchString?.toLowerCase()?.includes(searchValue?.toLowerCase())
    );
  }
  if (selectedState) {
    filteredSearchHistory = filteredSearchHistory?.filter(
      (element) => element?.searchState === selectedState
    );
  }

  return (
    <Drawer isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <div className="h-screen flex flex-col">
        <Title setIsModalOpen={setIsModalOpen} />
        <div className="flex flex-col flex-grow">
          {searchHistory?.length ? (
            <SearchHistoryContent
              searchHistory={filteredSearchHistory}
              clearSearchHistory={clearSearchHistory}
              searchWord={searchWord}
              removeSearch={removeSearchEntry}
              removeSelectedHistory={removeSelectedHistory}
            />
          ) : (
            <EmptySearchHistory />
          )}
        </div>
      </div>
    </Drawer>
  );
};

const SearchHistoryWithContext = (props) => {
  return (
    <SearchHistoryContextProvider>
      <SearchHistory {...props} />
    </SearchHistoryContextProvider>
  );
};
export default SearchHistoryWithContext;
