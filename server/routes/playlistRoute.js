import { Router } from "express";
import PlaylistController from "../controllers/playlistController.js";
import playlistController from "../controllers/playlistController.js";
const PlaylistRoute = Router();

PlaylistRoute.post("/create", PlaylistController.createPlayList);
PlaylistRoute.get("/:id", PlaylistController.getPlaylists);
PlaylistRoute.route("/single/:id")
	.get(playlistController.getSinglePlaylist)
	.delete(playlistController.deletePlaylist)
	.patch(playlistController.updatePlaylist);

PlaylistRoute.route("/add/:id")
	.post(playlistController.addSongsToPlaylist)
	.delete(playlistController.removeSongsToPlaylist);

export default PlaylistRoute;
