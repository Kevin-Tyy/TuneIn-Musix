import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/navigation/sideNavigation";
import Navbar from "../components/navigation/navBar";

const HomeLayout: React.FC = () => {
	return (
		<div className="min-h-screen h-screen w-full bg-black p-3">
			<div className="flex h-full gap-4 text-sm">
				<SideNav />
				<div className="w-full h-full text-white relative">
					<Navbar />
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default HomeLayout;
