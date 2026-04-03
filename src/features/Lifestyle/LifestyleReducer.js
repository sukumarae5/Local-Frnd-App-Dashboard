import {
  LIFESTYLE_FETCH_REQUEST,
  LIFESTYLE_FETCH_SUCCESS,
  LIFESTYLE_FETCH_FAILURE,
  LIFESTYLE_ADD_REQUEST,
  LIFESTYLE_ADD_SUCCESS,
  LIFESTYLE_ADD_FAILURE,
  LIFESTYLE_ADD_RESET,
  LIFESTYLE_UPDATE_REQUEST,
  LIFESTYLE_UPDATE_SUCCESS,
  LIFESTYLE_UPDATE_FAILURE,
  LIFESTYLE_UPDATE_RESET,
  LIFESTYLE_DELETE_REQUEST,
  LIFESTYLE_DELETE_SUCCESS,
  LIFESTYLE_DELETE_FAILURE,
  LIFESTYLE_DELETE_RESET,
} from "./LifestyleType";

const initialState = {
  loading: false,
  lifestyleData: [],
  error: "",

  addLoading: false,
  addSuccess: false,
  addError: "",

  updateLoading: false,
  updateSuccess: false,
  updateError: "",

  deleteLoading: false,
  deleteSuccess: false,
  deleteError: "",
};

const LifestyleReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIFESTYLE_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case LIFESTYLE_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        lifestyleData: action.payload,
        error: "",
      };

    case LIFESTYLE_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        lifestyleData: [],
        error: action.payload,
      };

    case LIFESTYLE_ADD_REQUEST:
      return {
        ...state,
        addLoading: true,
        addSuccess: false,
        addError: "",
      };

    case LIFESTYLE_ADD_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        addError: "",
      };

    case LIFESTYLE_ADD_FAILURE:
      return {
        ...state,
        addLoading: false,
        addSuccess: false,
        addError: action.payload,
      };

    case LIFESTYLE_ADD_RESET:
      return {
        ...state,
        addLoading: false,
        addSuccess: false,
        addError: "",
      };

    case LIFESTYLE_UPDATE_REQUEST:
      return {
        ...state,
        updateLoading: true,
        updateSuccess: false,
        updateError: "",
      };

    case LIFESTYLE_UPDATE_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        updateError: "",
      };

    case LIFESTYLE_UPDATE_FAILURE:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: false,
        updateError: action.payload,
      };

    case LIFESTYLE_UPDATE_RESET:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: false,
        updateError: "",
      };

    case LIFESTYLE_DELETE_REQUEST:
      return {
        ...state,
        deleteLoading: true,
        deleteSuccess: false,
        deleteError: "",
      };

    case LIFESTYLE_DELETE_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        deleteError: "",
      };

    case LIFESTYLE_DELETE_FAILURE:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: false,
        deleteError: action.payload,
      };

    case LIFESTYLE_DELETE_RESET:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: false,
        deleteError: "",
      };

    default:
      return state;
  }
};

export default LifestyleReducer;