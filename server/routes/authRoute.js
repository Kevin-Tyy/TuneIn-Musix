import { Router } from "express";
import AuthController from "../controllers/authController.js";
import passport from "passport";
import validate from "../middleware/validation.js";
import { AuthValidationSchema } from "../validation/authValidation.js";
const AuthRouter = Router();

//google oauth---->
AuthRouter.get(
	"/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
	})
);

//callback route for google to redirect to ----->
AuthRouter.get(
	"/google/callback",
	passport.authenticate("google"),
	AuthController.callback
);

//github oauth ------>
AuthRouter.get(
	"/github",
	passport.authenticate("github", { scope: ["user:email"] })
);

//callback route for github to redirect to ----->
AuthRouter.get(
	"/github/callback",
	passport.authenticate("github", { failureRedirect: "/login" }),
	AuthController.callback
);

//email and password authentication
AuthRouter.post(
	"/signin/email",
	validate(AuthValidationSchema),
	AuthController.emailSignin
);

export default AuthRouter;
