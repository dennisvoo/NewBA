import { combineReducers } from "redux";
import nbaReducer from "./nbaReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  nba: nbaReducer,
  error: errorReducer,
  auth: authReducer
});
