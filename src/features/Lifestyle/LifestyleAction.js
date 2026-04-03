import {
  LIFESTYLE_FETCH_REQUEST,
  LIFESTYLE_FETCH_SUCCESS,
  LIFESTYLE_FETCH_FAILURE,
  LIFESTYLE_ADD_REQUEST,
  LIFESTYLE_ADD_SUCCESS,
  LIFESTYLE_ADD_FAILURE,
  LIFESTYLE_ADD_RESET,
  LIFESTYLE_UPDATE_REQUEST,
  LIFESTYLE_UPDATE_SUCCESS,
  LIFESTYLE_UPDATE_FAILURE,
  LIFESTYLE_UPDATE_RESET,
  LIFESTYLE_DELETE_REQUEST,
  LIFESTYLE_DELETE_SUCCESS,
  LIFESTYLE_DELETE_FAILURE,
  LIFESTYLE_DELETE_RESET,
} from "./LifestyleType";

export const lifestyleFetchRequest = () => ({
  type: LIFESTYLE_FETCH_REQUEST,
});

export const lifestyleFetchSuccess = (payload) => ({
  type: LIFESTYLE_FETCH_SUCCESS,
  payload,
});

export const lifestyleFetchFailure = (payload) => ({
  type: LIFESTYLE_FETCH_FAILURE,
  payload,
});

export const lifestyleAddRequest = (payload) => ({
  type: LIFESTYLE_ADD_REQUEST,
  payload,
});

export const lifestyleAddSuccess = (payload) => ({
  type: LIFESTYLE_ADD_SUCCESS,
  payload,
});

export const lifestyleAddFailure = (payload) => ({
  type: LIFESTYLE_ADD_FAILURE,
  payload,
});

export const lifestyleAddReset = () => ({
  type: LIFESTYLE_ADD_RESET,
});

export const lifestyleUpdateRequest = (payload) => ({
  type: LIFESTYLE_UPDATE_REQUEST,
  payload,
});

export const lifestyleUpdateSuccess = (payload) => ({
  type: LIFESTYLE_UPDATE_SUCCESS,
  payload,
});

export const lifestyleUpdateFailure = (payload) => ({
  type: LIFESTYLE_UPDATE_FAILURE,
  payload,
});

export const lifestyleUpdateReset = () => ({
  type: LIFESTYLE_UPDATE_RESET,
});

export const lifestyleDeleteRequest = (payload) => ({
  type: LIFESTYLE_DELETE_REQUEST,
  payload,
});

export const lifestyleDeleteSuccess = (payload) => ({
  type: LIFESTYLE_DELETE_SUCCESS,
  payload,
});

export const lifestyleDeleteFailure = (payload) => ({
  type: LIFESTYLE_DELETE_FAILURE,
  payload,
});

export const lifestyleDeleteReset = () => ({
  type: LIFESTYLE_DELETE_RESET,
});