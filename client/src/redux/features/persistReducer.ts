import { persistConfig } from "./config/persistConfig";

// src/redux/rootReducer.js
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import authReducer from "../slices/AuthSlice";

const rootReducer = combineReducers({
	auth: authReducer,
	// Add other reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
