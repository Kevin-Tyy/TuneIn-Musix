import UserModel from "../models/usersModel.js";

class UserService {
	createUser = async ({ username, password, email }) => {
		try {
			const newUser = new UserModel({
				username,
				password,
				email,
			});
			return await newUser.save();
		} catch (error) {
			console.error(error);
			throw new Error("Failed to create user");
		}
	};
}
export default new UserService();
