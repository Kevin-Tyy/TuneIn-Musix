import { Router } from "express";
import PlaylistController from '../controllers/playlistController.js'
const PlaylistRoute = Router()

PlaylistRoute.post('/create', PlaylistController.createPlayList);
PlaylistRoute.get('/:id', PlaylistController.getPlaylists);
PlaylistRoute.get('/single/:id', PlaylistController.getSinglePlaylist);
export default PlaylistRoute;
