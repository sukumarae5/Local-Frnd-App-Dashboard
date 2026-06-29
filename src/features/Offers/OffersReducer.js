import * as types from "./OffersType";

const initialState = {

    loading:false,

    saving:false,

    deleting:false,

    offers:[],

    selectedOffer:null,

    success:false,

    error:null

};

const OffersReducer=(state=initialState,action)=>{

switch(action.type){

case types.FETCH_OFFERS_REQUEST:

return{

...state,

loading:true,

error:null

};

case types.FETCH_OFFERS_SUCCESS:

return{

...state,

loading:false,

offers:action.payload,

error:null

};

case types.FETCH_OFFERS_FAILURE:

return{

...state,

loading:false,

error:action.payload

};

case types.FETCH_OFFER_SUCCESS:

return{

...state,

loading:false,

selectedOffer:action.payload

};

case types.ADD_OFFER_REQUEST:

case types.UPDATE_OFFER_REQUEST:

return{

...state,

saving:true,

success:false

};

case types.ADD_OFFER_SUCCESS:

case types.UPDATE_OFFER_SUCCESS:

return{

...state,

saving:false,

success:true

};

case types.ADD_OFFER_FAILURE:

case types.UPDATE_OFFER_FAILURE:

return{

...state,

saving:false,

error:action.payload

};

case types.DELETE_OFFER_REQUEST:

return{

...state,

deleting:true

};

case types.DELETE_OFFER_SUCCESS:

return{

...state,

deleting:false,

success:true

};

case types.DELETE_OFFER_FAILURE:

return{

...state,

deleting:false,

error:action.payload

};

case types.RESET_OFFER_STATE:

return{

...state,

saving:false,

deleting:false,

success:false,

error:null

};

default:

return state;

}

};

export default OffersReducer;