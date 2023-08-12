import mongoose, { model, Schema } from "mongoose";

const PlaylistSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users",
	},
	playlistName: {
		type: String,
		required: true,
		unique: true,
	},
	playlistDescription: {
		type: String,
	},
	playlistImage : {
		
	},
	songIds: [
		{
			type: String,
		},
	],
});
const PlaylistModel = model("PlayList", PlaylistSchema );
export default PlaylistModel;
