import { Router } from "express";
import UserRouter from './userRoute.js'
import AuthRouter from "./authRoute.js";
const router = Router();
router.use('/user' , UserRouter)
router.use('/auth' , AuthRouter)


export default router