import { call, put, takeLatest } from "redux-saga/effects";
import {
  PHOTOS_DELETE_REQUEST,
  PHOTOS_FETCH_REQUEST,
} from "../photos/photosType";
import {
  fetchPhotosSuccess,
  fetchPhotosFailure,
  DeletePhotosSuccess,
  DeletePhotosFailure,
} from "../photos/photosAction";
import { USERPHOTOS, USERPHOTOSDELETE } from "../../api/PhotosApi";
import axios from "axios";

// --- API CALLS ---

function* apiFetchPhotos() {
  console.log("GET:", USERPHOTOS);
  try {
    const response = yield call(axios.get, USERPHOTOS);
    console.log("Fetch photos response:", response);
    // assuming response.data.photos is array
    return response.data.photos;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch photos";
    throw new Error(message);
  }
}

// DELETE: delete single photo by user_id + photo_id
function* apiDeletePhotos({ user_id, photo_id }) {
  // assuming backend endpoint: /api/photo/admin/{userId}/{photoId}
  const url = `${USERPHOTOSDELETE}/${user_id}/${photo_id}`;
  console.log("DELETE:", url);

  try {
    yield call(axios.delete, url);
    // return both ids so reducer can update
    return { user_id, photo_id };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to delete photo";
    throw new Error(message);
  }
}

// --- HANDLERS ---

function* handleFetchPhotos() {
  try {
    const data = yield call(apiFetchPhotos);
    yield put(fetchPhotosSuccess(data));
  } catch (err) {
    yield put(fetchPhotosFailure(err.message || "Failed to fetch photos"));
  }
}

function* handleDeletePhotos(action) {
  try {
    const { user_id, photo_id } = action.payload || {};
    const deletedInfo = yield call(apiDeletePhotos, { user_id, photo_id });
    yield put(DeletePhotosSuccess(deletedInfo));
  } catch (err) {
    yield put(DeletePhotosFailure(err.message || "Failed to delete photo"));
  }
}

// --- WATCHER ---

export default function* watchPhotosSaga() {
  yield takeLatest(PHOTOS_FETCH_REQUEST, handleFetchPhotos);
  yield takeLatest(PHOTOS_DELETE_REQUEST, handleDeletePhotos);
}
