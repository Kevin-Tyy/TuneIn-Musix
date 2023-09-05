import { Router } from "express";
import userController from "../controllers/userController.js";
import validate from "../middleware/validation.js";
import { RegisterValidationSchema } from "../validation/userValidation.js";
import verifyToken from "../middleware/auth.js";
const userRoute = Router();

userRoute.post(
	"/register",
	validate(RegisterValidationSchema),
	userController.register
);
userRoute.get("/profile/:name", verifyToken, userController.getProfiles);
userRoute.patch("/profile/:id", verifyToken, userController.updateProfiles);
userRoute.get("/getUser", verifyToken, userController.getUser);

export default userRoute;
