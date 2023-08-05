import UserModel from "../models/usersModel.js";
import authService from "../services/authService.js";
import createToken from "../utils/createJwt.js";
class AuthController {
	callback = (req, res) => {
		console.log('callback reached 🫡🫡🫡')
		res.json({ msg: "you reached callback" });
	};
	emailSignin = async (req, res) => {
		try {
			const userByEmail = await UserModel.findOne({ email: req.body.email });
			//check whether the email is registered
            
			if (userByEmail) {
				//check whether the user registerd with oauth

				if (userByEmail.authenticationmethod === "oauth") {
					return res.status(403).send({
						msg: "This user used another authentication method \n Try logging in with google or github.",
					});
				} else {
					const authUser = await authService.emailSignIn(req.body);
					if (authUser) {
						const token = await createToken(authUser);
						console.log(authUser);
						res
							.status(200)
							.json({ msg: "login successful", user: authUser, token: token });
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
