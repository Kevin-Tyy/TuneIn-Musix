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
		addToken: (state, { payload }) => {
			state.userToken = payload;
		},
		saveMusic: (state, action: PayloadAction<string>) => {
			state.savedMusic.push(action.payload);
		},
		removeMusic : (state, action: PayloadAction<string>) => {
			state.savedMusic = state.savedMusic.filter((musicId) => musicId !== action.payload);
		},
		addRecentMusic: (state, { payload }) => {
			state.recentMusic.push(payload);
		},
		
		
	},
});

export const { addRecentMusic, addToken, saveMusic, removeMusic} = userAccountSlice.actions;
export default userAccountSlice.reducer;

export const userAccount = (state: any) => state.account;
