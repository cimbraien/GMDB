import { combineReducers } from "redux";
import reducerReview from "./review";
import reducerMovieBanner from "./movieBanner";
import reducerUser from "./user";
import reducerMovie from "./movie";

const rootReducers = combineReducers({
  reducerReview,
  reducerMovie,
  reducerMovieBanner,
  reducerUser,
});
export default rootReducers;
