import {
  CALLS_FETCH_REQUEST,
  CALLS_FETCH_SUCCESS,
  CALLS_FETCH_FAILURE,
} from "./CallsType";

export const callsFetchRequest = (payload = {}) => ({
  type: CALLS_FETCH_REQUEST,
  payload,
});

export const callsFetchSuccess = (payload) => ({
  type: CALLS_FETCH_SUCCESS,
  payload,
});

export const callsFetchFailure = (payload) => ({
  type: CALLS_FETCH_FAILURE,
  payload,
});