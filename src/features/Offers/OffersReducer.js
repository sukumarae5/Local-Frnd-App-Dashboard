// src/features/Offers/OffersReducer.js

import * as types from "./OffersType";

const initialState = {
  loading: false,
  saving: false,
  deleting: false,
  offers: [],
  selectedOffer: null,
  success: false,
  error: null,
};

const OffersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_OFFERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.FETCH_OFFERS_SUCCESS:
      return {
        ...state,
        loading: false,
        offers: Array.isArray(action.payload) ? action.payload : [],
        error: null,
      };

    case types.FETCH_OFFERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case types.FETCH_OFFER_REQUEST:
      return {
        ...state,
        loading: true,
        selectedOffer: null,
        error: null,
      };

    case types.FETCH_OFFER_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedOffer: action.payload,
        error: null,
      };

    case types.FETCH_OFFER_FAILURE:
      return {
        ...state,
        loading: false,
        selectedOffer: null,
        error: action.payload,
      };

    case types.ADD_OFFER_REQUEST:
      return {
        ...state,
        saving: true,
        success: false,
        error: null,
      };

    case types.UPDATE_OFFER_REQUEST:
      return {
        ...state,
        saving: true,
        success: false,
        error: null,
      };

    case types.ADD_OFFER_SUCCESS:
      return {
        ...state,
        saving: false,
        success: true,
        error: null,
      };

    case types.UPDATE_OFFER_SUCCESS:
      return {
        ...state,
        saving: false,
        success: true,
        selectedOffer: action.payload ?? state.selectedOffer,
        error: null,
      };

    case types.ADD_OFFER_FAILURE:
      return {
        ...state,
        saving: false,
        success: false,
        error: action.payload,
      };

    case types.UPDATE_OFFER_FAILURE:
      return {
        ...state,
        saving: false,
        success: false,
        error: action.payload,
      };

    case types.DELETE_OFFER_REQUEST:
      return {
        ...state,
        deleting: true,
        success: false,
        error: null,
      };

    case types.DELETE_OFFER_SUCCESS:
      return {
        ...state,
        deleting: false,
        success: true,
        error: null,
        offers: action.payload
          ? state.offers.filter(
              (offer) =>
                String(offer.id) !== String(action.payload)
            )
          : state.offers,
      };

    case types.DELETE_OFFER_FAILURE:
      return {
        ...state,
        deleting: false,
        success: false,
        error: action.payload,
      };

    case types.RESET_OFFER_STATE:
      return {
        ...state,
        saving: false,
        deleting: false,
        success: false,
        error: null,
      };

    default:
      return state;
  }
};

export default OffersReducer;