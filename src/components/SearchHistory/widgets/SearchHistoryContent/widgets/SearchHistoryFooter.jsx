import { useContext } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  SEARCH_HISTORY_ACTIONS,
  SearchHistoryContext,
} from "../../../../../contexts/SearchHistoryContext";

const SearchHistoryFooter = ({
  clearSearchHistory,
  removeSelectedHistory,
  showClearSelected = false,
  selectedSearchHistoryCount,
}) => {
  const { dispatch } = useContext(SearchHistoryContext);
  const onUnselect = () =>
    dispatch({
      type: SEARCH_HISTORY_ACTIONS.SET_SELECTED_HISTORY,
      payload: [],
    });
  return (
    <footer className="self-end my-2">
      {showClearSelected ? (
        <div className="flex gap-2">
          <button className="btn" onClick={onUnselect}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={removeSelectedHistory}>
            Clear Selected ({selectedSearchHistoryCount})
          </button>
        </div>
      ) : (
        <button className="btn btn-primary" onClick={clearSearchHistory}>
          Clear all <FaRegTrashAlt size={20} />
        </button>
      )}
    </footer>
  );
};

export default SearchHistoryFooter;
