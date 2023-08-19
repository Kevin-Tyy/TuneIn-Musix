import PlaylistModel from "../models/playlistModel.js";
import UserModel from "../models/usersModel.js";
import cloudUpload from "../config/cloudinary.js";
class playlistService {
	createPlaylist = async ({
		playlistName,
		userId,
		playlistImage,
		playlistDescription,
	}) => {
		try {
			let imageUploadResponse;
			if (playlistImage) {
				imageUploadResponse = await cloudUpload(playlistImage);
			}
			const user = await UserModel.findById(userId);
			if (user) {
				const newPlayList = new PlaylistModel({
					playlistName,
					user: userId,
					playlistDescription,
					playlistImage: imageUploadResponse?.secure_url,
				});
				return await newPlayList.save();
			}
		} catch (error) {
			throw new Error(error);
		}
	};
	getPlaylists = async ({ id }) => {
		try {
			const playlists = await PlaylistModel.find({ user: id }).populate("user");
			if (playlists) {
				return playlists;
			}
		} catch (error) {
			throw new Error(error);
		}
	};
	getPlaylist = async ({ id }) => {
		try {
			const playlists = await PlaylistModel.findById(id).populate("user");
			if (playlists) {
				return playlists;
			}
		} catch (error) {
			throw new Error(error);
		}
	};
	deletePlaylist = async ({ id }) => {
		try {
			const playlist = await PlaylistModel.findByIdAndDelete(id);
			if (playlist) {
				return playlist;
			}
		} catch (error) {
			throw new Error(error);
		}
	};
	updatePlaylist = async ({ id }, data) => {
		try {
			const playlist = await PlaylistModel.findByIdAndUpdate(id, { $set: { ...data } });
			return playlist
		} catch (error) {
			throw new Error(error);
		}
	};
}
export default new playlistService();
