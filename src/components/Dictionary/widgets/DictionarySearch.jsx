import React from "react";
import { IoSearch } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
const DictionarySearch = ({
  onSearch,
  searchValue,
  setSearchValue,
  openSearchHistory,
}) => {
  const onFormSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };
  return (
    <form className="flex items-center gap-2">
      <label className="input flex flex-1 items-center gap-2 rounded-lg bg-base-200">
        <input
          type="text"
          className="grow"
          placeholder="Search Word"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target?.value)}
        />
        <button
          className="btn-ghost rounded-full"
          onClick={onFormSubmit}
          type="submit"
        >
          <IoSearch size={25} className="text-primary" />
        </button>
      </label>
      <button
        className="btn btn-ghost btn-circle"
        onClick={(e) => {
          e.preventDefault();
          openSearchHistory();
        }}
      >
        <FaHistory size={20} />
      </button>
    </form>
  );
};

export default DictionarySearch;
