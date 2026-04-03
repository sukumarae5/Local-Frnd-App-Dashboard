import {
  FETCH_COINS_REQUEST,
  FETCH_COINS_SUCCESS,
  FETCH_COINS_FAILURE,
  ADD_COINS_REQUEST,
  ADD_COINS_SUCCESS,
  ADD_COINS_FAILURE,
  DELETE_COINS_REQUEST,
  DELETE_COINS_SUCCESS,
  DELETE_COINS_FAILURE,
  UPDATE_COINS_REQUEST,
  UPDATE_COINS_SUCCESS,
  UPDATE_COINS_FAILURE,
  RESET_UPDATE_COINS_STATE,
} from "./CoinsType";

const initialState = {
  loading: false,
  coins: [],
  error: "",

  addLoading: false,
  addSuccess: false,
  addError: "",

  deleteLoading: false,
  deleteSuccess: false,
  deleteError: "",

  updateLoading: false,
  updateSuccess: false,
  updateError: "",
};

const CoinsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COINS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case FETCH_COINS_SUCCESS:
      return {
        ...state,
        loading: false,
        coins: Array.isArray(action.payload) ? action.payload : [],
        error: "",
      };

    case FETCH_COINS_FAILURE:
      return {
        ...state,
        loading: false,
        coins: [],
        error: action.payload || "Unable to fetch coin packages",
      };

    case ADD_COINS_REQUEST:
      return {
        ...state,
        addLoading: true,
        addSuccess: false,
        addError: "",
      };

    case ADD_COINS_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        addError: "",
      };

    case ADD_COINS_FAILURE:
      return {
        ...state,
        addLoading: false,
        addSuccess: false,
        addError: action.payload || "Unable to add coin package",
      };

    case DELETE_COINS_REQUEST:
      return {
        ...state,
        deleteLoading: true,
        deleteSuccess: false,
        deleteError: "",
      };

    case DELETE_COINS_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        deleteError: "",
      };

    case DELETE_COINS_FAILURE:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: false,
        deleteError: action.payload || "Unable to delete coin package",
      };

    case UPDATE_COINS_REQUEST:
      return {
        ...state,
        updateLoading: true,
        updateSuccess: false,
        updateError: "",
      };

    case UPDATE_COINS_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        updateError: "",
      };

    case UPDATE_COINS_FAILURE:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: false,
        updateError: action.payload || "Unable to update coin package",
      };

      case RESET_UPDATE_COINS_STATE:
  return {
    ...state,
    updateLoading: false,
    updateSuccess: false,
    updateError: "",
  };

    default:
      return state;
  }
};

export default CoinsReducer;