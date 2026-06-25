// features/Offers/OffersSaga.js

import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { OFFERS } from "../../api/OffersApi";

import {
  FETCH_OFFERS_REQUEST,
  ADD_OFFER_REQUEST,
  UPDATE_OFFER_REQUEST,
  DELETE_OFFER_REQUEST,
} from "./OffersType";

import {
  offersFetchSuccess,
  offersFetchFailure,
  addOfferSuccess,
  addOfferFailure,
  updateOfferSuccess,
  updateOfferFailure,
  deleteOfferSuccess,
  deleteOfferFailure,
} from "./OffersActions";

const fetchOffersApi = async () => {
  const response = await axios.get(OFFERS);
  console.log(response)
  return response.data;
};

const addOfferApi = async (payload) => {
  const response = await axios.post(OFFERS, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const updateOfferApi = async (payload) => {
  const { id, formData } = payload;

  const response = await axios.put(`${OFFERS}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const deleteOfferApi = async (id) => {
  const response = await axios.delete(`${OFFERS}/${id}`);
  return response.data;
};

function* fetchOffersSaga() {
  try {
    console.log("🔥 FETCH OFFERS API URL:", OFFERS);

    const response = yield call(fetchOffersApi);

    console.log("🔥 OFFERS API FULL RESPONSE:", response);

    const data =
      response?.data ||
      response?.offers ||
      response?.results ||
      response ||
      [];

    console.log("🔥 OFFERS RAW DATA:", data);

    const finalData = Array.isArray(data)
      ? data.map((item, index) => {
          console.log(`🔥 OFFER ITEM ${index}:`, item);
          console.log(`🔥 OFFER ITEM ${index} GENDER:`, item?.gender);

          return {
            ...item,
          
          };
        })
      : [];

    console.log("🔥 OFFERS FINAL DATA WITH GENDER:", finalData);

    yield put(offersFetchSuccess(finalData));
  } catch (error) {
    console.log("❌ FETCH OFFERS ERROR:", error);
    console.log("❌ FETCH OFFERS ERROR RESPONSE:", error?.response?.data);

    yield put(
      offersFetchFailure(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Unable to fetch offers"
      )
    );
  }
}

function* addOfferSaga(action) {
  try {
    console.log("🔥 ADD OFFER PAYLOAD:", action.payload);

    const response = yield call(addOfferApi, action.payload);

    console.log("✅ ADD OFFER RESPONSE:", response);

    yield put(addOfferSuccess(response));
    yield put({ type: FETCH_OFFERS_REQUEST });
  } catch (error) {
    console.log("❌ ADD OFFER ERROR:", error);
    console.log("❌ ADD OFFER ERROR RESPONSE:", error?.response?.data);

    yield put(
      addOfferFailure(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Unable to add offer"
      )
    );
  }
}

function* updateOfferSaga(action) {
  try {
    console.log("🔥 UPDATE OFFER PAYLOAD:", action.payload);

    const response = yield call(updateOfferApi, action.payload);

    console.log("✅ UPDATE OFFER RESPONSE:", response);

    yield put(updateOfferSuccess(response));
    yield put({ type: FETCH_OFFERS_REQUEST });
  } catch (error) {
    console.log("❌ UPDATE OFFER ERROR:", error);
    console.log("❌ UPDATE OFFER ERROR RESPONSE:", error?.response?.data);

    yield put(
      updateOfferFailure(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Unable to update offer"
      )
    );
  }
}

function* deleteOfferSaga(action) {
  try {
    console.log("🔥 DELETE OFFER ID:", action.payload);

    const response = yield call(deleteOfferApi, action.payload);

    console.log("✅ DELETE OFFER RESPONSE:", response);

    yield put(deleteOfferSuccess(response));
    yield put({ type: FETCH_OFFERS_REQUEST });
  } catch (error) {
    console.log("❌ DELETE OFFER ERROR:", error);
    console.log("❌ DELETE OFFER ERROR RESPONSE:", error?.response?.data);

    yield put(
      deleteOfferFailure(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          error?.message ||
          "Unable to delete offer"
      )
    );
  }
}

export function* watchOffersSaga() {
  yield takeLatest(FETCH_OFFERS_REQUEST, fetchOffersSaga);
  yield takeLatest(ADD_OFFER_REQUEST, addOfferSaga);
  yield takeLatest(UPDATE_OFFER_REQUEST, updateOfferSaga);
  yield takeLatest(DELETE_OFFER_REQUEST, deleteOfferSaga);
}