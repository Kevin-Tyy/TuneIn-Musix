import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// slice to to store users recent search activity
interface MusicState {
	savedMusic: string[]; // Assuming musicId is of string type
	userToken: string | null; //
	recentMusic: string[];
}

const initialState: MusicState = {
	savedMusic: [],
	userToken: null,
	recentMusic: [],
};

const userAccountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		//token string for spotify SDK
		addToken: (state, { payload }) => {
			state.userToken = payload;
		},
		//add or remove music from saved/liked list
		saveMusic: (state, action: PayloadAction<string>) => {
			state.savedMusic.push(action.payload);
		},
		removeMusic: (state, action: PayloadAction<string>) => {
			state.savedMusic = state.savedMusic.filter(
				(musicId) => musicId !== action.payload
			);
		},
		//add or remove music from recently searched and played library
		addRecentMusic: (state, { payload }) => {
			state.recentMusic.push(payload);
			state.recentMusic = [...new Set(state.recentMusic)];
		},
		removeRecentMusic: (state, { payload }) => {
			state.recentMusic = state.recentMusic.filter(
				(musicId) => musicId !== payload
			);
		},
		clearAllRecentMusic: (state) => {
			state.recentMusic = [];
		},
	},
});

export const {
	addRecentMusic,
	addToken,
	saveMusic,
	removeMusic,
	removeRecentMusic,
	clearAllRecentMusic,
} = userAccountSlice.actions;
export default userAccountSlice.reducer;

export const userAccount = (state: any) => state.account;
