import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { CALLSHISTORY } from "../../api/CallsApi";

import { FETCH_CALLS_HISTORY_REQUEST } from "./CallsHistoryType";
import {
  callsHistoryFetchSuccess,
  callsHistoryFetchFailure,
} from "./CallsHistoryAction";

const fetchCallsHistoryApi = async (userid) => {
  const response = await axios.get(`${CALLSHISTORY}/${userid}/call-history`);
  return response.data;
};

function* fetchCallsHistorySaga(action) {
  try {
    const userid = action?.payload;
console.log(userid)
    if (!userid) {
      throw new Error("User ID is required to fetch call history");
    }

    const response = yield call(fetchCallsHistoryApi, userid);

    const data =
      response?.data ||
      response?.results ||
      response?.callHistory ||
      response?.history ||
      response ||
      [];

    yield put(callsHistoryFetchSuccess(Array.isArray(data) ? data : []));
  } catch (error) {
    yield put(
      callsHistoryFetchFailure(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to fetch call history"
      )
    );
  }
}

export function* watchFetchCallsHistory() {
  yield takeLatest(FETCH_CALLS_HISTORY_REQUEST, fetchCallsHistorySaga);
}