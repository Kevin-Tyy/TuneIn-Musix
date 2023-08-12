import playlistValidationSchema from "../validation/playlistValidation.js";
import playlistService from "../services/playlistService.js";
class PlayListController {
	createPlayList = async (req, res) => {
		const { error } = playlistValidationSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ msg: error.details[0].message });
		} else {
			try {
				const newPlayList = await playlistService.createPlaylist(req.body);
				if (newPlayList) {
					return res  
						.status(200)
						.json({ msg: "Playlist created", data: newPlayList });
				} else {
                    return res.status(404).json({ msg : "Couldn't create playlist"})
				}
			} catch (error) {
				console.log(error);
				return res.status(500).json({ msg: "Something went wrong" });
			}
		}
	};
	getPlaylists = async (req, res) => {
		try {
			const playlists = await playlistService.getPlaylists(req.params)
			if(playlists){
				res.status(200).json(playlists)
			}
			console.log(playlists);
		} catch (error) {
			res.status(500).json({ msg: "Something went wrong" });
		}
	}
}

export default new PlayListController();
