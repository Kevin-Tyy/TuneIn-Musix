import { Router } from "express";
import userController from "../controllers/userController.js"
import validate from '../middleware/validation.js'
import { RegisterValidationSchema } from "../validation/UserValidation.js";
const userRoute = Router()

userRoute.post('/register', validate(RegisterValidationSchema), userController.register)

export default userRoute
