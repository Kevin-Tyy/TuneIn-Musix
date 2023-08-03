import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import passport from "passport";

const AuthRouter = Router();

AuthRouter.get("/login/failed", AuthController.loginfail);

AuthRouter.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);
AuthRouter.get(
	"/google/callback",
	passport.authenticate("google"),
	AuthController.callback
);
AuthRouter.get(
	"/github",
	passport.authenticate("github", { scope: ["user:email"] })
);

AuthRouter.get(
	"/github/callback",
	passport.authenticate("github", { failureRedirect: "/login" }),
	function (req, res) {
		// Successful authentication, redirect home.
		res.redirect("/");
	}
);

export default AuthRouter;
