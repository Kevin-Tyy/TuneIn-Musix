import { Router } from "express";
import UserRouter from './userRoute.js'
import AuthRouter from "./authRoute.js";
import PlayListRoute from "./playlistRoute.js";
const router = Router();
router.use('/user' , UserRouter)
router.use('/auth' , AuthRouter)
router.use('/playlist' , PlayListRoute)


export default router