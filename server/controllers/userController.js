import UserModel from "../models/usersModel.js";
import userService from "../services/userService.js";
import createToken from "../utils/createJwt.js";
class UserController {
	register = async (req, res) => {
		try {
			const { email, username } = req.body;
			const userByEmail = await UserModel.findOne({ email });
			const userByUsername = await UserModel.findOne({ username });
			if (
				userByEmail &&
				userByEmail.authenticationmethod !== "email_password"
			) {
				return res.status(400).json({
					msg: `Email was already registered using ${userByEmail.provider}`,
				});
			}
			if (userByUsername) {
				return res
					.status(400)
					.json({ msg: `Username ${username} is already registered` });
			}
			if (userByEmail) {
				return res
					.status(400)
					.json({ msg: `Email '${email}' is already registered` });
			}
			const createUser = await userService.createUser(req.body);
			if (createUser) {
				const token = await createToken(createUser);
				res.status(201).json({
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
	getProfiles = async (req, res) => {
		try {
			const { name } = req.params;
			const userData = await UserModel.findOne({ username: name }).select(
				"-password"
			);
			res.json({ user: userData });
		} catch (error) {
			console.log(error);
			res.status(500).json({ msg: "Something went wrong" });
		}
	};
	updateProfiles = async (req, res) => {
		try {
			const { _id } = req.user;
			const updateUser = await userService.updateUser(_id, req.body);
			if (updateUser) {
				res.status(200).json({
					user: updateUser,
					msg: "Your account has been updated",
				});
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ msg: "Something went wrong" });
		}
	};
	getUser = async (req, res) => {
		try {
			const { _id } = req.user;
			const userData = await UserModel.findOne({ _id }).select("-password");
			res.json({ user: userData, msg: "Authenticated successfully" });
		} catch (error) {
			res.status(400).json({ msg: "Something went wrong" });
		}
	};
}

export default new UserController();
