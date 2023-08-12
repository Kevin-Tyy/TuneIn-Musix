import PlaylistModel from "../models/playlistModel.js";
import UserModel from "../models/usersModel.js";
import cloudUpload from "../config/cloudinary.js";
class playlistService {
	createPlaylist = async ({ playlistName, userId, playlistImage }) => {
		try {
            let imageUploadResponse;
            if(playlistImage){
                imageUploadResponse = await cloudUpload(playlistImage)
            }
            const user = await UserModel.findById(userId);
            if(user){
                const newPlayList = new PlaylistModel({
                    playlistName,
                    user: userId,
                    playlistImage : imageUploadResponse?.secure_url
                });
                return await newPlayList.save();
            }
		} catch (error) {
			throw new Error(error.message + "Krinc");
		}
	};
}
export default new playlistService();
