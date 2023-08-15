import { Router } from "express";
import UserRouter from './userRoute.js'
import AuthRouter from "./authRoute.js";
import PlaylistRoute from "./playlistRoute.js";
const router = Router();
router.use('/user' , UserRouter)
router.use('/auth' , AuthRouter)
router.use('/playlist' , PlaylistRoute)


export default router