import {
  FETCH_LIFESTYLECATEGORY_REQUEST,
  FETCH_LIFESTYLECATEGORY_SUCCESS,
  FETCH_LIFESTYLECATEGORY_FAILURE,
  ADD_LIFESTYLECATEGORY_REQUEST,
  ADD_LIFESTYLECATEGORY_SUCCESS,
  ADD_LIFESTYLECATEGORY_FAILURE,
  UPDATE_LIFESTYLECATEGORY_REQUEST,
  UPDATE_LIFESTYLECATEGORY_SUCCESS,
  UPDATE_LIFESTYLECATEGORY_FAILURE,
  DELETE_LIFESTYLECATEGORY_REQUEST,
  DELETE_LIFESTYLECATEGORY_SUCCESS,
  DELETE_LIFESTYLECATEGORY_FAILURE,
} from "./LifestylecategoryType";

export const fetchLifestylecategoryRequest = () => ({
  type: FETCH_LIFESTYLECATEGORY_REQUEST,
});

export const fetchLifestylecategorySuccess = (payload) => ({
  type: FETCH_LIFESTYLECATEGORY_SUCCESS,
  payload,
});

export const fetchLifestylecategoryFailure = (payload) => ({
  type: FETCH_LIFESTYLECATEGORY_FAILURE,
  payload,
});

export const addLifestylecategoryRequest = (payload) => ({
  type: ADD_LIFESTYLECATEGORY_REQUEST,
  payload,
});

export const addLifestylecategorySuccess = (payload) => ({
  type: ADD_LIFESTYLECATEGORY_SUCCESS,
  payload,
});

export const addLifestylecategoryFailure = (payload) => ({
  type: ADD_LIFESTYLECATEGORY_FAILURE,
  payload,
});

export const updateLifestylecategoryRequest = (payload) => ({
  type: UPDATE_LIFESTYLECATEGORY_REQUEST,
  payload,
});

export const updateLifestylecategorySuccess = (payload) => ({
  type: UPDATE_LIFESTYLECATEGORY_SUCCESS,
  payload,
});

export const updateLifestylecategoryFailure = (payload) => ({
  type: UPDATE_LIFESTYLECATEGORY_FAILURE,
  payload,
});

export const deleteLifestylecategoryRequest = (payload) => ({
  type: DELETE_LIFESTYLECATEGORY_REQUEST,
  payload,
});

export const deleteLifestylecategorySuccess = (payload) => ({
  type: DELETE_LIFESTYLECATEGORY_SUCCESS,
  payload,
});

export const deleteLifestylecategoryFailure = (payload) => ({
  type: DELETE_LIFESTYLECATEGORY_FAILURE,
  payload,
});