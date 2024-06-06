import { combineReducers } from "redux";
import authReducer from "./auth";
import dashReducer from './dash';

export default combineReducers({
    auth: authReducer,
    dash: dashReducer
})