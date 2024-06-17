import React, { useEffect, useState } from "react";

// icons
import { FaHistory, FaRegTrashAlt } from "react-icons/fa";
import { IoClose, IoSearch } from "react-icons/io5";

import Drawer from "../Drawer";
import EmptySearchHistory from "./widgets/EmptySearchHistory";
import DrawerTitle from "./widgets/DrawerTitle";
import SearchHistoryContent from "./widgets/SearchHistoryContent";

//services
import { SearchHistoryService } from "../../services/searchHistory.service";

const SearchHistory = ({ isModalOpen, setIsModalOpen }) => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const clearSearchHistory = () => {
    const confirm = window.confirm(
      "Are you sure you want to clear the search history? This action is irreversible"
    );
    if (!confirm) return;
    SearchHistoryService.clearSearchHistory();
    setSearchHistory([]);
  };
  useEffect(() => {
    if (isModalOpen) {
      setSearchHistory(SearchHistoryService.getSearchHistories());
    }
  }, [isModalOpen]);

  let filteredSearchHistory = searchHistory;
  if (searchValue) {
    filteredSearchHistory = filteredSearchHistory?.filter((element) =>
      element?.searchString?.toLowerCase()?.includes(searchValue?.toLowerCase())
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
        />
      ) : (
        <EmptySearchHistory />
      )}
    </Drawer>
  );
};

export default SearchHistory;
