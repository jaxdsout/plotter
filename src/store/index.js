import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import agentReducer from './reducers/agent';
import listmakerReducer from './reducers/listmaker';
import uiReducer from './reducers/ui';
import timeoutWare from './middleware/timeout';

const rootReducer = combineReducers({
    auth: authReducer,
    agent: agentReducer,
    listmaker: listmakerReducer,
    ui: uiReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(timeoutWare),
    preloadedState: {}, 
});

export default store;
