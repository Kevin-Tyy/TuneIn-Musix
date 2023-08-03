import { Router } from "express";
import AuthController from '../controllers/AuthController.js'
const AuthRouter = Router()

AuthRouter.post('/signin', AuthController.Signin)

export default AuthRouter