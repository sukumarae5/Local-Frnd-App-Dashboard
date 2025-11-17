// src/features/user/userSaga.js
import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

import { EDIT_API, USERDATA } from "../../api/userApi"; // e.g., http://<ip>/api/user
import { userEditFailure, userEditSuccess, userFetchFailure, userFetchSuccess } from "./userAction";
import { EDIT_USER_REQUEST, FETCH_USER_REQUEST } from "./userType";

function* fetchUsers(action) {
  try {
    const response = yield call(axios.get, USERDATA);
    // adjust shape to your API, e.g. response.data.users or response.data
    const list = response.data?.users ?? response.data ?? [];
    yield put(userFetchSuccess(list));
  } catch (error) {
    yield put(userFetchFailure(error.response?.data?.message || error.message));
  }
}

function* editUsers(action) {
  try {
    const { id, data } = action.payload || {};
    if (!id) throw new Error("Missing user id for edit");
    console.log(id)
    const response = yield call(axios.put, `${EDIT_API}/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    // If API returns { user: {...} }, extract it; else take body
    const updated = response.data?.user ?? response.data;

    yield put(userEditSuccess(updated));
  } catch (error) {
    const message = error.response?.data?.message || error.message || "Failed to edit user";
    yield put(userEditFailure(message));
  }
}

function* watchFetchUsers() {
  yield takeLatest(FETCH_USER_REQUEST, fetchUsers);
}
function* watchEditUsers() {
  yield takeLatest(EDIT_USER_REQUEST, editUsers);
}

export default function* userSaga() {
  yield all([watchFetchUsers(), watchEditUsers()]);
}
