import { Navigate, useRoutes } from "react-router-dom";
import AuthPage from "./pages/auth";
import NotFound from "./pages/notfound";
import HomeLayout from "./layouts/HomeLayout";
import SettingsPage from "./pages/settings";
import ProfilePage from "./pages/profile";
import HomePage from "./pages/home";
import SearchPage from "./pages/search";
import LikedSongs from "./pages/liked";
import PlayLists from "./pages/playlists";
import Artist from "./pages/artist";
import { useSelector } from "react-redux";
import { loggedInUser } from "./redux/slices/Authslice";
const App = () => {
	const user = useSelector(loggedInUser)
	console.log(user);
	
	const routes = useRoutes([
		{
			path: "/auth",
			element: user.isLoggeIn ? <Navigate to="/"/> : <AuthPage />,
		},
		{
			path: "/",
			element: user.isLoggedIn ? <HomeLayout /> : <Navigate to="/auth"/>,
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
				{
					path: "liked",
					element: <LikedSongs />,
				},
				{
					path: "playlist",
					element: <PlayLists />,
				},
				{
					path : 'explore',
					element : <HomePage/>
				},
				{
					path : '/artist/:id',
					element : <Artist/>
				}
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
	return <div className="min-h-screen h-full bg-black">{routes}</div>;
};

export default App;
