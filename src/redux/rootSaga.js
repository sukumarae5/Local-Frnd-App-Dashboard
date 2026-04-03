import { all } from "redux-saga/effects";
import userSaga from "../features/user/userSaga";
import watchFetchPhotos from "../features/photos/photosSaga";
import { watchFetchLanguages } from "../features/Languages/LanguagesSaga";
import { watchFetchCalls } from "../features/Calls/CallsSaga";
import { watchFetchCallsHistory } from "../features/CallsShistory/CallsHistorySaga";
import { watchFetchCoins } from "../features/Coins/CoinsSaga";
import { watchOffersSaga } from "../features/Offers/OffersSaga";
import { watchFetchInterest } from "../features/Interest/InterestSaga";
import { watchFetchLifestyle } from "../features/Lifestyle/LifestyleSaga";
import { watchFetchLifestylecategory } from "../features/Lifestylecategory/LifestylecategorySaga";

export default function* rootSaga() {
  yield all([
    userSaga(),
    watchFetchPhotos(),
    watchFetchLanguages(),
    watchFetchCalls(),
    watchFetchCallsHistory(),
    watchFetchCoins(),
    watchOffersSaga(),
    watchFetchInterest(),
    watchFetchLifestyle(),
    watchFetchLifestylecategory(),
  ]);
}