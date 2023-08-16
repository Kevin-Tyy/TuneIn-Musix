import { persistConfig } from "./config/persistConfig";

// src/redux/rootReducer.js
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AuthReducer from "../slices/Authslice";
import AccountReducer from "../slices/Accountslice";
import PlayerReducer from "../slices/PlayerSlice";

const rootReducer = combineReducers({
	account: AccountReducer,
	auth: AuthReducer,
	player: PlayerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
