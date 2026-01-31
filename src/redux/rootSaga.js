import { all } from "redux-saga/effects";
import userSaga from "../features/user/userSaga";
import watchFetchPhotos from "../features/photos/photosSaga";
import { watchFetchLanguages, watchDeleteLanguage } from "../features/Languages/LanguagesSaga";

export default function* rootSaga() {
  yield all([
    userSaga(),
    watchFetchPhotos(),
    watchFetchLanguages(),
   
  ]);
}
