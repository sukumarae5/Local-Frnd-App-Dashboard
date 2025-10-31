import { combineReducers } from "redux";
import userReducer from "../features/user/userReducer";

const rootReducer=combineReducers({
    user:userReducer
})
export default rootReducer