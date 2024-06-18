import { useContext } from "react";
import { SEARCH_HISTORY_ACTIONS, SearchHistoryContext } from "../../context";

import EmptySearchHistory from "../EmptySearchHistory";
import SearchHistoryTabFilters from "./widgets/SearchHistoryTabFilters";
import SearchHistoryHeader from "./widgets/SearchHistoryHeader";
import SearchHistoryFooter from "./widgets/SearchHistoryFooter";
import SearchHistoryList from "./widgets/SearchHistoryList";

const SearchHistoryContent = ({
  searchHistory,
  clearSearchHistory,
  searchWord,
  removeSearch,
  removeSelectedHistory,
}) => {
  const {
    state: { selectedHistory },
    dispatch,
  } = useContext(SearchHistoryContext);
  const setSelectedHistory = (payload) =>
    dispatch({ type: SEARCH_HISTORY_ACTIONS.SET_SELECTED_HISTORY, payload });
  const addOrRemoveSelectedHistory = (searchId) => {
    if (selectedHistory?.includes(searchId)) {
      const fileredSelectedHistory = selectedHistory?.filter(
        (element) => element !== searchId
      );
      setSelectedHistory(fileredSelectedHistory);
    } else setSelectedHistory([searchId, ...selectedHistory]);
  };
  const getContent = () => {
    if (!searchHistory?.length)
      return (
        <EmptySearchHistory text="No search history found for the applied filters" />
      );
    return (
      <SearchHistoryList
        searchHistory={searchHistory}
        searchWord={searchWord}
        removeSearch={removeSearch}
        addOrRemoveSelectedHistory={addOrRemoveSelectedHistory}
      />
    );
  };
  return (
    <div className="flex flex-col flex-grow">
      <SearchHistoryHeader />
      <SearchHistoryTabFilters />
      {getContent()}
      <SearchHistoryFooter
        clearSearchHistory={clearSearchHistory}
        removeSelectedHistory={removeSelectedHistory}
        selectedSearchHistoryCount={selectedHistory?.length}
        showClearSelected={!!selectedHistory?.length}
      />
    </div>
  );
};

export default SearchHistoryContent;
