import {
  FETCH_INTEREST_REQUEST,
  FETCH_INTEREST_SUCCESS,
  FETCH_INTEREST_FAILURE,
  ADD_INTEREST_REQUEST,
  ADD_INTEREST_SUCCESS,
  ADD_INTEREST_FAILURE,
  RESET_ADD_INTEREST_STATE,
  EDIT_INTEREST_REQUEST,
  EDIT_INTEREST_SUCCESS,
  EDIT_INTEREST_FAILURE,
  RESET_EDIT_INTEREST_STATE,
  DELETE_INTEREST_REQUEST,
  DELETE_INTEREST_SUCCESS,
  DELETE_INTEREST_FAILURE,
  RESET_DELETE_INTEREST_STATE,
} from "./InterestType";

const initialState = {
  loading: false,
  interests: [],
  error: "",

  addLoading: false,
  addSuccess: false,
  addError: "",

  editLoading: false,
  editSuccess: false,
  editError: "",

  deleteLoading: false,
  deleteSuccess: false,
  deleteError: "",
};

const InterestReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INTEREST_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case FETCH_INTEREST_SUCCESS:
      return {
        ...state,
        loading: false,
        interests: Array.isArray(action.payload) ? action.payload : [],
        error: "",
      };

    case FETCH_INTEREST_FAILURE:
      return {
        ...state,
        loading: false,
        interests: [],
        error: action.payload,
      };

    case ADD_INTEREST_REQUEST:
      return {
        ...state,
        addLoading: true,
        addSuccess: false,
        addError: "",
      };

    case ADD_INTEREST_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        addError: "",
      };

    case ADD_INTEREST_FAILURE:
      return {
        ...state,
        addLoading: false,
        addSuccess: false,
        addError: action.payload,
      };

    case RESET_ADD_INTEREST_STATE:
      return {
        ...state,
        addLoading: false,
        addSuccess: false,
        addError: "",
      };

    case EDIT_INTEREST_REQUEST:
      return {
        ...state,
        editLoading: true,
        editSuccess: false,
        editError: "",
      };

    case EDIT_INTEREST_SUCCESS:
      return {
        ...state,
        editLoading: false,
        editSuccess: true,
        editError: "",
      };

    case EDIT_INTEREST_FAILURE:
      return {
        ...state,
        editLoading: false,
        editSuccess: false,
        editError: action.payload,
      };

    case RESET_EDIT_INTEREST_STATE:
      return {
        ...state,
        editLoading: false,
        editSuccess: false,
        editError: "",
      };

    case DELETE_INTEREST_REQUEST:
      return {
        ...state,
        deleteLoading: true,
        deleteSuccess: false,
        deleteError: "",
      };

    case DELETE_INTEREST_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        deleteError: "",
      };

    case DELETE_INTEREST_FAILURE:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: false,
        deleteError: action.payload,
      };

    case RESET_DELETE_INTEREST_STATE:
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

export default InterestReducer;