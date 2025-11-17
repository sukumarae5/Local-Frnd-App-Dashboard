// photosReducer.js
import {
  PHOTOS_FETCH_REQUEST,
  PHOTOS_FETCH_SUCCESS,
  PHOTOS_FETCH_FAILURE,
} from "../photos/photosType";

const initialState = {
  photos: [],          // store all photos directly in one array
  isLoadingList: false,
  isUploading: false,
  deletingIds: {},
  error: null,
};

export default function photosReducer(state = initialState, action) {
    console.log(action.payload)
  switch (action.type) {
    case PHOTOS_FETCH_REQUEST:
      return {
        ...state,
        isLoadingList: true,
        error: null,
      };

    case PHOTOS_FETCH_SUCCESS:
      // if saga returns response.data, we use that directly
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

    default:
      return state;
  }
}
