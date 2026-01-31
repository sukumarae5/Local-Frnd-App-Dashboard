// src/features/Languages/LanguagesReducer.js

import {
  FETCH_LANGUAGES_REQUEST,
  FETCH_LANGUAGES_SUCCESS,
  FETCH_LANGUAGES_FAILURE,

  DELETE_LANGUAGE_REQUEST,
  DELETE_LANGUAGE_SUCCESS,
  DELETE_LANGUAGE_FAILURE,

  ADD_LANGUAGE_REQUEST,
  ADD_LANGUAGE_SUCCESS,
  ADD_LANGUAGE_FAILURE,

  EDIT_LANGUAGE_REQUEST,
  EDIT_LANGUAGE_SUCCESS,
  EDIT_LANGUAGE_FAILURE,
} from "./LanguagesType";

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const LanguagesReducer = (state = initialState, action) => {
  switch (action.type) {
    // FETCH
    case FETCH_LANGUAGES_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_LANGUAGES_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case FETCH_LANGUAGES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // DELETE
    case DELETE_LANGUAGE_REQUEST:
      return { ...state, error: null };

    case DELETE_LANGUAGE_SUCCESS:
      return {
        ...state,
        data: state.data.filter((row) => row.id !== action.payload),
      };

    case DELETE_LANGUAGE_FAILURE:
      return { ...state, error: action.payload };

    // ADD
    case ADD_LANGUAGE_REQUEST:
      return { ...state, error: null };

    case ADD_LANGUAGE_SUCCESS: {
      const newRow = action.payload;
      const exists = state.data.some((row) => row.id === newRow.id);

      return {
        ...state,
        data: exists ? state.data : [newRow, ...state.data],
      };
    }

    case ADD_LANGUAGE_FAILURE:
      return { ...state, error: action.payload };

    // EDIT
    case EDIT_LANGUAGE_REQUEST:
      return { ...state, error: null };

    case EDIT_LANGUAGE_SUCCESS: {
      const updatedRow = action.payload;

      return {
        ...state,
        data: state.data.map((row) =>
          String(row.id) === String(updatedRow.id) ? { ...row, ...updatedRow } : row
        ),
      };
    }

    case EDIT_LANGUAGE_FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export default LanguagesReducer;
