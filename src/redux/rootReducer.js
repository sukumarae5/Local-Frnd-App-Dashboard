import { combineReducers } from "redux";
import userReducer from "../features/user/userReducer";
import photosReducer from "../features/photos/photosReducer";
import LanguagesReducer from "../features/Languages/LanguagesReducer";
import CallsReducer from "../features/Calls/CallsReducer";
import CallsHistoryReducer from "../features/CallsShistory/CallsHistoryReducer";
import CoinsReducer from "../features/Coins/CoinsReducer";
import OffersReducer from "../features/Offers/OffersReducer";
import InterestReducer from "../features/Interest/InterestReducer";
import LifestyleReducer from "../features/Lifestyle/LifestyleReducer";
import LifestylecategoryReducer from "../features/Lifestylecategory/LifestylecategoryReducer";

const rootReducer = combineReducers({
  user: userReducer,
  photo: photosReducer,
  language: LanguagesReducer,
  calls: CallsReducer,
  callsHistory: CallsHistoryReducer,
  coins: CoinsReducer,
  offers: OffersReducer,
  interest: InterestReducer,
  lifestyle: LifestyleReducer,
  lifestylecategory: LifestylecategoryReducer,
});

export default rootReducer;