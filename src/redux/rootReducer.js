import { combineReducers } from "redux";
import userReducer from "../features/user/userReducer";
import photosReducer from "../features/photos/photosReducer";

const rootReducer=combineReducers({
    user:userReducer,
    photo:photosReducer
})
export default rootReducer