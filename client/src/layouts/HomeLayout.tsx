import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/navigation/sideNavigation";
import { useDispatch } from "react-redux";
import { _getToken } from "../api/fetch/config";
import { addToken } from "../redux/slices/Accountslice";
import Player from "../components/player";

const HomeLayout: React.FC = () => {
	document.title = "Tune In";
	const dispatch = useDispatch();
	useEffect(() => {
		requestToken();
	}, []);

	const requestToken = async () => {
		const accessToken = await _getToken();
		dispatch(addToken(accessToken));
	};

	return (
		<div className="relative flex flex-col">
			<div className="flex-1">
				<div className="flex pt-3 px-3 gap-4 text-sm relative">
					<SideNav />
					<div className="w-full h-full text-white relative rounded-lg pb-5">
						<Outlet />
					</div>
				</div>
			</div>
			<Player />
		</div>
	);
};

export default HomeLayout;
