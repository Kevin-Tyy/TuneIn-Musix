import React from "react";
import { GenreItemType } from "../types";
import { Link } from "react-router-dom";

type GenreBoxProps = {
	genre: GenreItemType;
};

const GenreBox: React.FC<GenreBoxProps> = ({ genre }) => {
	return (
		<Link to={genre.href} className="w-full ">
			<div className="relative group rounded-xl hover:ring-1 hover:ring-fuchsia-700 overflow-hidden">
				<img src={genre.icons[0].url!} alt="" className="w-full hover:opacity-0" />

				<div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition"></div>
				<div className="absolute inset-0 flex items-center justify-center h-full w-full opacity-0 group-hover:opacity-100">
					<p className="text-lg">{genre.name}</p>
				</div>
			</div>
		</Link>
	);
};

export default GenreBox;
