import { Router } from "express";
import AuthController from "../controllers/authController.js";
import passport from "passport";
import validate from "../middleware/validation.js";
import { AuthValidationSchema } from "../validation/authValidation.js";
const AuthRouter = Router();

//google oauth
AuthRouter.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);
AuthRouter.get(
	"/google/callback",
	passport.authenticate("google"),
	AuthController.callback
);

//github oauth
AuthRouter.get(
	"/github",
	passport.authenticate("github", { scope: ["user:email"] })
);

AuthRouter.get(
	"/github/callback",
	passport.authenticate("github", { failureRedirect: "/login" })
);

//email auth
AuthRouter.post(
	"/signin/email",
	validate(AuthValidationSchema),
	AuthController.emailSignin
);

export default AuthRouter;
