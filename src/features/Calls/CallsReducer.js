import {
  CALLS_FETCH_REQUEST,
  CALLS_FETCH_SUCCESS,
  CALLS_FETCH_FAILURE,
} from "./CallsType";

const initialState = {
  loading: false,
  calls: [],
  error: null,
};

const CallsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CALLS_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CALLS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        calls: Array.isArray(action.payload) ? action.payload : [],
        error: null,
      };

    case CALLS_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        calls: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default CallsReducer;