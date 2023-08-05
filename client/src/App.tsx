import { useRoutes } from "react-router-dom";
import AuthPage from "./pages/auth";
import Home from "./pages/home";
import Profile from "./pages/profile";
import NotFound from "./pages/notfound";
import HomeLayout from "./layouts/HomeLayout";
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
					element: <Home />,
				},
				{
					path: "profile",
					element: <Profile />,
				},
			],
		},
		{
			path: "*",
			element: <NotFound />,
		},
	]);
	return <div className="h-screen">{routes}</div>;
};

export default App;
