import { useContext } from "react";
import {
  SEARCH_HISTORY_ACTIONS,
  SearchHistoryContext,
} from "../../../contexts/SearchHistoryContext";
import { IoSearch, IoClose } from "react-icons/io5";

const SearchInput = () => {
  const {
    state: { searchValue },
    dispatch,
  } = useContext(SearchHistoryContext);

  const setSearchValue = (payload) =>
    dispatch({ type: SEARCH_HISTORY_ACTIONS.SET_SEARCH_VALUE, payload });
  return (
    <header>
      <label className="input input-md flex flex-2 items-center gap-2 rounded-lg bg-base-200">
        <input
          type="text"
          className="grow"
          placeholder="Search your history"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target?.value)}
        />
        <IoSearch size={20} className="text-primary" />
      </label>
    </header>
  );
};

const SearchHistoryHeader = ({ setIsModalOpen }) => {
  return (
    <div className="sticky top-0 bg-base-100 pt-4 z-50">
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-3 flex-1">
          <button
            className="cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            <IoClose size={20} />
          </button>
          <h4 className="font-bold text-lg">History</h4>
        </div>
        <SearchInput />
      </div>
      <div className="divider p-0 m-0"></div>
    </div>
  );
};

export default SearchHistoryHeader;
