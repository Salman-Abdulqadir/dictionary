import { useContext } from "react";
import { SearchHistoryContext } from "../../../context";

import { API_STATES } from "../../../../../hooks/useApi.hook";
// icons
import { LuClock9 } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const SearchHistoryList = ({
  searchHistory,
  searchWord,
  removeSearch,
  addOrRemoveSelectedHistory,
}) => {
  const {
    state: { selectedHistory },
  } = useContext(SearchHistoryContext);
  return (
    <div className="flex flex-col flex-grow overflow-scroll h-16 gap-4">
      {searchHistory?.map((search, index) => (
        <div
          key={`${index}-${search?.id}`}
          className={`flex h-fit transition-all duration-200 ${
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
            className={`py-2 px-4 rounded-lg flex-1 flex items-center justify-between gap-2 h-full`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-bold">{search?.searchString}</h4>
              </div>

              <h4 className="text-sm flex items-center gap-1">
                <LuClock9 /> {new Date(search?.searchedDate)?.toLocaleString()}
              </h4>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="p-0"
                onClick={() => searchWord(search?.searchString)}
              >
                <IoSearch size={20} />
              </button>
              <button className="p-0" onClick={() => removeSearch(search?.id)}>
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

export default SearchHistoryList;
