import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from './reducers/auth';
import agentReducer from './reducers/agent';
import listmakerReducer from './reducers/listmaker';
import uiReducer from './reducers/ui';
import timeoutWare from './middleware/timeout';

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "agent", "listmaker", "ui"],
};

const rootReducer = combineReducers({
    auth: authReducer,
    agent: agentReducer,
    listmaker: listmakerReducer,
    ui: uiReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, 
        }).concat(timeoutWare),
    preloadedState: {}, 
});

export const persistor = persistStore(store);
