import addItem from "./addItem";
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import itemCounter from "./itemCounter";

const rootReducers = combineReducers({
  addItem,
  auth: authReducer,
  itemCounter,
});

export default rootReducers;
