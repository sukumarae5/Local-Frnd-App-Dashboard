// src/features/user/userSaga.js
import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";
import { DELETE_API, EDIT_API, USERDATA } from "../../api/userApi";
import {
  userDeleteFailure,
  userDeleteSuccess,
  userEditFailure,
  userEditSuccess,
  userFetchFailure,
  userFetchSuccess,
} from "./userAction";
import {
  DELETE_USER_REQUEST,
  EDIT_USER_REQUEST,
  FETCH_USER_REQUEST,
} from "./userType";

function* fetchUsers() {
  try {
    const response = yield call(axios.get, USERDATA);
    const list = response.data?.users ?? response.data ?? [];
    yield put(userFetchSuccess(list));
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Failed to fetch users";
    yield put(userFetchFailure(message));
  }
}

function* editUsers(action) {
  try {
    const { id, data } = action.payload || {};
    if (!id) throw new Error("Missing user id for edit");

    const response = yield call(axios.put, `${EDIT_API}/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });

    // send full response body: { success, message, result, ... }
    const body = response.data;
    yield put(userEditSuccess(body));
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Failed to edit user";
    yield put(userEditFailure(message));
  }
}

function* deleteUsers(action) {
  try {
    const { id } = action.payload || {};
    if (!id) throw new Error("Missing user id for delete");

    yield call(axios.delete, `${DELETE_API}/${id}`);
    yield put(userDeleteSuccess(id));
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || "Failed to delete user";
    yield put(userDeleteFailure(message));
  }
}

function* watchFetchUsers() {
  yield takeLatest(FETCH_USER_REQUEST, fetchUsers);
}
function* watchEditUsers() {
  yield takeLatest(EDIT_USER_REQUEST, editUsers);
}
function* watchDeleteUsers() {
  yield takeLatest(DELETE_USER_REQUEST, deleteUsers);
}

export default function* userSaga() {
  yield all([watchFetchUsers(), watchEditUsers(), watchDeleteUsers()]);
}
