import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		isLoggedIn: false,
	},
	reducers: {
		login: (state, { payload }) => {
			state.user = payload;
			state.isLoggedIn = true;
		},
		logout: (state) => {
			state.user = null;
			state.isLoggedIn = false;
		},
	},
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
export const loggedInUser = (state: any) => state.auth;
