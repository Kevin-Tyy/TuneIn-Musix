import axios from "axios";
import useCustomRoutes from "./routes";
import { ApiRoot } from "./api/config/apiRoot";
const App = () => {
	axios.create({
		baseURL: ApiRoot,
		withCredentials: true,
	});
	const routes = useCustomRoutes();
	return <div className="min-h-screen h-full bg-black">{routes}</div>;
};

export default App;
