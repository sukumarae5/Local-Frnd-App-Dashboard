import { FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "./userType"

export const userFetchRequest=()=>{
    return{
        type:FETCH_USER_REQUEST
    }
}
export const userFetchSuccess=(userdata)=>{
    return{
        type:FETCH_USER_SUCCESS,
        payload:userdata

    }
}
export const userFetchFailure=(error)=>{
    return{
        type:FETCH_USER_FAILURE,
        payload:error
    }
}