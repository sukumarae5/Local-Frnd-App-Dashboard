import { combineReducers } from "redux";
import userReducer from "../features/user/userReducer";
import photosReducer from "../features/photos/photosReducer";
import LanguagesReducer from "../features/Languages/LanguagesReducer";

const rootReducer=combineReducers({
    user:userReducer,
    photo:photosReducer,
    language:LanguagesReducer
})
export default rootReducer