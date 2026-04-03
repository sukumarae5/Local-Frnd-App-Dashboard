import {
  FETCH_LIFESTYLECATEGORY_REQUEST,
  FETCH_LIFESTYLECATEGORY_SUCCESS,
  FETCH_LIFESTYLECATEGORY_FAILURE,
  ADD_LIFESTYLECATEGORY_REQUEST,
  ADD_LIFESTYLECATEGORY_SUCCESS,
  ADD_LIFESTYLECATEGORY_FAILURE,
  UPDATE_LIFESTYLECATEGORY_REQUEST,
  UPDATE_LIFESTYLECATEGORY_SUCCESS,
  UPDATE_LIFESTYLECATEGORY_FAILURE,
  DELETE_LIFESTYLECATEGORY_REQUEST,
  DELETE_LIFESTYLECATEGORY_SUCCESS,
  DELETE_LIFESTYLECATEGORY_FAILURE,
} from "./LifestylecategoryType";

const initialState = {
  loading: false,
  addLoading: false,
  updateLoading: false,
  deleteLoading: false,
  lifestylecategory: [],
  error: "",
};

const LifestylecategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIFESTYLECATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case FETCH_LIFESTYLECATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        lifestylecategory: Array.isArray(action.payload)
          ? action.payload
          : action.payload?.data || [],
        error: "",
      };

    case FETCH_LIFESTYLECATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case ADD_LIFESTYLECATEGORY_REQUEST:
      return {
        ...state,
        addLoading: true,
        error: "",
      };

    case ADD_LIFESTYLECATEGORY_SUCCESS:
      return {
        ...state,
        addLoading: false,
      };

    case ADD_LIFESTYLECATEGORY_FAILURE:
      return {
        ...state,
        addLoading: false,
        error: action.payload,
      };

    case UPDATE_LIFESTYLECATEGORY_REQUEST:
      return {
        ...state,
        updateLoading: true,
        error: "",
      };

    case UPDATE_LIFESTYLECATEGORY_SUCCESS:
      return {
        ...state,
        updateLoading: false,
      };

    case UPDATE_LIFESTYLECATEGORY_FAILURE:
      return {
        ...state,
        updateLoading: false,
        error: action.payload,
      };

    case DELETE_LIFESTYLECATEGORY_REQUEST:
      return {
        ...state,
        deleteLoading: true,
        error: "",
      };

    case DELETE_LIFESTYLECATEGORY_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
      };

    case DELETE_LIFESTYLECATEGORY_FAILURE:
      return {
        ...state,
        deleteLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default LifestylecategoryReducer;