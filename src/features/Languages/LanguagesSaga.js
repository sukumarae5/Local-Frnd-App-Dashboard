// src/features/Languages/LanguagesSaga.js

import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import {
  LANGUAGES,
  LANGUAGESDELETE,
  LANGUAGESADD,
  LANGUAGESEDIT,
} from "../../api/LanguagesApi";

import {
  fetchLanguagesSuccess,
  fetchLanguagesFailure,
  deleteLanguageSuccess,
  deleteLanguageFailure,
  addLanguageSuccess,
  addLanguageFailure,
  fetchLanguagesRequest,
  editLanguageSuccess,
  editLanguageFailure,
} from "./LanguagesAction";

import {
  FETCH_LANGUAGES_REQUEST,
  DELETE_LANGUAGE_REQUEST,
  ADD_LANGUAGE_REQUEST,
  EDIT_LANGUAGE_REQUEST,
} from "./LanguagesType";

// ================= FETCH =================
function* apiFetchLanguages() {
  try {
    console.log("GET:", LANGUAGES);
    const res = yield call(axios.get, LANGUAGES);
    console.log("GET response:", res?.data);

    // if backend returns: res.data.data
    yield put(fetchLanguagesSuccess(res?.data?.data || []));
  } catch (error) {
    const msg =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "Failed to fetch languages";

    console.log("GET error:", msg);
    yield put(fetchLanguagesFailure(msg));
  }
}

// ================= DELETE =================
function* apiDeleteLanguage(action) {
  const id = action.payload;

  try {
    const url = `${LANGUAGESDELETE}/${id}`;
    console.log("DELETE URL:", url);

    const res = yield call(axios.delete, url);
    console.log("DELETE response:", res?.data);

    yield put(deleteLanguageSuccess(id));
  } catch (error) {
    const msg =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "Failed to delete language";

    console.log("DELETE error:", msg);
    yield put(deleteLanguageFailure(msg));
  }
}

// ================= ADD =================
function* apiAddLanguage(action) {
  const payload = action.payload;

  try {
    console.log("ADD URL:", LANGUAGESADD);
    console.log("ADD payload:", payload);

    const res = yield call(axios.post, LANGUAGESADD, payload, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("ADD response:", res?.data);

    const created =
      res?.data?.data ||
      res?.data?.language ||
      res?.data?.result ||
      null;

    if (created && typeof created === "object") {
      yield put(addLanguageSuccess(created));
    } else {
      console.log("ADD: created object not returned. Refetching list...");
      yield put(fetchLanguagesRequest());
    }
  } catch (error) {
    const msg =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "Failed to add language";

    console.log("ADD error:", msg);
    yield put(addLanguageFailure(msg));
  }
}

// ================= EDIT =================
// ✅ Sends ONLY: code, name_en, native_name, direction, is_active
function* apiEditLanguage(action) {
  const payload = action.payload;

  try {
    const id = payload?.id;

    if (!id) {
      const msg = "Edit failed: missing id in payload";
      console.log("EDIT error:", msg);
      yield put(editLanguageFailure(msg));
      return;
    }

    const url = `${LANGUAGESEDIT}/${id}`;

    // ✅ BACKEND BODY FORMAT ONLY
    const body = {
      code: payload.code,
      name_en: payload.name_en,
      native_name: payload.native_name,
      direction: payload.direction,
      is_active: payload.status ? 1 : 0, // ✅ checkbox -> 1/0
    };

    console.log("EDIT URL:", url);
    console.log("EDIT BODY:", body);

    // ✅ Backend update call (POST). If your API needs PUT, change to axios.put
    const res = yield call(axios.put, url, body, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("EDIT response:", res?.data);

    // ✅ Update redux with UI-friendly object
    const updatedForUI = {
      id,
      code: body.code,
      name_en: body.name_en,
      native_name: body.native_name,
      direction: body.direction,
      status: body.is_active === 1,
    };

    yield put(editLanguageSuccess(updatedForUI));
  } catch (error) {
    console.log("EDIT STATUS:", error?.response?.status);
    console.log("EDIT RESPONSE DATA:", error?.response?.data);

    const msg =
      error.response?.data?.message ||
      error.response?.data ||
      error.message ||
      "Failed to edit language";

    console.log("EDIT error:", msg);
    yield put(editLanguageFailure(msg));
  }
}

// ================= WATCHER =================
export function* watchFetchLanguages() {
  yield takeLatest(FETCH_LANGUAGES_REQUEST, apiFetchLanguages);
  yield takeLatest(DELETE_LANGUAGE_REQUEST, apiDeleteLanguage);
  yield takeLatest(ADD_LANGUAGE_REQUEST, apiAddLanguage);
  yield takeLatest(EDIT_LANGUAGE_REQUEST, apiEditLanguage);
}
