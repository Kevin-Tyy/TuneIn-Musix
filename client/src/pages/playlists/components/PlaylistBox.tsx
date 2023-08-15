import React from "react";
import { FaPlay } from "react-icons/fa";
import { PlaylistItem } from "../../../types";
import { TfiMusicAlt } from "react-icons/tfi";
import moment from "moment";
import { Link } from "react-router-dom";

interface PlaylistBoxProps {
	item: PlaylistItem;
}

const PlaylistBox: React.FC<PlaylistBoxProps> = ({ item }) => {
	return (
		<Link to={`/playlist/${item._id}`}>
			<div className="animate-slideup">
				<div className="w-full relative">
					<button className="relative w-full group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 cursor-pointer hover:bg-neutral-100/20 transition pr-4">
						<div className="relative h-28 w-28 bg-gradient-to-br from-purple-700 to-gray-400 flex items-center justify-center">
							{item.playlistImage ? (
								<img src={item.playlistImage} className="w-full object-cover" />
							) : (
								<TfiMusicAlt size={30} />
							)}
						</div>
						<div className="flex flex-col items-start space-y-2">
							<p className="font-bold truncate">{item.playlistName}</p>
							<p>
								<span className="hover:underline">{item.user.username}</span> •{" "}
								{item.songIds.length} song
								{item.songIds.length !== 1 && "s"}
							</p>
							<p className="text-xs text-gray-400">
								{item?.playlistDescription}
							</p>
						</div>
						<div className="absolute top-1 right-2">
							<p className="capitalize text-[11px] text-gray-500">
								{moment(item.createdAt).fromNow()}
							</p>
						</div>
						<div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
							<FaPlay className="text-black" />
						</div>
					</button>
				</div>
			</div>
		</Link>
	);
};

export default PlaylistBox;
