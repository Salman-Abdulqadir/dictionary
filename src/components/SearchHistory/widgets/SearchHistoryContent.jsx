// icons
import { FaRegTrashAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

import EmptySearchHistory from "./EmptySearchHistory";
import SearchHistoryTabFilters from "./SearchHistoryTabFilters";
import { API_STATES } from "../../../hooks/useApi.hook";

const SearchHistoryHeader = ({ searchValue, setSearchValue }) => {
  return (
    <header>
      <label className="input flex flex-1 items-center gap-2 rounded-lg bg-base-200">
        <input
          type="text"
          className="grow"
          placeholder="Search Word"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target?.value)}
        />
        <IoSearch size={25} className="text-primary" />
      </label>
    </header>
  );
};

const SearchHistoryFooter = ({
  clearSearchHistory,
  removeSelectedHistory,
  showClearSelected = false,
  selectedSearchHistoryCount,
}) => {
  return (
    <footer className="sticky bottom-0 flex gap-2">
      {showClearSelected && (
        <button className="flex-1 btn" onClick={removeSelectedHistory}>
          Clear Selected ({selectedSearchHistoryCount})
        </button>
      )}
      <button className="flex-1 btn btn-primary" onClick={clearSearchHistory}>
        Clear all <FaRegTrashAlt size={20} />
      </button>
    </footer>
  );
};

const SearchHistoryList = ({
  searchHistory,
  searchWord,
  removeSearch,
  selectedHistory,
  addOrRemoveSelectedHistory,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {searchHistory?.map((search, index) => (
        <div
          className={`flex flex-grow transition-all duration-200 ${
            selectedHistory?.includes(search?.id)
              ? "bg-base-300"
              : "bg-base-100"
          }`}
        >
          <div
            className={`min-h-full w-1 rounded-l-lg ${
              search?.searchState === API_STATES.ERROR
                ? "bg-red-500"
                : "bg-green-500"
            }`}
          ></div>
          <div
            key={`${search?.id}-${index}`}
            className={`p-2 rounded-lg flex-1 flex items-center justify-between gap-2 h-full`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-bold">{search?.searchString}</h4>
              </div>

              <h4 className="text-primary text-sm">
                {new Date(search?.searchedDate)?.toLocaleString()}
              </h4>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="p-0"
                onClick={() => searchWord(search?.searchString)}
              >
                <IoSearch size={20} />
              </button>
              <button
                className="p-0 text-red-500"
                onClick={() => removeSearch(search?.id)}
              >
                <FaRegTrashAlt size={20} />
              </button>
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={selectedHistory?.includes(search?.id)}
                onChange={() => addOrRemoveSelectedHistory(search?.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
const SearchHistoryContent = ({
  searchHistory,
  clearSearchHistory,
  searchValue,
  setSearchValue,
  searchWord,
  removeSearch,
  selectedState,
  setSelectedState,
  selectedHistory,
  setSelectedHistory,
  removeSelectedHistory,
}) => {
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
        selectedHistory={selectedHistory}
        addOrRemoveSelectedHistory={addOrRemoveSelectedHistory}
      />
    );
  };
  return (
    <div className="flex-1 flex flex-col gap-4 flex-grow">
      <SearchHistoryHeader
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        clearSearchHistory={clearSearchHistory}
      />
      <SearchHistoryTabFilters
        selectedState={selectedState}
        setSelectedState={setSelectedState}
      />
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
