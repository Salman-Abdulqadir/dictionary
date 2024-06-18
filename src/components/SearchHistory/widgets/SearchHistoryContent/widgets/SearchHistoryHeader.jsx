import { useContext } from "react";
import { SEARCH_HISTORY_ACTIONS, SearchHistoryContext } from "../../../context";
import { IoSearch } from "react-icons/io5";

const SearchHistoryHeader = () => {
  const {
    state: { searchValue },
    dispatch,
  } = useContext(SearchHistoryContext);

  const setSearchValue = (payload) =>
    dispatch({ type: SEARCH_HISTORY_ACTIONS.SET_SEARCH_VALUE, payload });
  return (
    <header>
      {/* <label className="input flex flex-1 items-center gap-2 rounded-lg bg-base-200">
        <input
          type="text"
          className="grow"
          placeholder="Search your history"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target?.value)}
        />
        <IoSearch size={25} className="text-primary" />
      </label> */}
    </header>
  );
};

export default SearchHistoryHeader;
