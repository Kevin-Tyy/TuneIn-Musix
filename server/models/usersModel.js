import { model, Schema } from "mongoose";
const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
	},
    savedMusic : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Music'
        }
    ],
	authenticationmethod : {
		type : String,
		enum : ['oauth' , 'email_password'],
	}
});

const UserModel = model('Users' , UserSchema);
export default UserModel;
