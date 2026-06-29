import * as types from "./OffersType";

export const fetchOffersRequest = () => ({
    type: types.FETCH_OFFERS_REQUEST
});

export const fetchOffersSuccess = (payload) => ({
    type: types.FETCH_OFFERS_SUCCESS,
    payload
});

export const fetchOffersFailure = (payload) => ({
    type: types.FETCH_OFFERS_FAILURE,
    payload
});

export const fetchOfferRequest = (id) => ({
    type: types.FETCH_OFFER_REQUEST,
    payload:id
});

export const fetchOfferSuccess = (payload) => ({
    type: types.FETCH_OFFER_SUCCESS,
    payload
});

export const fetchOfferFailure = (payload) => ({
    type: types.FETCH_OFFER_FAILURE,
    payload
});

export const addOfferRequest = (payload)=>({
    type:types.ADD_OFFER_REQUEST,
    payload
});

export const addOfferSuccess=(payload)=>({
    type:types.ADD_OFFER_SUCCESS,
    payload
});

export const addOfferFailure=(payload)=>({
    type:types.ADD_OFFER_FAILURE,
    payload
});

export const updateOfferRequest=(payload)=>({
    type:types.UPDATE_OFFER_REQUEST,
    payload
});

export const updateOfferSuccess=(payload)=>({
    type:types.UPDATE_OFFER_SUCCESS,
    payload
});

export const updateOfferFailure=(payload)=>({
    type:types.UPDATE_OFFER_FAILURE,
    payload
});

export const deleteOfferRequest=(id)=>({
    type:types.DELETE_OFFER_REQUEST,
    payload:id
});

export const deleteOfferSuccess=(payload)=>({
    type:types.DELETE_OFFER_SUCCESS,
    payload
});

export const deleteOfferFailure=(payload)=>({
    type:types.DELETE_OFFER_FAILURE,
    payload
});

export const resetOfferState=()=>({
    type:types.RESET_OFFER_STATE
});