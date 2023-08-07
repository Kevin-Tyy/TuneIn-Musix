import UserModel from "../models/usersModel.js";
import bcrypt from "bcrypt";
class AuthService {
	//oauth find or create user to authenticate users
	findOrCreate = async ({ displayName, photos, provider, emails }) => {
		try {
			const user = await UserModel.findOne({ email: emails[0].value });
			if (user) {
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

	//find and authenticate users using email address and password

	emailSignIn = async ({ email, password }) => {
		try {
			const user = await UserModel.findOne({ email: email });
			const isPasswordVerified = await bcrypt.compare(password, user.password);

			if (isPasswordVerified) {
				let authenticatedUser = { ...user.toObject() };
				delete authenticatedUser.password;

				return authenticatedUser;
			}
		} catch (error) {
			throw new Error(error);
		}
	};
}
export default new AuthService();
