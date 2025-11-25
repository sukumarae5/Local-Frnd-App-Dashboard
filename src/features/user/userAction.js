import { DELETE_USER_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, EDIT_USER_FAILURE, EDIT_USER_REQUEST, EDIT_USER_SUCCESS, FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "./userType"

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
export const userEditRequest = ({ id, data = {} }) => ({
  type: EDIT_USER_REQUEST,
  payload: { id, data },
});

export const userEditSuccess = (user) => ({
  type: EDIT_USER_SUCCESS,
  payload: user,
});

export const userEditFailure = (error) => ({
  type: EDIT_USER_FAILURE,
  payload: error,
});


export const userDeleteRequest=(id)=>{
    return{
        type:DELETE_USER_REQUEST,
        payload:id
    }
}
export const userDeleteSuccess=(id)=>{
    return{
        type:DELETE_USER_SUCCESS,
        payload:id

    }
}
export const  userDeleteFailure=(error)=>{
    return{
        type:DELETE_USER_FAILURE,
        payload:error
    }
}


