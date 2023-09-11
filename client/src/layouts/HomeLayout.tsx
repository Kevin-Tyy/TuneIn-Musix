import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/navigation/sideNavigation";
import { useDispatch } from "react-redux";
import { _getToken } from "../api/fetch/config";
import { addToken } from "../redux/slices/Accountslice";
import Player from "../components/player";
import SideBarLayout from "./SideBarLayout";

const HomeLayout: React.FC = () => {
	document.title = "Tune In • Music is vivid";
	const dispatch = useDispatch();

	useEffect(() => {
		requestToken();
		const tokenRefreshInterval = setInterval(() => {
			requestToken();
		}, 3600000);

		// Clean up the interval when the component unmounts
		return () => {
			clearInterval(tokenRefreshInterval);
		};
	}, []);

	const requestToken = async () => {
		const accessToken = await _getToken();
		dispatch(addToken(accessToken));
	};
	const [isExpanded, setExpanded] = useState(true);
	return (
		<div className="relative flex flex-col">
			<div className="flex-1">
				<div className="flex pt-3 px-3 gap-4 text-sm relative">
					<SideNav />
					<div
						className={`w-full h-full min-h-[90vh] flex ${
							isExpanded ? "gap-4" : "gap-0"
						}`}>
						<div className="w-full h-full min-h-[90vh] sticky top-4 text-white bg-neutral-950 rounded-lg pb-52">
							<Outlet />
						</div>
						<SideBarLayout
							isExpanded={isExpanded}
							setExpanded={() => setExpanded(false)}
						/>
					</div>
				</div>
			</div>
			<Player
				isExpanded={isExpanded}
				setExpanded={() => setExpanded(!isExpanded)}
			/>
		</div>
	);
};

export default HomeLayout;
