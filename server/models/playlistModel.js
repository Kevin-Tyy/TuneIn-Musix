import mongoose, { model, Schema } from "mongoose";

const PlaylistSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "Users",
	},
	playlistName: {
		type: String,
		required: true,
	},
	playlistDescription: {
		type: String,
	},
	playlistImage: {
		type : String,
	},
	songIds: [
		{
			type: String,
		},
	],
}, { timestamps : true },);
const PlaylistModel = model("PlayList", PlaylistSchema);
export default PlaylistModel;
