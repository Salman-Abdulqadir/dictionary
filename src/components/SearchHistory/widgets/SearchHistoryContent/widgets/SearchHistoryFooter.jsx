import { FaRegTrashAlt } from "react-icons/fa";

const SearchHistoryFooter = ({
  clearSearchHistory,
  removeSelectedHistory,
  showClearSelected = false,
  selectedSearchHistoryCount,
}) => {
  return (
    <footer className="flex gap-2">
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

export default SearchHistoryFooter;
