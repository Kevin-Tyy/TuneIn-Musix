import { Router } from "express";
import userController from "../controllers/userController.js"
import validate from '../middleware/validation.js'
import { RegisterValidationSchema } from "../validation/userValidation.js";
const userRoute = Router()

userRoute.post('/register', validate(RegisterValidationSchema), userController.register)
userRoute.get('/getUser' , userController.getUser)

export default userRoute
