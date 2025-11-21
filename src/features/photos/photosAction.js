import {
  PHOTOS_FETCH_REQUEST,
  PHOTOS_FETCH_SUCCESS,
  PHOTOS_FETCH_FAILURE,
  PHOTOS_DELETE_REQUEST,
  PHOTOS_DELETE_SUCCESS,
  PHOTOS_DELETE_FAILURE,
} from "../photos/photosType";

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
