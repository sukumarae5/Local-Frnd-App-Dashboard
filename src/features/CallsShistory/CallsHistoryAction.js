// src/features/CallsHistory/CallsHistoryAction.js

import {
  FETCH_CALLS_HISTORY_REQUEST,
  FETCH_CALLS_HISTORY_SUCCESS,
  FETCH_CALLS_HISTORY_FAILURE,
} from "./CallsHistoryType";

export const callsHistoryFetchRequest = (userid) => ({
  type: FETCH_CALLS_HISTORY_REQUEST,
  payload: userid,
});


export const callsHistoryFetchSuccess = (payload) => ({
  type: FETCH_CALLS_HISTORY_SUCCESS,
  payload,
});

export const callsHistoryFetchFailure = (error) => ({
  type: FETCH_CALLS_HISTORY_FAILURE,
  payload: error,
});