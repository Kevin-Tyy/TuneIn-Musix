import { createSlice } from "@reduxjs/toolkit";

const PlayerSlice = createSlice({
	name: "player",
	initialState: {
		isPlaying: false,
		currentTrack: null,
		currentPlaylist: null,
	},
	reducers: {
		playPause: (state, { payload }) => {
			state.isPlaying = payload;
		},
		setCurrentTrack: (state, { payload }) => {
			state.currentTrack = payload;
		},
	},
});

export const { playPause, setCurrentTrack } = PlayerSlice.actions;
export default PlayerSlice.reducer;
export const loggedInUser = (state: any) => state.auth;
