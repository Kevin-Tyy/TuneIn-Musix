import { useRoutes } from "react-router-dom";
import AuthPage from "./pages/auth";
import NotFound from "./pages/notfound";
import HomeLayout from "./layouts/HomeLayout";
import SettingsPage from "./pages/settings";
import ProfilePage from "./pages/profile";
import HomePage from "./pages/home";
import SearchPage from "./pages/search";
const App = () => {
	const routes = useRoutes([
		{
			path: "/auth",
			element: <AuthPage />,
		},
		{
			path: "/",
			element: <HomeLayout />,
			children: [
				{
					index: true,
					element: <HomePage />,
				},
				{
					path: "profile",
					element: <ProfilePage />,
				},
				{
					path: "settings",
					element: <SettingsPage />,
				},
				{
					path: "search",
					element: <SearchPage />,
				},
			],
		},
		{
			path: "*",
			element: <NotFound />,
		},
	]);
	// const axiosConfig = axios.create({
	// 	baseURL : ApiRoot,
	// 	withCredentials : true,

	// })
	return <div className="h-screen">{routes}</div>;
};

export default App;
