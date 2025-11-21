import {
  PHOTOS_FETCH_REQUEST,
  PHOTOS_FETCH_SUCCESS,
  PHOTOS_FETCH_FAILURE,
  PHOTOS_DELETE_REQUEST,
  PHOTOS_DELETE_SUCCESS,
  PHOTOS_DELETE_FAILURE,
} from "../photos/photosType";

const initialState = {
  photos: [], // store all photos in one array
  isLoadingList: false,
  isUploading: false,
  deletingIds: {}, // track per-id delete state (by photo_id)
  error: null,
};

export default function photosReducer(state = initialState, action) {
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
        // remove only this photo from list
        photos: state.photos.filter((p) => p.photo_id !== photo_id),
        error: null,
      };
    }

    case PHOTOS_DELETE_FAILURE:
      return {
        ...state,
        deletingIds: {}, // or keep as-is if you want per-id info
        error: action.payload || "Failed to delete photo",
      };

    default:
      return state;
  }
}
