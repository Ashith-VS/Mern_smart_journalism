import { combineReducers } from "redux";
import AuthenticationReducer from "./AuthenticationReducer";
import NewsReducer from "./NewsReducer";
import PublicReducer from "./PublicReducer";

export default combineReducers({
    AuthenticationReducer,
    NewsReducer,
    PublicReducer
})