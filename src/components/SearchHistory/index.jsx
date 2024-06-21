import React, { useContext, useEffect } from "react";

import Drawer from "../Drawer";
import EmptySearchHistory from "./widgets/EmptySearchHistory";
import SearchHistoryHeader from "./widgets/SearchHistoryHeader";
import SearchHistoryContent from "./widgets/SearchHistoryContent";

//services
import { SearchHistoryService } from "../../services/searchHistory.service";
import {
  SEARCH_HISTORY_ACTIONS,
  useSearchHistory,
} from "../../contexts/SearchHistoryContext";
import { useConfirmationModal } from "../../contexts/ConfirmationModalContext";
import { useDictionary } from "../../contexts/DictionaryContext";

const SearchHistory = ({ onWordClick }) => {
  const { state: searchHistoryState, dispatch } = useSearchHistory();

  const { searchHistory, searchValue, selectedState, selectedHistory } =
    searchHistoryState;

  const confirmationModal = useConfirmationModal();

  const { isModalOpen, setIsModalOpen } = useDictionary();

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

    confirmationModal({
      content: `${selectedHistory?.length} selected history will be deleted`,
      onOk: () => {
        SearchHistoryService.removeSelectedHistory(selectedHistory);
        dispatch({
          type: SEARCH_HISTORY_ACTIONS.SET_SELECTED_HISTORY,
          payload: [],
        });
        dispatch({
          type: SEARCH_HISTORY_ACTIONS.SET_SEARCH_HISTORY,
          payload: SearchHistoryService.getSearchHistories(),
        });
      },
    });
  };
  const clearSearchHistory = () => {
    confirmationModal({
      content: "This action will clear the search history (irreversible)",
      onOk: () => {
        SearchHistoryService.clearSearchHistory();
        dispatch({
          type: SEARCH_HISTORY_ACTIONS.SET_SEARCH_HISTORY,
          payload: [],
        });
      },
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
      <div className="h-screen flex flex-col gap-2">
        <SearchHistoryHeader setIsModalOpen={setIsModalOpen} />
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

export default SearchHistory;
