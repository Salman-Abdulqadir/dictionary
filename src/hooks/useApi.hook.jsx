import { useState } from "react";

export const API_STATES = {
  IDLE: "IDLE",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};
const useApi = (method) => {
  const initialState = {
    data: null,
    state: API_STATES.IDLE,
  };
  const [data, setData] = useState(initialState);

  const callMethod = async (...args) => {
    try {
      setData((prevData) => ({ ...prevData, state: API_STATES.LOADING }));
      const response = await method(args);
      setData({ data: response, state: API_STATES.SUCCESS });
    } catch (e) {
      setData({ data: null, state: API_STATES.ERROR });
    }
  };
  const resetState = () => setData(initialState);
  return [data, callMethod, resetState];
};

export default useApi;
