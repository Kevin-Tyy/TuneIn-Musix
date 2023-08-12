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
			const playlists =  await PlaylistModel.find({ user : id}).populate('user');
            if(playlists){
                return playlists
            }
		} catch (error) {
			throw new Error(error);
		}
	};
}
export default new playlistService();
