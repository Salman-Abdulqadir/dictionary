import React from "react";

import { IoInformationCircleOutline } from "react-icons/io5";
import Tooltip from "../../Tooltip";
import {
  SEARCH_HISTORY_ACTIONS,
  useSearchHistory,
} from "../../../contexts/SearchHistoryContext";

const intervalOptions = [
  { title: "Daily", interval: 5000 },
  { title: "Weekly", interval: 500000 },
  { title: "Monthly", interval: 5000000 },
];
const Header = () => {
  const {
    state: { clearingEnabled },
    dispatch,
  } = useSearchHistory();
  const toggleHandler = () =>
    dispatch({ type: SEARCH_HISTORY_ACTIONS.TOGGLE_CLEARING_ENABLED });
  return (
    <header className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h2 className="font-bold">Clearing search history</h2>
          <Tooltip
            title={
              "If activated the search history will be cleared in the provided interval from the localstorage."
            }
          >
            <button className="btn btn-sm btn-ghost btn-circle">
              <IoInformationCircleOutline size={20} />
            </button>
          </Tooltip>
        </div>
        <input
          type="checkbox"
          className="toggle toggle-sm toggle-primary"
          checked={clearingEnabled}
          onChange={toggleHandler}
        />
      </div>
      {!clearingEnabled && (
        <div className="bg-primary text-primary-content flex items-center gap-2 p-2 rounded-lg text-sm">
          <IoInformationCircleOutline size={20} />
          <span>Enable clearing search history to select an interval</span>
        </div>
      )}
    </header>
  );
};

const Options = () => {
  const {
    state: { clearingInterval, clearingEnabled },
    dispatch,
  } = useSearchHistory();
  const setClearingInterval = (interval) =>
    dispatch({
      type: SEARCH_HISTORY_ACTIONS.SET_CLEARING_INTERVAL,
      payload: interval,
    });
  return (
    <div className="space-y-4">
      {intervalOptions?.map((interval, index) => (
        <div
          key={`${interval.title}-${index}`}
          className="flex items-center gap-2"
        >
          <input
            type="radio"
            className="radio radio-sm radio-primary"
            checked={interval.interval === clearingInterval}
            onChange={() => setClearingInterval(interval.interval)}
            disabled={!clearingEnabled}
          />
          <h2>{interval.title}</h2>
        </div>
      ))}
    </div>
  );
};
const SettingsIntervalOptions = () => {
  return (
    <div className="bg-base-200 p-4 rounded-lg space-y-4">
      <Header />
      <Options />
    </div>
  );
};

export default SettingsIntervalOptions;
