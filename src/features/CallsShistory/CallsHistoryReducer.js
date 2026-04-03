// src/features/CallsHistory/CallsHistoryReducer.js

import {
  FETCH_CALLS_HISTORY_REQUEST,
  FETCH_CALLS_HISTORY_SUCCESS,
  FETCH_CALLS_HISTORY_FAILURE,
} from "./CallsHistoryType";

const initialState = {
  loading: false,
  callsHistory: [],
  error: "",
};

const CallsHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CALLS_HISTORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case FETCH_CALLS_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        callsHistory: action.payload || [],
        error: "",
      };

    case FETCH_CALLS_HISTORY_FAILURE:
      return {
        ...state,
        loading: false,
        callsHistory: [],
        error: action.payload || "Failed to fetch call history",
      };

    default:
      return state;
  }
};

export default CallsHistoryReducer;