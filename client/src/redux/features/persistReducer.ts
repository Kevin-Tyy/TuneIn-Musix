import { persistConfig } from "./config/persistConfig";

// src/redux/rootReducer.js
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AuthReducer from "../slices/Authslice";
import AccountReducer from "../slices/AccountSlice";

const rootReducer = combineReducers({
	account : AccountReducer,
	auth: AuthReducer,
	// Add other reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
