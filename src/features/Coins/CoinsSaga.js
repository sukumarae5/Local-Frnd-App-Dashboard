import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { COINS } from "../../api/CoinsApi";
import {
  FETCH_COINS_REQUEST,
  ADD_COINS_REQUEST,
  DELETE_COINS_REQUEST,
  UPDATE_COINS_REQUEST,
} from "./CoinsType";
import {
  coinsFetchSuccess,
  coinsFetchFailure,
  addCoinsSuccess,
  addCoinsFailure,
  deleteCoinsSuccess,
  deleteCoinsFailure,
  updateCoinsSuccess,
  updateCoinsFailure,
  coinsFetchRequest,
} from "./CoinsActions";

const fetchCoinsApi = async () => {
  const response = await axios.get(COINS);
  return response.data;
};

const addCoinsApi = async (payload) => {
  const response = await axios.post(COINS, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

const deleteCoinsApi = async (id) => {
  const response = await axios.delete(`${COINS}/${id}`);
  return response.data;
};

const updateCoinsApi = async (payload) => {
  const response = await axios.put(`${COINS}/${payload.id}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

function* fetchCoinsSaga() {
  try {
    const response = yield call(fetchCoinsApi);

    const data =
      response?.data ||
      response?.results ||
      response?.coinPackages ||
      response ||
      [];

    yield put(coinsFetchSuccess(Array.isArray(data) ? data : []));
  } catch (error) {
    yield put(
      coinsFetchFailure(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to fetch coin packages"
      )
    );
  }
}

function* addCoinsSaga(action) {
  try {
    const response = yield call(addCoinsApi, action.payload);
    yield put(addCoinsSuccess(response));
    yield put(coinsFetchRequest());
  } catch (error) {
    yield put(
      addCoinsFailure(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to add coin package"
      )
    );
  }
}

function* deleteCoinsSaga(action) {
  try {
    yield call(deleteCoinsApi, action.payload);
    yield put(deleteCoinsSuccess(action.payload));
    yield put(coinsFetchRequest());
  } catch (error) {
    yield put(
      deleteCoinsFailure(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to delete coin package"
      )
    );
  }
}

function* updateCoinsSaga(action) {
  try {
    const response = yield call(updateCoinsApi, action.payload);
    yield put(updateCoinsSuccess(response));
     yield put(coinsFetchRequest());
  } catch (error) {
    yield put(
      updateCoinsFailure(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to update coin package"
      )
    );
  }
}

export function* watchFetchCoins() {
  yield takeLatest(FETCH_COINS_REQUEST, fetchCoinsSaga);
  yield takeLatest(UPDATE_COINS_REQUEST, updateCoinsSaga);
    yield takeLatest(DELETE_COINS_REQUEST, deleteCoinsSaga);
    yield takeLatest(ADD_COINS_REQUEST, addCoinsSaga);
}

