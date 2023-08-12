import { model, Schema } from "mongoose";
const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
	},
	avatar: {
		type: String,
	},
	savedMusic: [
		{
			type: String,
		},
	],
	authenticationmethod: {
		type: String,
		enum: ["oauth", "email_password"],
		default: "email_password",
	},
	provider: {
		type: String,
		enum: ["google", "github", "facebook", "twitter"],
	},
});

const UserModel = model("Users", UserSchema);
export default UserModel;
