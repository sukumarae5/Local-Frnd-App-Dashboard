// photosActions.js
import {
  PHOTOS_FETCH_REQUEST,
  PHOTOS_FETCH_SUCCESS,
  PHOTOS_FETCH_FAILURE,
  
} from "../photos/photosType";

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
