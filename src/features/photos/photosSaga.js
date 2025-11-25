// photosSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import {
  PHOTOS_FETCH_REQUEST,
  
} from "../photos/photosType";
import {
  fetchPhotosSuccess,
  fetchPhotosFailure,
} from "../photos/photosAction";
import { USERPHOTOS } from "../../api/PhotosApi";
import axios from "axios";


function* apiFetchPhotos() {
  console.log(USERPHOTOS)
  try {
    const response = yield call(axios.get, USERPHOTOS);
    console.log(response)
    return response.data.photos;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch photos";
    throw new Error(message);
  }
}


function* handleFetchPhotos() {
  try {
    const data = yield call(apiFetchPhotos);
    yield put(fetchPhotosSuccess(data));
  } catch (err) {
    yield put(fetchPhotosFailure(err.message || "Failed to fetch photos"));
  }
}



export default function* watchFetchPhotos() {
  yield takeLatest(PHOTOS_FETCH_REQUEST, handleFetchPhotos);
}



