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

// fetch
export const offersFetchRequest = () => ({
  type: FETCH_OFFERS_REQUEST,
});

export const offersFetchSuccess = (payload) => ({
  type: FETCH_OFFERS_SUCCESS,
  payload,
});

export const offersFetchFailure = (payload) => ({
  type: FETCH_OFFERS_FAILURE,
  payload,
});

// add
export const addOfferRequest = (payload) => ({
  type: ADD_OFFER_REQUEST,
  payload,
});

export const addOfferSuccess = (payload) => ({
  type: ADD_OFFER_SUCCESS,
  payload,
});

export const addOfferFailure = (payload) => ({
  type: ADD_OFFER_FAILURE,
  payload,
});

export const resetAddOfferState = () => ({
  type: RESET_ADD_OFFER_STATE,
});

// update
export const updateOfferRequest = (payload) => ({
  type: UPDATE_OFFER_REQUEST,
  payload,
});

export const updateOfferSuccess = (payload) => ({
  type: UPDATE_OFFER_SUCCESS,
  payload,
});

export const updateOfferFailure = (payload) => ({
  type: UPDATE_OFFER_FAILURE,
  payload,
});

export const resetUpdateOfferState = () => ({
  type: RESET_UPDATE_OFFER_STATE,
});

// delete
export const deleteOfferRequest = (payload) => ({
  type: DELETE_OFFER_REQUEST,
  payload,
});

export const deleteOfferSuccess = (payload) => ({
  type: DELETE_OFFER_SUCCESS,
  payload,
});

export const deleteOfferFailure = (payload) => ({
  type: DELETE_OFFER_FAILURE,
  payload,
});

export const resetDeleteOfferState = () => ({
  type: RESET_DELETE_OFFER_STATE,
});