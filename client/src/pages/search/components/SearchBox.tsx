import React from "react";
import { AlbumType } from "../../../types";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiDotsVerticalRounded, BiHeart } from "react-icons/bi";
import PlayButton from "../../../components/PlayButton";
type SearchBoxProps = {
	item: AlbumType;
};
const SearchBox: React.FC<SearchBoxProps> = ({ item }) => {
	return (
		<div className="flex justify-between w-full h-[90px] bg-neutral-900 p-2 group rounded-lg hover:bg-neutral-800/80 transition cursor-pointer">
			<div className="flex gap-4">
				<div className="relative ">
					<img src={item.images[0].url!} className="h-full rounded-lg" />
					<div className="h-full w-full rounded-lg opacity-0 bg-black/0 group-hover:bg-black/70 transition scale-50 group-hover:scale-100 group-hover:opacity-100 absolute inset-0 flex items-center justify-center">
						<FaPlay />
					</div>
				</div>
				<div className="flex flex-col space-y-1 justify-center">
					<h1>{item?.name}</h1>
					<p className="text-gray-400">
						{item?.artists.map((artist) => (
							<span key={artist.id}>
								<Link to={"/"} className="hover:underline">
									{artist.name}
								</Link>
								{item.artists.indexOf(artist) !== item.artists.length - 1 &&
									", "}
							</span>
						))}
					</p>
				</div>
			</div>
			<div className="flex items-center">
				<BiHeart
					size={22}
					className="opacity-50 hover:opacity-100 hidden group-hover:block"
				/>
				<BiDotsVerticalRounded
					size={25}
					className="opacity-50 hover:opacity-100 hidden group-hover:block"
				/>
			</div>
            <PlayButton/>
		</div>
	);
};

export default SearchBox;
