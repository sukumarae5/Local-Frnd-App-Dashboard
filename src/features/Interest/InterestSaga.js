import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { INTEREST } from "../../api/InterestApi";
import {
  FETCH_INTEREST_REQUEST,
  ADD_INTEREST_REQUEST,
  EDIT_INTEREST_REQUEST,
  DELETE_INTEREST_REQUEST,
} from "./InterestType";
import {
  fetchInterestSuccess,
  fetchInterestFailure,
  addInterestSuccess,
  addInterestFailure,
  editInterestSuccess,
  editInterestFailure,
  deleteInterestSuccess,
  deleteInterestFailure,
  fetchInterestRequest,
} from "./InterestAction";

const fetchInterestApi = () => axios.get(INTEREST);

const addInterestApi = (payload) => axios.post(INTEREST, payload);

const editInterestApi = ({ id, data }) => axios.put(`${INTEREST}/${id}`, data);

const deleteInterestApi = (id) => axios.delete(`${INTEREST}/${id}`);

function* fetchInterestSaga() {
  try {
    const response = yield call(fetchInterestApi);

    const result = Array.isArray(response.data)
      ? response.data
      : response.data?.data || [];

    yield put(fetchInterestSuccess(result));
  } catch (error) {
    yield put(
      fetchInterestFailure(
        error?.response?.data?.message || error.message || "Failed to fetch interests"
      )
    );
  }
}

function* addInterestSaga(action) {
  try {
    const response = yield call(addInterestApi, action.payload);
    yield put(addInterestSuccess(response.data));
    yield put(fetchInterestRequest());
  } catch (error) {
    yield put(
      addInterestFailure(
        error?.response?.data?.message || error.message || "Failed to add interest"
      )
    );
  }
}

function* editInterestSaga(action) {
  try {
    const response = yield call(editInterestApi, action.payload);
    yield put(editInterestSuccess(response.data));
    yield put(fetchInterestRequest());
  } catch (error) {
    yield put(
      editInterestFailure(
        error?.response?.data?.message || error.message || "Failed to edit interest"
      )
    );
  }
}

function* deleteInterestSaga(action) {
  try {
    const response = yield call(deleteInterestApi, action.payload);
    yield put(deleteInterestSuccess(response?.data));
    yield put(fetchInterestRequest());
  } catch (error) {
    yield put(
      deleteInterestFailure(
        error?.response?.data?.message || error.message || "Failed to delete interest"
      )
    );
  }
}

export function* watchFetchInterest() {
yield takeLatest(FETCH_INTEREST_REQUEST, fetchInterestSaga);
yield takeLatest(DELETE_INTEREST_REQUEST, deleteInterestSaga);
yield takeLatest(EDIT_INTEREST_REQUEST, editInterestSaga);
yield takeLatest(ADD_INTEREST_REQUEST, addInterestSaga);
}



