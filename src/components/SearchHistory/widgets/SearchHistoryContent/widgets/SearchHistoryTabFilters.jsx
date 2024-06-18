import React, { useContext } from "react";

import { MdCheck, MdClose } from "react-icons/md";
import { API_STATES } from "../../../../../hooks/useApi.hook";
import { SEARCH_HISTORY_ACTIONS, SearchHistoryContext } from "../../../context";

const tabListItems = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Found",
    icon: <MdCheck size={20} />,
    value: API_STATES.SUCCESS,
  },
  {
    label: "Not Found",
    icon: <MdClose size={20} />,
    value: API_STATES.ERROR,
  },
];
const SearchHistoryTabFilters = () => {
  const {
    state: { selectedState },
    dispatch,
  } = useContext(SearchHistoryContext);

  const setSelectedState = (payload) =>
    dispatch({ type: SEARCH_HISTORY_ACTIONS.SET_SELECTED_STATE, payload });
  return (
    <div role="tablist" className="tabs tabs-boxed">
      {tabListItems.map((tab, index) => (
        <a
          key={index}
          className={`flex items-center gap-1 tab ${
            selectedState === tab?.value ? "tab-active" : ""
          }`}
          onClick={() => setSelectedState(tab.value)}
        >
          {tab?.icon} {tab.label}
        </a>
      ))}
    </div>
  );
};

export default SearchHistoryTabFilters;
