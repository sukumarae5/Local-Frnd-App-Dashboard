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
    const response = yield call(fetchOffersApi);

    const data =
      response?.data ||
      response?.offers ||
      response?.results ||
      response ||
      [];

    yield put(offersFetchSuccess(Array.isArray(data) ? data : []));
  } catch (error) {
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
    const response = yield call(addOfferApi, action.payload);
    yield put(addOfferSuccess(response));
  } catch (error) {
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
    const response = yield call(updateOfferApi, action.payload);
    yield put(updateOfferSuccess(response));
  } catch (error) {
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
    const response = yield call(deleteOfferApi, action.payload);
    yield put(deleteOfferSuccess(response));
    yield put({ type: FETCH_OFFERS_REQUEST });
  } catch (error) {
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