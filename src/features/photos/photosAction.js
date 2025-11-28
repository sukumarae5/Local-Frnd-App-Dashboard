// src/features/photos/photosAction.js

import {
  PHOTOS_FETCH_REQUEST,
  PHOTOS_FETCH_SUCCESS,
  PHOTOS_FETCH_FAILURE,
  PHOTOS_DELETE_REQUEST,
  PHOTOS_DELETE_SUCCESS,
  PHOTOS_DELETE_FAILURE,
  PHOTOS_EDIT_REQUEST,
  PHOTOS_EDIT_SUCCESS,
  PHOTOS_EDIT_FAILURE,
} from "./photosType";

// --- FETCH LIST ---

export const fetchPhotosRequest = () => ({
  type: PHOTOS_FETCH_REQUEST,
});

export const fetchPhotosSuccess = (data) => ({
  type: PHOTOS_FETCH_SUCCESS,
  payload: data,
});

export const fetchPhotosFailure = (error) => ({
  type: PHOTOS_FETCH_FAILURE,
  payload: error,
});

// --- DELETE SINGLE PHOTO ---
// payload = { user_id, photo_id }

export const DeletePhotosRequest = ({ user_id, photo_id }) => ({
  type: PHOTOS_DELETE_REQUEST,
  payload: { user_id, photo_id },
});

export const DeletePhotosSuccess = ({ user_id, photo_id }) => ({
  type: PHOTOS_DELETE_SUCCESS,
  payload: { user_id, photo_id },
});

export const DeletePhotosFailure = (error) => ({
  type: PHOTOS_DELETE_FAILURE,
  payload: error,
});

// --- EDIT SINGLE PHOTO ---
// payload = { user_id, photo_id, data }  // data: fields to update

export const EditPhotosRequest = ({ user_id, photo_id, data }) => ({
  type: PHOTOS_EDIT_REQUEST,
  payload: { user_id, photo_id, data },
});

// Expect backend to return the updated photo object
export const EditPhotosSuccess = (updatedPhoto) => ({
  type: PHOTOS_EDIT_SUCCESS,
  payload: updatedPhoto,
});

export const EditPhotosFailure = (error) => ({
  type: PHOTOS_EDIT_FAILURE,
  payload: error,
});
