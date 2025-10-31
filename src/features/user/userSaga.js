
import { call,put,takeLatest } from "redux-saga/effects";
import { FETCH_USER_REQUEST } from "./userType";

import { userFetchFailure, userFetchSuccess } from "./userAction";
import axios from "axios";
import { USERDATA } from "../../api/userApi";

function*fetchUsers(){
    
   try{
    const response=yield call(axios.get,USERDATA)
    // console.log(response.data.users)
    yield put(userFetchSuccess(response.data.users))

   }
   catch(error){
    yield put(userFetchFailure(error.message));
   }
}
export default function*userSaga(){
    yield takeLatest(FETCH_USER_REQUEST,fetchUsers)
}