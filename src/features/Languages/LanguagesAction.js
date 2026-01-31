// src/features/Languages/LanguagesAction.js

import {
  FETCH_LANGUAGES_REQUEST,
  FETCH_LANGUAGES_SUCCESS,
  FETCH_LANGUAGES_FAILURE,

  DELETE_LANGUAGE_REQUEST,
  DELETE_LANGUAGE_SUCCESS,
  DELETE_LANGUAGE_FAILURE,

  ADD_LANGUAGE_REQUEST,
  ADD_LANGUAGE_SUCCESS,
  ADD_LANGUAGE_FAILURE,

  EDIT_LANGUAGE_REQUEST,
  EDIT_LANGUAGE_SUCCESS,
  EDIT_LANGUAGE_FAILURE,
} from "./LanguagesType";

// FETCH
export const fetchLanguagesRequest = () => ({ type: FETCH_LANGUAGES_REQUEST });
export const fetchLanguagesSuccess = (data) => ({
  type: FETCH_LANGUAGES_SUCCESS,
  payload: data,
});
export const fetchLanguagesFailure = (error) => ({
  type: FETCH_LANGUAGES_FAILURE,
  payload: error,
});

// DELETE
export const deleteLanguageRequest = (id) => ({
  type: DELETE_LANGUAGE_REQUEST,
  payload: id,
});
export const deleteLanguageSuccess = (id) => ({
  type: DELETE_LANGUAGE_SUCCESS,
  payload: id,
});
export const deleteLanguageFailure = (error) => ({
  type: DELETE_LANGUAGE_FAILURE,
  payload: error,
});

// ADD
export const addLanguageRequest = (language) => ({
  type: ADD_LANGUAGE_REQUEST,
  payload: language,
});
export const addLanguageSuccess = (language) => ({
  type: ADD_LANGUAGE_SUCCESS,
  payload: language,
});
export const addLanguageFailure = (error) => ({
  type: ADD_LANGUAGE_FAILURE,
  payload: error,
});

// EDIT
export const editLanguageRequest = (language) => ({
  type: EDIT_LANGUAGE_REQUEST,
  payload: language,
});
export const editLanguageSuccess = (language) => ({
  type: EDIT_LANGUAGE_SUCCESS,
  payload: language,
});
export const editLanguageFailure = (error) => ({
  type: EDIT_LANGUAGE_FAILURE,
  payload: error,
});
