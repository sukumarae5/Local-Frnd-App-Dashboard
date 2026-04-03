import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { LIFESTYLE } from "../../api/LifestyleApi";
import {
  LIFESTYLE_FETCH_REQUEST,
  LIFESTYLE_ADD_REQUEST,
  LIFESTYLE_UPDATE_REQUEST,
  LIFESTYLE_DELETE_REQUEST,
} from "./LifestyleType";
import {
  lifestyleFetchSuccess,
  lifestyleFetchFailure,
  lifestyleAddSuccess,
  lifestyleAddFailure,
  lifestyleUpdateSuccess,
  lifestyleUpdateFailure,
  lifestyleDeleteSuccess,
  lifestyleDeleteFailure,
} from "./LifestyleAction";

const fetchLifestyleApi = () => axios.get(LIFESTYLE);

const addLifestyleApi = (payload) => axios.post(LIFESTYLE, payload);

const updateLifestyleApi = (payload) =>
  axios.put(`${LIFESTYLE}/${payload.lifestyle_id}`, payload);
console.log(updateLifestyleApi)
const deleteLifestyleApi = (lifestyle_id) =>
  axios.delete(`${LIFESTYLE}/${lifestyle_id}`);

function* handleFetchLifestyle() {
  try {
    const response = yield call(fetchLifestyleApi);
    const result = response?.data?.data || response?.data || [];
    yield put(lifestyleFetchSuccess(result));
  } catch (error) {
    yield put(
      lifestyleFetchFailure(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch lifestyle data"
      )
    );
  }
}

function* handleAddLifestyle(action) {
  try {
    const response = yield call(addLifestyleApi, action.payload);
    yield put(lifestyleAddSuccess(response?.data || action.payload));
  } catch (error) {
    yield put(
      lifestyleAddFailure(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to add lifestyle"
      )
    );
  }
}

function* handleUpdateLifestyle(action) {
  try {
    console.log(action)
    const response = yield call(updateLifestyleApi, action.payload);
    console.log(response)
    yield put(lifestyleUpdateSuccess(response?.data || action.payload));
  } catch (error) {
    yield put(
      lifestyleUpdateFailure(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update lifestyle"
      )
    );
  }
}

function* handleDeleteLifestyle(action) {
  try {
    const response = yield call(deleteLifestyleApi, action.payload);
    yield put(lifestyleDeleteSuccess(response?.data || action.payload));
  } catch (error) {
    yield put(
      lifestyleDeleteFailure(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to delete lifestyle"
      )
    );
  }
}

export function* watchFetchLifestyle() {
  yield takeLatest(LIFESTYLE_FETCH_REQUEST, handleFetchLifestyle);
  yield takeLatest(LIFESTYLE_DELETE_REQUEST, handleDeleteLifestyle);
    yield takeLatest(LIFESTYLE_UPDATE_REQUEST, handleUpdateLifestyle);
    yield takeLatest(LIFESTYLE_ADD_REQUEST, handleAddLifestyle);

}


