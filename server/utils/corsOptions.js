export const corsOptions = {
	origin: "http://localhost:5173", // Replace with your frontend domain
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true, // Allows cookies and authentication headers to be passed
	optionsSuccessStatus: 204, // Returns a 204 No Content status for preflight requests
};
