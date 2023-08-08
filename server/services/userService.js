import UserModel from "../models/usersModel.js";
import bcrypt from "bcrypt";

class UserService {
	createUser = async ({ username, password, email }) => {
		try {
			const passwordHash = await bcrypt.hash(password, 10);
			const newUser = new UserModel({
				username,
				password: passwordHash,
				email,
			});
			const user = await newUser.save();
			const createdUser = await UserModel.findOne({ email: user.email }).select('-password');
			return createdUser;
		} catch (error) {
			console.error(error);
			throw new Error("Failed to create user");
		}
	};
}
export default new UserService();
