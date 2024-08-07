import { combineReducers } from "redux";
import AuthenticationReducer from "./AuthenticationReducer";
import NewsReducer from "./NewsReducer";

export default combineReducers({
    AuthenticationReducer,
    NewsReducer
})