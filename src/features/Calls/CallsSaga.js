import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { CALLS_FETCH_REQUEST } from "./CallsType";
import { callsFetchSuccess, callsFetchFailure } from "./CallsAction";
import { CALLS } from "../../api/CallsApi";

const fetchCallsApi = async (params) => {
  const response = await axios.get(CALLS, { params });
  return response.data;
};

function* handleFetchCalls(action) {
  try {
    const result = yield call(fetchCallsApi, action.payload);

    const callsData = Array.isArray(result?.data)
      ? result.data
      : Array.isArray(result)
      ? result
      : [];

    yield put(callsFetchSuccess(callsData));
  } catch (error) {
    yield put(
      callsFetchFailure(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to fetch calls data"
      )
    );
  }
}

export function* watchFetchCalls() {
  yield takeLatest(CALLS_FETCH_REQUEST, handleFetchCalls);
}