import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { LIFESTYLECATEGORY } from "../../api/LifestylecategoryApi";
import {
  FETCH_LIFESTYLECATEGORY_REQUEST,
  ADD_LIFESTYLECATEGORY_REQUEST,
  UPDATE_LIFESTYLECATEGORY_REQUEST,
  DELETE_LIFESTYLECATEGORY_REQUEST,
} from "./LifestylecategoryType";
import {
  fetchLifestylecategorySuccess,
  fetchLifestylecategoryFailure,
  addLifestylecategorySuccess,
  addLifestylecategoryFailure,
  updateLifestylecategorySuccess,
  updateLifestylecategoryFailure,
  deleteLifestylecategorySuccess,
  deleteLifestylecategoryFailure,
  fetchLifestylecategoryRequest,
} from "./LifestylecategoryAction";

const fetchLifestylecategoryApi = () => axios.get(LIFESTYLECATEGORY);

const addLifestylecategoryApi = (formData) =>
  axios.post(LIFESTYLECATEGORY, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

const updateLifestylecategoryApi = ({ id, formData }) =>
  axios.put(`${LIFESTYLECATEGORY}/${id}`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

const deleteLifestylecategoryApi = (id) =>
  axios.delete(`${LIFESTYLECATEGORY}/${id}`);

function* fetchLifestylecategorySaga() {
  try {
    const response = yield call(fetchLifestylecategoryApi);
    const data = response?.data;

    if (Array.isArray(data)) {
      yield put(fetchLifestylecategorySuccess(data));
    } else if (Array.isArray(data?.data)) {
      yield put(fetchLifestylecategorySuccess(data.data));
    } else {
      yield put(fetchLifestylecategorySuccess([]));
    }
  } catch (error) {
    yield put(
      fetchLifestylecategoryFailure(
        error?.response?.data?.message ||
          error.message ||
          "Failed to fetch lifestyle category"
      )
    );
  }
}

function* addLifestylecategorySaga(action) {
  try {
    yield call(addLifestylecategoryApi, action.payload);
    yield put(addLifestylecategorySuccess());
    yield put(fetchLifestylecategoryRequest());
  } catch (error) {
    yield put(
      addLifestylecategoryFailure(
        error?.response?.data?.message ||
          error.message ||
          "Failed to add lifestyle category"
      )
    );
  }
}

function* updateLifestylecategorySaga(action) {
  try {
    yield call(updateLifestylecategoryApi, action.payload);
    yield put(updateLifestylecategorySuccess());
    yield put(fetchLifestylecategoryRequest());
  } catch (error) {
    yield put(
      updateLifestylecategoryFailure(
        error?.response?.data?.message ||
          error.message ||
          "Failed to update lifestyle category"
      )
    );
  }
}

function* deleteLifestylecategorySaga(action) {
  try {
    yield call(deleteLifestylecategoryApi, action.payload);
    yield put(deleteLifestylecategorySuccess());
    yield put(fetchLifestylecategoryRequest());
  } catch (error) {
    yield put(
      deleteLifestylecategoryFailure(
        error?.response?.data?.message ||
          error.message ||
          "Failed to delete lifestyle category"
      )
    );
  }
}

export function* watchFetchLifestylecategory() {
yield takeLatest(FETCH_LIFESTYLECATEGORY_REQUEST, fetchLifestylecategorySaga);
yield takeLatest(ADD_LIFESTYLECATEGORY_REQUEST, addLifestylecategorySaga);
    yield takeLatest(UPDATE_LIFESTYLECATEGORY_REQUEST,updateLifestylecategorySaga);
    yield takeLatest(DELETE_LIFESTYLECATEGORY_REQUEST,deleteLifestylecategorySaga);
}





