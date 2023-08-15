import React, { useState, useRef } from "react";
import { TrackType } from "../types";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiDotsVerticalRounded, BiHeart } from "react-icons/bi";
import { BsHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
	removeMusic,
	saveMusic,
	userAccount,
} from "../redux/slices/Accountslice";
import useDuration from "../hooks/useDuration";
import SettingsModal from "../pages/playlists/playlist/components/SettingsModal";
type TrackBoxProps = {
	item: TrackType;
	index?: number;
};
const TrackBox: React.FC<TrackBoxProps> = ({ item, index }) => {
	const settingsRef = useRef<HTMLDivElement>(null);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const { savedMusic } = useSelector(userAccount);
	const dispatch = useDispatch();
	const addToLikes = (musicId: string) => {
		if (savedMusic.includes(musicId)) {
			dispatch(removeMusic(musicId));
		} else {
			dispatch(saveMusic(musicId));
		}
	};
	const handleSettingsOutsideClick = (e: any) => {
		if (settingsRef.current && !settingsRef.current.contains(e.target)) {
			setIsSettingsOpen(false);
		}
	};
	document.addEventListener("mousedown", handleSettingsOutsideClick);

	const duration = useDuration(item?.duration_ms);
	if (!item) {
		return;
	}
	return (
		<div className="flex items-center gap-5 select-none">
			<p className="font-bold">{index! + 1}</p>
			<div className="flex justify-between w-full h-[90px] bg-neutral-900 p-2 group rounded-lg hover:bg-neutral-800/80 transition cursor-pointer">
				<div className="flex gap-4">
					<div className="relative ">
						<img
							src={item.album?.images[0].url!}
							className="h-full rounded-lg"
						/>
						<div className="h-full w-full rounded-lg opacity-0 bg-black/0 group-hover:bg-black/70 transition duration-200 group-hover:opacity-100 absolute inset-0 flex items-center justify-center">
							<FaPlay />
						</div>
					</div>
					<div className="flex flex-col space-y-1 justify-center">
						<h1>{item?.name}</h1>
						<p className="text-gray-400">
							{item?.artists.map((artist) => (
								<span key={artist.id}>
									<Link to={`/artist/${artist.id}`} className="hover:underline">
										{artist.name}
									</Link>
									{item.artists.indexOf(artist) !== item.artists.length - 1 &&
										", "}
								</span>
							))}
						</p>
					</div>
				</div>
				<div className="flex gap-5 items-center px-3">
					{!savedMusic.includes(item.id) ? (
						<BiHeart
							size={22}
							className="opacity-0 hover:opacity-100 group-hover:opacity-50"
							onClick={() => addToLikes(item.id)}
						/>
					) : (
						<BsHeartFill
							size={22}
							className="opacity-50 hover:opacity-100 hidden group-hover:block"
							onClick={() => addToLikes(item.id)}
						/>
					)}
					<div>
						<p className="text-gray-400">{duration} mins</p>
					</div>
					<BiDotsVerticalRounded
						onClick={() => {}}
						size={25}
						className="opacity-0 hover:opacity-100  group-hover:opacity-50"
					/>
					{isSettingsOpen && (
						<div ref={settingsRef}>
							<SettingsModal show={isSettingsOpen} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TrackBox;
