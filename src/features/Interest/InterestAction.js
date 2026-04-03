import {
  FETCH_INTEREST_REQUEST,
  FETCH_INTEREST_SUCCESS,
  FETCH_INTEREST_FAILURE,
  ADD_INTEREST_REQUEST,
  ADD_INTEREST_SUCCESS,
  ADD_INTEREST_FAILURE,
  RESET_ADD_INTEREST_STATE,
  EDIT_INTEREST_REQUEST,
  EDIT_INTEREST_SUCCESS,
  EDIT_INTEREST_FAILURE,
  RESET_EDIT_INTEREST_STATE,
  DELETE_INTEREST_REQUEST,
  DELETE_INTEREST_SUCCESS,
  DELETE_INTEREST_FAILURE,
  RESET_DELETE_INTEREST_STATE,
} from "./InterestType";

export const fetchInterestRequest = () => ({
  type: FETCH_INTEREST_REQUEST,
});

export const fetchInterestSuccess = (payload) => ({
  type: FETCH_INTEREST_SUCCESS,
  payload,
});

export const fetchInterestFailure = (payload) => ({
  type: FETCH_INTEREST_FAILURE,
  payload,
});

export const addInterestRequest = (payload) => ({
  type: ADD_INTEREST_REQUEST,
  payload,
});

export const addInterestSuccess = (payload) => ({
  type: ADD_INTEREST_SUCCESS,
  payload,
});

export const addInterestFailure = (payload) => ({
  type: ADD_INTEREST_FAILURE,
  payload,
});

export const resetAddInterestState = () => ({
  type: RESET_ADD_INTEREST_STATE,
});

export const editInterestRequest = (payload) => ({
  type: EDIT_INTEREST_REQUEST,
  payload,
});

export const editInterestSuccess = (payload) => ({
  type: EDIT_INTEREST_SUCCESS,
  payload,
});

export const editInterestFailure = (payload) => ({
  type: EDIT_INTEREST_FAILURE,
  payload,
});

export const resetEditInterestState = () => ({
  type: RESET_EDIT_INTEREST_STATE,
});

export const deleteInterestRequest = (payload) => ({
  type: DELETE_INTEREST_REQUEST,
  payload,
});

export const deleteInterestSuccess = (payload) => ({
  type: DELETE_INTEREST_SUCCESS,
  payload,
});

export const deleteInterestFailure = (payload) => ({
  type: DELETE_INTEREST_FAILURE,
  payload,
});

export const resetDeleteInterestState = () => ({
  type: RESET_DELETE_INTEREST_STATE,
});