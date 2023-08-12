import React, { useState } from "react";
import { PlaylistItem } from "../../../types";
import { FiSearch } from "react-icons/fi";
import { LuSettings2 } from "react-icons/lu";

interface PlaylistSearchProps {
	playlists?: PlaylistItem[];
	onFilterChange: (value: any) => void;
}

const PlaylistSearch: React.FC<PlaylistSearchProps> = ({ onFilterChange }) => {
	const [filterText, setFilterText] = useState("");
	const handleInputChange = (e: any) => {
		const newText = e.target.value;
		setFilterText(newText);
		onFilterChange(newText);
	};

	return (
		<div className="w-full max-w-md py-1 pl-4 pr-2 ring-1 ring-gray-600 bg-transparent transition duration-300 focus-within:ring-fuchsia-700 flex items-center space-x-3 rounded-full">
			<FiSearch />
			<input
				type="text"
				placeholder="Search playlists"
				value={filterText}
				onChange={handleInputChange}
				className="text-white w-full bg-transparent outline-none "
			/>
			<button className="flex space-x-2 items-center text-gray-400 cursor-pointer  p-2 rounded-md">
				<LuSettings2 />
				<p className="capitalize">Filters</p>
			</button>
		</div>
	);
};

export default PlaylistSearch;
