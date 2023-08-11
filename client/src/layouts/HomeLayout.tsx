import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/navigation/sideNavigation";
import Navbar from "../components/navigation/navBar";

const HomeLayout: React.FC = () => {
	document.title = "Tune In"
	return (
		<div className="flex min-h-screen p-3 gap-4 text-sm relative">
			<SideNav />
			<div className="w-full h-full text-white relative rounded-lg">
				<Navbar />
				<Outlet />
			</div>
		</div>
	);
};

export default HomeLayout;
