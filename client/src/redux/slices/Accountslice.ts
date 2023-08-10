import { createSlice } from "@reduxjs/toolkit";

// slice to to store users recent search activity

const userAccountSlice = createSlice({
	name: "account",
	initialState: {
		userToken: null,
		savedMusic: [],
		recentMusic: [],
	},
	reducers: {
		addToken: (state, { payload }) => {
			state.userToken = payload;
		},
		saveMusic: (state, { payload }) => {},
		addRecentMusic: (state, { payload }) => {},
	},
});

export const { addRecentMusic, addToken, saveMusic } = userAccountSlice.actions;
export default userAccountSlice.reducer;

export const userAccount = (state: any) => state.account;
