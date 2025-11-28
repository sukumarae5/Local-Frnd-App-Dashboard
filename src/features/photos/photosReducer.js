// src/features/photos/photosReducer.js

import {
  PHOTOS_FETCH_REQUEST,
  PHOTOS_FETCH_SUCCESS,
  PHOTOS_FETCH_FAILURE,
  PHOTOS_DELETE_REQUEST,
  PHOTOS_DELETE_SUCCESS,
  PHOTOS_DELETE_FAILURE,
  PHOTOS_EDIT_REQUEST,
  PHOTOS_EDIT_SUCCESS,
  PHOTOS_EDIT_FAILURE,
} from "./photosType";

const initialState = {
  photos: [],        // store all photos in one array
  isLoadingList: false,
  isUploading: false,
  deletingIds: {},   // track per-id delete state
  editingIds: {},    // track per-id edit state
  error: null,
};

export default function photosReducer(state = initialState, action) {
  console.log(action);
  
  switch (action.type) {
    // --- FETCH LIST ---
    case PHOTOS_FETCH_REQUEST:
      return {
        ...state,
        isLoadingList: true,
        error: null,
      };

    case PHOTOS_FETCH_SUCCESS:
      return {
        ...state,
        isLoadingList: false,
        photos: Array.isArray(action.payload)
          ? action.payload
          : action.payload?.photos || action.payload?.items || [],
        error: null,
      };

    case PHOTOS_FETCH_FAILURE:
      return {
        ...state,
        isLoadingList: false,
        error: action.payload || "Failed to load photos",
      };

    // --- DELETE SINGLE PHOTO ---
    case PHOTOS_DELETE_REQUEST: {
      const { photo_id } = action.payload || {};
      if (!photo_id) return state;

      return {
        ...state,
        deletingIds: {
          ...state.deletingIds,
          [photo_id]: true,
        },
        error: null,
      };
    }

    case PHOTOS_DELETE_SUCCESS: {
      const { photo_id } = action.payload || {};
      if (!photo_id) return state;

      const { [photo_id]: _, ...restDeleting } = state.deletingIds;

      return {
        ...state,
        deletingIds: restDeleting,
        photos: state.photos.filter(
          (p) => String(p.photo_id) !== String(photo_id)
        ),
        error: null,
      };
    }

    case PHOTOS_DELETE_FAILURE:
      return {
        ...state,
        deletingIds: {},
        error: action.payload || "Failed to delete photo",
      };

    // --- EDIT SINGLE PHOTO ---
    case PHOTOS_EDIT_REQUEST: {
      const { photo_id } = action.payload || {};
      if (!photo_id) return state;

      return {
        ...state,
        editingIds: {
          ...state.editingIds,
          [photo_id]: true,
        },
        error: null,
      };
    }

    case PHOTOS_EDIT_SUCCESS: {
      const updatedPhoto = action.payload;
      if (!updatedPhoto || !updatedPhoto.photo_id) return state;

      const id = updatedPhoto.photo_id;
      const { [id]: _, ...restEditing } = state.editingIds;

      return {
        ...state,
        editingIds: restEditing,
        photos: state.photos.map((p) =>
          String(p.photo_id) === String(updatedPhoto.photo_id)
            ? updatedPhoto
            : p
        ),
        error: null,
      };
    }

    case PHOTOS_EDIT_FAILURE:
      return {
        ...state,
        editingIds: {},
        error: action.payload || "Failed to edit photo",
      };

    default:
      return state;
  }
}
