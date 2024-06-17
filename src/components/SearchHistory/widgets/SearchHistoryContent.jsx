// icons
import { FaRegTrashAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";

const SearchHistoryHeader = ({
  searchValue,
  setSearchValue,
  clearSearchHistory,
}) => {
  return (
    <header className="flex mb-6">
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
      <button className="btn btn-ghost btn-circle" onClick={clearSearchHistory}>
        <FaRegTrashAlt size={20} />
      </button>
    </header>
  );
};

const SearchHistoryList = ({ searchHistory }) => {
  return (
    <div className="flex flex-col gap-4">
      {searchHistory?.map((search, index) => (
        <div
          key={`${search?.id}-${index}`}
          className="bg-base-200 p-2 rounded-lg flex items-center justify-between gap-2 h-full"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-bold">{search?.searchString}</h4>
              {/* {getBadgeByStatus(search?.searchState)} */}
            </div>

            <h4 className="text-primary text-sm">
              {new Date(search?.searchedDate)?.toLocaleString()}
            </h4>
          </div>
          <button className="btn btn-circle btn-ghost">
            <IoSearch size={20} />
          </button>
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
}) => {
  const getContent = () => {
    if (!searchHistory?.length) return <EmptySearchHistory />;
    return <SearchHistoryList searchHistory={searchHistory} />;
  };
  return (
    <div>
      <SearchHistoryHeader
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        clearSearchHistory={clearSearchHistory}
      />
      {getContent()}
    </div>
  );
};

export default SearchHistoryContent;
