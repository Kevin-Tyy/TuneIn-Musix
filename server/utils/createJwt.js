import jwt from "jsonwebtoken";

const createToken = async ({ _id, username, email }) => {
	return jwt.sign(
		{ _id, username, email },
		process.env.JsonWebTokenSecret
	);
	
};
export default createToken;
