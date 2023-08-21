import app from "./app/app.js";
import { createServer } from "http";
import mongodb from "./db/mongodb.js";
const PORT = process.env.PORT;
const server = createServer(app);

const startServer = async () => {
	await mongodb();
	server.listen(PORT, () => {
		console.log(`Server running ... 😎 😎`);
	});
};

startServer();
