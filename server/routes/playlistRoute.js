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
export default PlaylistRoute;
