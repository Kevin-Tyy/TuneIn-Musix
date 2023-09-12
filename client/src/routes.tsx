import { useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthPage from "./pages/auth";
import NotFound from "./pages/notfound";
import HomeLayout from "./layouts/HomeLayout";
import Fallback from "./components/loading/Fallback";
const HomePage = lazy(() => import("./pages/home"));
const ProfilePage = lazy(() => import("./pages/profile"));
const SettingsPage = lazy(() => import("./pages/settings"));
const SearchPage = lazy(() => import("./pages/search"));
const LikedSongs = lazy(() => import("./pages/liked"));
const PlayLists = lazy(() => import("./pages/playlists"));
const Artist = lazy(() => import("./pages/artist"));
const Playlist = lazy(() => import("./pages/playlists/playlist"));

const useCustomRoutes = () => {
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
					element: (
						<Suspense fallback={<Fallback/>}>
							<HomePage />
						</Suspense>
					),
				},
				{
					path: "profile/:username",
					element: (
						<Suspense fallback={<Fallback/>}>
							<ProfilePage />
						</Suspense>
					),
				},
				{
					path: "settings",
					element: (
						<Suspense fallback={<Fallback/>}>
							<SettingsPage />
						</Suspense>
					),
				},
				{
					path: "search",
					element: (
						<Suspense fallback={<Fallback/>}>
							<SearchPage />
						</Suspense>
					),
				},
				{
					path: "saved",
					element: (
						<Suspense fallback={<Fallback/>}>
							<LikedSongs />
						</Suspense>
					),
				},
				{
					path: "playlists",
					element: (
						<Suspense fallback={<Fallback/>}>
							<PlayLists />
						</Suspense>
					),
				},
				{
					path: "explore",
					element: (
						<Suspense fallback={<Fallback/>}>
							<HomePage />
						</Suspense>
					),
				},
				{
					path: "/artist/:id",
					element: (
						<Suspense fallback={<Fallback/>}>
							<Artist />
						</Suspense>
					),
				},
				{
					path: "/playlist/:id",
					element: (
						<Suspense fallback={<Fallback/>}>
							<Playlist />
						</Suspense>
					),
				},
			],
		},
		{
			path: "*",
			element: <NotFound />,
		},
	]);

	return routes;
};

export default useCustomRoutes;
