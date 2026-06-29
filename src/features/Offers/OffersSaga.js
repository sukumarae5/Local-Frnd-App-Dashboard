import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import { OFFERS } from "../../api/OffersApi";

import * as types from "./OffersType";

import {
  fetchOffersSuccess,
  fetchOffersFailure,

  fetchOfferSuccess,
  fetchOfferFailure,

  addOfferSuccess,
  addOfferFailure,

  updateOfferSuccess,
  updateOfferFailure,

  deleteOfferSuccess,
  deleteOfferFailure,

} from "./OffersActions";

/////////////////////////////////////////////////////////
// API METHODS
/////////////////////////////////////////////////////////

const getOffersApi = async () => {

  const response = await axios.get(OFFERS);

  return response.data;

};

const getOfferApi = async (id) => {

  const response = await axios.get(`${OFFERS}/${id}`);

  return response.data;

};

const addOfferApi = async (formData) => {

  const response = await axios.post(

    OFFERS,

    formData,

    {

      headers:{

        "Content-Type":"multipart/form-data"

      }

    }

  );

  return response.data;

};

const updateOfferApi = async ({id,formData}) => {

  const response = await axios.put(

    `${OFFERS}/${id}`,

    formData,

    {

      headers:{

        "Content-Type":"multipart/form-data"

      }

    }

  );

  return response.data;

};

const deleteOfferApi = async(id)=>{

    const response=await axios.delete(

        `${OFFERS}/${id}`

    );

    return response.data;

};

/////////////////////////////////////////////////////////
// FETCH OFFERS
/////////////////////////////////////////////////////////

function* fetchOffersSaga(){

try{

const response=yield call(getOffersApi);

yield put(

fetchOffersSuccess(

response.data || []

)

);

}catch(error){

yield put(

fetchOffersFailure(

error.response?.data?.message ||

error.message

)

);

}

}

/////////////////////////////////////////////////////////
// FETCH SINGLE OFFER
/////////////////////////////////////////////////////////

function* fetchOfferSaga(action){

try{

const response=yield call(

getOfferApi,

action.payload

);

yield put(

fetchOfferSuccess(

response.data

)

);

}catch(error){

yield put(

fetchOfferFailure(

error.response?.data?.message ||

error.message

)

);

}

}

/////////////////////////////////////////////////////////
// ADD OFFER
/////////////////////////////////////////////////////////

function* addOfferSaga(action){

try{

const response=yield call(

addOfferApi,

action.payload

);

yield put(

addOfferSuccess(

response.data

)

);

yield put({

type:types.FETCH_OFFERS_REQUEST

});

}catch(error){

yield put(

addOfferFailure(

error.response?.data?.message ||

error.message

)

);

}

}

/////////////////////////////////////////////////////////
// UPDATE OFFER
/////////////////////////////////////////////////////////

function* updateOfferSaga(action){

try{

const response=yield call(

updateOfferApi,

action.payload

);

yield put(

updateOfferSuccess(

response.data

)

);

yield put({

type:types.FETCH_OFFERS_REQUEST

});

}catch(error){

yield put(

updateOfferFailure(

error.response?.data?.message ||

error.message

)

);

}

}

/////////////////////////////////////////////////////////
// DELETE OFFER
/////////////////////////////////////////////////////////

function* deleteOfferSaga(action){

try{

const response=yield call(

deleteOfferApi,

action.payload

);

yield put(

deleteOfferSuccess(

response.data

)

);

yield put({

type:types.FETCH_OFFERS_REQUEST

});

}catch(error){

yield put(

deleteOfferFailure(

error.response?.data?.message ||

error.message

)

);

}

}

/////////////////////////////////////////////////////////
// WATCHER
/////////////////////////////////////////////////////////

export function* watchOffersSaga(){

yield takeLatest(

types.FETCH_OFFERS_REQUEST,

fetchOffersSaga

);

yield takeLatest(

types.FETCH_OFFER_REQUEST,

fetchOfferSaga

);

yield takeLatest(

types.ADD_OFFER_REQUEST,

addOfferSaga

);

yield takeLatest(

types.UPDATE_OFFER_REQUEST,

updateOfferSaga

);

yield takeLatest(

types.DELETE_OFFER_REQUEST,

deleteOfferSaga

);

}