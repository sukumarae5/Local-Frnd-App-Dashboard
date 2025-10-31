import React from "react";
import { FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "./userType";

const initialState={
    loading:true,
    user:[],
    error:''
}

const userReducer=(state=initialState,action)=>{
    console.log(action.payload)
    switch (action.type){
        case FETCH_USER_REQUEST :
            return{
               ...state,
               loading:true
            }
            case FETCH_USER_SUCCESS:
                return{
                    ...state,
                    loading:false,
                    user:action.payload
                }
                case FETCH_USER_FAILURE:
                    return{
                        ...state,
                        loading:false,
                        user:'',
                        error:action.payload
                    }
                    default:
                        return state;
    }
}
export default userReducer;