import {
  FETCH_OFFERS_REQUEST,
  FETCH_OFFERS_SUCCESS,
  FETCH_OFFERS_FAILURE,
  ADD_OFFER_REQUEST,
  ADD_OFFER_SUCCESS,
  ADD_OFFER_FAILURE,
  RESET_ADD_OFFER_STATE,
  UPDATE_OFFER_REQUEST,
  UPDATE_OFFER_SUCCESS,
  UPDATE_OFFER_FAILURE,
  RESET_UPDATE_OFFER_STATE,
  DELETE_OFFER_REQUEST,
  DELETE_OFFER_SUCCESS,
  DELETE_OFFER_FAILURE,
  RESET_DELETE_OFFER_STATE,
} from "./OffersType";

const initialState = {
  loading: false,
  offers: [],
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

const offersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OFFERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case FETCH_OFFERS_SUCCESS:
      return {
        ...state,
        loading: false,
        offers: Array.isArray(action.payload) ? action.payload : [],
        error: "",
      };

    case FETCH_OFFERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload || "Failed to fetch offers",
      };

    case ADD_OFFER_REQUEST:
      return {
        ...state,
        addLoading: true,
        addSuccess: false,
        addError: "",
      };

    case ADD_OFFER_SUCCESS:
      return {
        ...state,
        addLoading: false,
        addSuccess: true,
        addError: "",
      };

    case ADD_OFFER_FAILURE:
      return {
        ...state,
        addLoading: false,
        addSuccess: false,
        addError: action.payload || "Failed to add offer",
      };

    case RESET_ADD_OFFER_STATE:
      return {
        ...state,
        addLoading: false,
        addSuccess: false,
        addError: "",
      };

    case UPDATE_OFFER_REQUEST:
      return {
        ...state,
        updateLoading: true,
        updateSuccess: false,
        updateError: "",
      };

    case UPDATE_OFFER_SUCCESS:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: true,
        updateError: "",
      };

    case UPDATE_OFFER_FAILURE:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: false,
        updateError: action.payload || "Failed to update offer",
      };

    case RESET_UPDATE_OFFER_STATE:
      return {
        ...state,
        updateLoading: false,
        updateSuccess: false,
        updateError: "",
      };

    case DELETE_OFFER_REQUEST:
      return {
        ...state,
        deleteLoading: true,
        deleteSuccess: false,
        deleteError: "",
      };

    case DELETE_OFFER_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: true,
        deleteError: "",
      };

    case DELETE_OFFER_FAILURE:
      return {
        ...state,
        deleteLoading: false,
        deleteSuccess: false,
        deleteError: action.payload || "Failed to delete offer",
      };

    case RESET_DELETE_OFFER_STATE:
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

export default offersReducer;