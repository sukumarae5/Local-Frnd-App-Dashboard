// src/features/user/userSaga.js
import { call, put, takeLatest, all } from "redux-saga/effects";
import axios from "axios";

import { DELETE_API, EDIT_API, USERDATA } from "../../api/userApi"; // e.g., http://<ip>/api/user
import { userDeleteFailure, userDeleteSuccess, userEditFailure, userEditSuccess, userFetchFailure, userFetchSuccess } from "./userAction";
import { DELETE_USER_REQUEST, EDIT_USER_REQUEST, FETCH_USER_REQUEST } from "./userType";

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

function* deleteUsers(action) {
  try {
    const { id } = action.payload || {};
    if (!id) throw new Error("Missing user id for delete");

    console.log("Deleting user id:", id);

    // 🔹 DELETE request (no need for data in most APIs)
    yield call(axios.delete, `${DELETE_API}/${id}`);

    // 🔹 tell Redux the delete was successful (only send id)
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
  yield all([watchFetchUsers(), watchEditUsers(),watchDeleteUsers()]);
}


