import React from "react";
import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import Profile from "./components/profile";

const Navbar: React.FC = () => {
	useSelector;
	return (
		<div className="flex gap-4 relative z-[10]">
			<div className=" p-3 rounded-3xl w-full">
				<form>
					<div className="flex items-center gap-5">
						<input
							className="bg-neutral-800 w-full max-w-2xl p-3 rounded-full pl-5 outline-none"
							placeholder="Search"
						/>
						<button className="bg-neutral-800 text-white p-3 rounded-full">
							<FiSearch size={20} />
						</button>
					</div>
				</form>
			</div>
			<Profile />
		</div>
	);
};

export default Navbar;
