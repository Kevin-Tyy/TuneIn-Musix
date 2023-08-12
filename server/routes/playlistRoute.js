import { Router } from "express";
import PlaylistController from '../controllers/playlistController.js'
const PlayListRoute = Router()

PlayListRoute.post('/create', PlaylistController.createPlayList);
PlayListRoute.get('/:id', PlaylistController.getPlaylists);
export default PlayListRoute;
