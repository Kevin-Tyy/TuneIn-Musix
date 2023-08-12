import { Router } from "express";
import PlaylistController from '../controllers/playlistController.js'
const PlayListRoute = Router()

PlayListRoute.post('/create', PlaylistController.createPlayList);
export default PlayListRoute;
