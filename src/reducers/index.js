import { combineReducers } from "redux";
import authReducer from "./auth";
import agentReducer from "./agent";
import listmakerReducer from "./listmaker"

export default combineReducers({
    auth: authReducer,
    agent: agentReducer,
    listmaker: listmakerReducer
})