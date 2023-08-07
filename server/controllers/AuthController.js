import UserModel from "../models/usersModel.js";
import authService from "../services/authService.js";
import createToken from "../utils/createJwt.js";
class AuthController {
	//controller to handle open authentication (oauth) 🫡🫡
	callback = async (req, res) => {
		console.log("callback reached 🫡🫡🫡");
		const token = (await createToken(req.user)) || "kevin";

		// res.json({ msg: "Logged in successfully", user: req.user, token: token });
		res.redirect(`${process.env.CLIENT_URL}?token={token}`);
	};

	//controller to handle authentication by email and password
	emailSignin = async (req, res) => {
		try {
			const userByEmail = await UserModel.findOne({ email: req.body.email });
			//check whether the email is registered

			if (userByEmail) {
				//check whether the user registerd with oauth

				if (userByEmail.authenticationmethod === "oauth") {
					return res.status(403).send({
						msg: "This user used another authentication method. Try logging in with google or github.",
					});
				} else {
					const authUser = await authService.emailSignIn(req.body);
					if (authUser) {
						const token = await createToken(authUser);
						res.status(200).json({
							msg: "Logged in successfully",
							user: authUser,
							token: token,
						});
					} else {
						res.status(404).json({ msg: "Incorrect password" });
					}
				}
			} else {
				return res.status(404).json({ msg: "User not registered" });
			}
		} catch (error) {
			res.status(500).json({ msg: "Something went wrong" });
			throw new Error(error.message);
		}
	};
}

export default new AuthController();
