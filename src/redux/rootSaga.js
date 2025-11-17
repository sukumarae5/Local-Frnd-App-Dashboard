import {all} from "redux-saga/effects"
import userSaga from "../features/user/userSaga"
import watchFetchPhotos from "../features/photos/photosSaga"


export default function*rootSaga(){
    yield all([
        userSaga(),
        watchFetchPhotos()
    ])
}