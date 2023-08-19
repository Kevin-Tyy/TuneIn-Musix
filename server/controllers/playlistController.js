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
					return res.status(404).json({ msg: "Couldn't create playlist" });
				}
			} catch (error) {
				console.log(error);
				return res.status(500).json({ msg: "Something went wrong" });
			}
		}
	};
	getPlaylists = async (req, res) => {
		try {
			const playlists = await playlistService.getPlaylists(req.params);
			if (playlists) {
				res.status(200).json(playlists);
			}
		} catch (error) {
			res.status(500).json({ msg: "Something went wrong" });
		}
	};
	getSinglePlaylist = async (req, res) => {
		try {
			const playlist = await playlistService.getPlaylist(req.params);
			if (playlist) {
				return res.status(200).json(playlist);
			} else {
				return res.json("Playlist not found");
			}
		} catch (error) {
			res.status(500).json({ msg: "Something went wrong" });
		}
	};
	deletePlaylist = async (req, res) => {
		try {
			const deletedPlaylist = await playlistService.deletePlaylist(req.params);
			{
				deletedPlaylist
					? res.status(200).json({ msg: "playlist deleted" })
					: res
							.status(400)
							.json({ msg: "Couldn't delete playlist\n Try again later" });
			}
		} catch (error) {
			res.status(500).json({ msg: "Something went wrong" });
		}
	};
	updatePlaylist = async (req, res) => {
		try {
			const updatedPlaylist = await playlistService.updatePlaylist(
				req.params,
				req.body
			);
			{
				updatedPlaylist
					? res.status(200).json({ msg: "playlist Updated" })
					: res
							.status(400)
							.json({ msg: "Couldn't update playlist \n Try again later" });
			}
		} catch (error) {
			res.status(500).json({ msg: "Something went wrong" });
		}
	};
}

export default new PlayListController();
