import React from "react";
import { AlbumType } from "../../../types";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
type SearchBoxProps = {
	item: AlbumType;
};
const SearchBox: React.FC<SearchBoxProps> = ({ item }) => {
	return (
		<div className="flex gap-5 w-full h-[90px] bg-neutral-900 p-2 group rounded-md hover:bg-neutral-800/80">
			<div className="relative ">
				<img src={item.images[0].url!} className="h-full " />
				<div className="h-full w-full opacity-0 bg-black/0 group-hover:bg-black/70 transition duration-300 group-hover:opacity-100 absolute inset-0 flex items-center justify-center">
					<FaPlay />
				</div>
			</div>
			<div className="flex flex-col justify-center">
				<h1>{item?.name}</h1>
				<p>{item?.artists.map(artist => 
                        <span key={artist.id}>
                            <Link to={'/'} className="hover:underline">
                                {artist.name}
                            </Link>
                            {artist.}
                        </span>
                    )}</p>
			</div>
		</div>
	);
};

export default SearchBox;
