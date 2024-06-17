import React, { useEffect, useState } from "react";

import Drawer from "../Drawer";
import EmptySearchHistory from "./widgets/EmptySearchHistory";
import DrawerTitle from "./widgets/DrawerTitle";
import SearchHistoryContent from "./widgets/SearchHistoryContent";

//services
import { SearchHistoryService } from "../../services/searchHistory.service";
import { API_STATES } from "../../hooks/useApi.hook";

const SearchHistory = ({ isModalOpen, setIsModalOpen, onWordClick }) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedHistory, setSelectedHistory] = useState([]);

  const searchWord = (word) => {
    setIsModalOpen(false);
    onWordClick(word);
  };

  const removeSearch = (id) => {
    if (!id) return;
    SearchHistoryService.deleteSearchHistoryById(id);
    clearStates();
    setSearchHistory(SearchHistoryService.getSearchHistories());
  };

  const removeSelectedHistory = () => {
    if (!selectedHistory?.length) return;
    const confim = window.confirm(
      `Are you sure you want to delete, ${selectedHistory?.length} search histories?`
    );
    if (!confim) return;
    SearchHistoryService.removeSelectedHistory(selectedHistory);
    setSelectedHistory([]);
    setSearchHistory(SearchHistoryService.getSearchHistories());
  };
  const clearSearchHistory = () => {
    const confirm = window.confirm(
      "Are you sure you want to clear the search history? This action is irreversible"
    );
    if (!confirm) return;
    SearchHistoryService.clearSearchHistory();
    setSearchHistory([]);
  };
  const clearStates = () => {
    setSearchValue("");
    setSelectedHistory([]);
    setSelectedState("");
  };
  useEffect(() => {
    if (isModalOpen) {
      setSearchHistory(SearchHistoryService.getSearchHistories());
      return;
    }
    clearStates();
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
      <DrawerTitle setIsModalOpen={setIsModalOpen} />
      {searchHistory?.length ? (
        <SearchHistoryContent
          searchHistory={filteredSearchHistory}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          clearSearchHistory={clearSearchHistory}
          searchWord={searchWord}
          removeSearch={removeSearch}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedHistory={selectedHistory}
          setSelectedHistory={setSelectedHistory}
          removeSelectedHistory={removeSelectedHistory}
        />
      ) : (
        <EmptySearchHistory />
      )}
    </Drawer>
  );
};

export default SearchHistory;
