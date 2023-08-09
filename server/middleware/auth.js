import jwt from "jsonwebtoken";
const verifyToken = (req, res, next) => {
	const token = req.header("Authorization");

	if (!token) {
		return res.status(401).json({ message: "Access denied. Token missing." });
	}

	try {
		const decoded = jwt.verify(token, process.env.JsonWebTokenSecret);
		req.user = decoded; // Store the decoded user in the request object
		next();
	} catch (error) {
		return res.status(403).json({ message: "Invalid token." });
	}
};
export default verifyToken;
