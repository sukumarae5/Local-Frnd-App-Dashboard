// src/features/photos/photosSaga.js

import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  PHOTOS_DELETE_REQUEST,
  PHOTOS_EDIT_REQUEST,
  PHOTOS_FETCH_REQUEST,
} from "./photosType";

import {
  fetchPhotosSuccess,
  fetchPhotosFailure,
  DeletePhotosSuccess,
  EditPhotosFailure,
  EditPhotosSuccess,
} from "./photosAction";

import {
  USERPHOTOS,
  USERPHOTOSDELETE,
  USERPHOTOSEDIT,
} from "../../api/PhotosApi";

// =======================
// API CALLS
// =======================

// fetch photos
function* apiFetchPhotos() {
  console.log("GET:", USERPHOTOS);
  try {
    const response = yield call(axios.get, USERPHOTOS);
    return response.data.photos;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch photos";
    throw new Error(message);
  }
}

// delete photo
function* apiDeletePhotos({ user_id, photo_id }) {
  const url = `${USERPHOTOSDELETE}/${user_id}/${photo_id}`;
  console.log("DELETE:", url);

  try {
    const response = yield call(axios.delete, url);
    return response.data; // { success, message }
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to delete photo";
    throw new Error(message);
  }
}

// edit photo
function* apiEditPhotos({ user_id, photo_id, data }) {
  const url = `${USERPHOTOSEDIT}/${user_id}/${photo_id}`;
  console.log("PUT:", url, data);

  try {
    const response = yield call(axios.put, url, data);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to edit photo";
    throw new Error(message);
  }
}

// =======================
// HANDLER SAGAS
// =======================

function* handleFetchPhotos() {
  try {
    const data = yield call(apiFetchPhotos);
    yield put(fetchPhotosSuccess(data));
  } catch (err) {
    yield put(fetchPhotosFailure(err.message));
  }
}

function* handleDeletePhotos(action) {
  try {
    const { user_id, photo_id } = action.payload;

    const backendResponse = yield call(apiDeletePhotos, { user_id, photo_id });

    yield put(DeletePhotosSuccess({ user_id, photo_id }));

    const message = backendResponse?.message || "Photo deleted successfully.";

    // 🔔 Alert ONLY — no Redux error update
    yield call(() => {
      alert(message);
      window.location.reload();
    });
  } catch (err) {
    const msg = err.message || "Failed to delete photo";

    // ❌ DO NOT call DeletePhotosFailure()
    //    This prevents the error from showing on the page.

    // 🔔 Only alert
    yield call(() => {
      alert(msg);
      window.location.reload();
    });
  }
}

function* handleEditPhotos(action) {
  try {
    const { user_id, photo_id, data } = action.payload;

    const result = yield call(apiEditPhotos, { user_id, photo_id, data });

    yield put(EditPhotosSuccess(result));

    const message = result?.message || "Photo updated successfully.";

    yield call(() => {
      alert(message);
      window.location.reload();
    });
  } catch (err) {
    const msg = err.message || "Failed to update photo";

    yield put(EditPhotosFailure(msg));

    yield call(() => alert(msg));
  }
}

// =======================
// ROOT SAGA
// =======================

export default function* watchPhotosSaga() {
  yield takeLatest(PHOTOS_FETCH_REQUEST, handleFetchPhotos);
  yield takeLatest(PHOTOS_DELETE_REQUEST, handleDeletePhotos);
  yield takeLatest(PHOTOS_EDIT_REQUEST, handleEditPhotos);
}
