import UserModel from "../models/usersModel.js";
import bcrypt from "bcrypt";
class AuthService {
	createUser = async ({ displayName, photos, provider, emails }) => {
		try {
			const user = await UserModel.findOne({ email: emails[0].value });
			if (user) {
				console.log("User already exists");
				return user;
			}
			const newUser = new UserModel({
				username: displayName,
				avatar: photos[0].value,
				authenticationmethod: "oauth",
				provider: provider,
				email: emails[0].value,
			});
			await newUser.save();
			return newUser;
		} catch (error) {
			console.log(error);
			throw new Error(error);
		}
	};
	emailSignIn = async ({ email, password }) => {
		try {
			const user = await UserModel.findOne({ email: email });
			const isPasswordVerified = await bcrypt.compare(password, user.password);
			if (isPasswordVerified) {
				return user;
			}

		} catch (error) {
			throw new Error(error);
		}
	};
}
export default new AuthService();
