// src/features/user/userReducer.js
import {
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  EDIT_USER_FAILURE,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  FETCH_USER_FAILURE,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
} from "./userType";

const initialState = {
  loading: false,
  user: [],   // list of users
  error: "",
  success: false,
  message: "",
};

const getId = (u) => u?.user_id ?? u?.id;

const updateArrayById = (arr, updated) => {
  const uid = getId(updated);
  if (uid == null) return arr;
  const idx = arr.findIndex((x) => getId(x) === uid);
  if (idx === -1) return arr;
  const next = arr.slice();
  next[idx] = { ...arr[idx], ...updated };
  return next;
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // FETCH
    case FETCH_USER_REQUEST:
      return { ...state, loading: true, error: "", success: false, message: "" };

    case FETCH_USER_SUCCESS: {
      const payload = action.payload;
      const list = Array.isArray(payload) ? payload : payload ? [payload] : [];
      return {
        ...state,
        loading: false,
        user: list,
        error: "",
        success: true,
        message: "",
      };
    }

    case FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        user: [],
        error: action.payload,
        success: false,
        message: "",
      };

    case EDIT_USER_REQUEST:
  return { ...state, loading: true, error: "", success: false, message: "" };

case EDIT_USER_SUCCESS: {
  const updated = action.payload;
  return {
    ...state,
    loading: false,
    user: updated,
    error: "",
    success: true,
    message: action.payload?.message || "Profile updated",
  };
}

case EDIT_USER_FAILURE:
  return {
    ...state,
    loading: false,
    error: action.payload,
    success: false,
    message: "",
  };


    // DELETE
    case DELETE_USER_REQUEST:
      return { ...state, loading: true, error: "", success: false, message: "" };

    case DELETE_USER_SUCCESS: {
      const deletedId = action.payload;
      const nextUser = Array.isArray(state.user)
        ? state.user.filter((u) => getId(u) !== deletedId)
        : state.user;
      return {
        ...state,
        loading: false,
        user: nextUser,
        error: "",
        success: true,
        message: "User deleted successfully",
      };
    }

    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
        message: "",
      };

    default:
      return state;
  }
};

export default userReducer;
