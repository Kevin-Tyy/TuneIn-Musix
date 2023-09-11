import axios from "axios";
import useCustomRoutes from "./routes";
import { ApiRoot } from "./api/config/apiRoot";
import { playPause } from "./redux/slices/PlayerSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
const App = () => {
	axios.create({
		baseURL: ApiRoot,
		withCredentials: true,
	});
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(playPause());
	}, []);
	const routes = useCustomRoutes();
	return <div className="min-h-screen h-full bg-black">{routes}</div>;
};

export default App;
