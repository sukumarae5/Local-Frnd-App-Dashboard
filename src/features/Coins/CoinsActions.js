import {
  FETCH_COINS_REQUEST,
  FETCH_COINS_SUCCESS,
  FETCH_COINS_FAILURE,
  ADD_COINS_REQUEST,
  ADD_COINS_SUCCESS,
  ADD_COINS_FAILURE,
  DELETE_COINS_REQUEST,
  DELETE_COINS_SUCCESS,
  DELETE_COINS_FAILURE,
  UPDATE_COINS_REQUEST,
  UPDATE_COINS_SUCCESS,
  UPDATE_COINS_FAILURE,
  RESET_UPDATE_COINS_STATE,
} from "./CoinsType";
export const coinsFetchRequest = () => ({
  type: FETCH_COINS_REQUEST,
});

export const coinsFetchSuccess = (coins) => ({
  type: FETCH_COINS_SUCCESS,
  payload: coins,
});

export const coinsFetchFailure = (error) => ({
  type: FETCH_COINS_FAILURE,
  payload: error,
});

export const addCoinsRequest = (payload) => ({
  type: ADD_COINS_REQUEST,
  payload,
});

export const addCoinsSuccess = (data) => ({
  type: ADD_COINS_SUCCESS,
  payload: data,
});

export const addCoinsFailure = (error) => ({
  type: ADD_COINS_FAILURE,
  payload: error,
});

export const deleteCoinsRequest = (id) => ({
  type: DELETE_COINS_REQUEST,
  payload: id,
});

export const deleteCoinsSuccess = (id) => ({
  type: DELETE_COINS_SUCCESS,
  payload: id,
});

export const deleteCoinsFailure = (error) => ({
  type: DELETE_COINS_FAILURE,
  payload: error,
});

export const updateCoinsRequest = (payload) => ({
  type: UPDATE_COINS_REQUEST,
  payload,
});

export const updateCoinsSuccess = (data) => ({
  type: UPDATE_COINS_SUCCESS,
  payload: data,
});

export const updateCoinsFailure = (error) => ({
  type: UPDATE_COINS_FAILURE,
  payload: error,
});

export const resetUpdateCoinsState = () => ({
  type: RESET_UPDATE_COINS_STATE,
});