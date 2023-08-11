import React from "react";
import Profile from "./components/profile";
import Header from "../Header";

const Navbar: React.FC = () => {
	return (
		<Header>
			<div className="flex justify-between items-center w-full gap-4 relative z-[10]">
				<Profile />
			</div>
		</Header>
	);
};

export default Navbar;
