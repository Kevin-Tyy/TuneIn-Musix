import PlaylistModel from "../models/playlistModel.js";
import UserModel from "../models/usersModel.js";

class playlistService {
	createPlaylist = async ({ playlistName, userId }) => {
		try {
            const user = await UserModel.findById(userId);
            if(user){
                const newPlayList = new PlaylistModel({
                    playlistName,
                    user: creatorId,
                });
                return await newPlayList.save();
            }
		} catch (error) {
			throw new Error(error.message + "Krinc");
		}
	};
}
export default new playlistService();
