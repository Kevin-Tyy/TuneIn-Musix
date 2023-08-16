import { createSlice } from "@reduxjs/toolkit";

const PlayerSlice = createSlice({
	name: "player",
	initialState: {
		isPlaying: false,
		currentTrack: null,
		currentPlaylist: null,
	},
	reducers: {
		playPause: (state) => {
			state.isPlaying = !state.isPlaying;
		},
		setCurrentTrack: (state, { payload }) => {
			state.currentTrack = payload;
		},
	},
});
export const { playPause, setCurrentTrack } = PlayerSlice.actions;
export default PlayerSlice.reducer;
export const playerStatus = (state: any) => state.player;
