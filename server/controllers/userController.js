import UserModel from "../models/usersModel.js";
import userService from "../services/userService.js";
import createToken from "../utils/createJwt.js";
class UserController {
	register = async (req, res) => {
		try {
			const { email, username } = req.body;
			const userByEmail = await UserModel.findOne({ email });
			const userByUsername = await UserModel.findOne({ username });
			if (userByUsername) {
				return res
					.status(409)
					.json({ msg: `Username ${username} is already registered` });
			}
			if (userByEmail) {
				return res
					.status(409)
					.json({ msg: `Email '${email}' is already registered` });
			}
			const createUser = await userService.createUser(req.body);
			if (createUser) {
				const token = await createToken(createUser);
				res
					.status(201)
					.json({
						user: createUser,
						token: token,
						msg: "Your account has been created",
					});
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ msg: "Something went wrong" });
		}
	};
}

export default new UserController();
