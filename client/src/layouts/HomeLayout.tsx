import React from "react";
import { Outlet } from "react-router-dom";

const HomeLayout: React.FC = () => {
	return (
		<div className="min-h-screen w-full bg-primary-dark">
			hello world
			<Outlet />
		</div>
	);
};

export default HomeLayout;
