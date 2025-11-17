// src/features/user/userReducer.js
import {
  EDIT_USER_FAILURE,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
} from "./userType";

const initialState = {
  loading: false,
  user: [],   // store list here; if API sometimes returns single object, we handle it
  error: "",
};

const getId = (u) => u?.user_id ?? u?.id;

const updateArrayById = (arr, updated) => {
  const uid = getId(updated);
  if (uid == null) return arr;
  const idx = arr.findIndex((x) => getId(x) === uid);
  if (idx === -1) return arr; // not found, leave as is (or push if you prefer)
  const next = arr.slice();
  next[idx] = { ...arr[idx], ...updated };
  return next;
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true, error: "" };

    case FETCH_USER_SUCCESS: {
      // normalize: accept array or single
      const payload = action.payload;
      const list = Array.isArray(payload) ? payload : payload ? [payload] : [];
      return { ...state, loading: false, user: list, error: "" };
    }

    case FETCH_USER_FAILURE:
      return { ...state, loading: false, user: [], error: action.payload };

    case EDIT_USER_REQUEST:
      return { ...state, loading: true, error: "" };

    case EDIT_USER_SUCCESS: {
      const updated = action.payload;
      console.log(updated)
      const nextUser = Array.isArray(state.user)
        ? updateArrayById(state.user, updated)
        : updated;
      return { ...state, loading: false, user: nextUser, error: "" };
    }

    case EDIT_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default userReducer;
