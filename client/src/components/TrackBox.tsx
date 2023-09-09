import React from "react";
import { TrackType } from "../types";
import { FaPause, FaPlay } from "react-icons/fa";
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
import { playerStatus, setCurrentTrack } from "../redux/slices/PlayerSlice";
import { Bars } from "react-loader-spinner";
import clsx from "clsx";
type TrackBoxProps = {
	item: TrackType;
	index?: number;
};
const TrackBox: React.FC<TrackBoxProps> = ({ item, index }) => {
	const { savedMusic } = useSelector(userAccount);
	const { currentTrack, isPlaying } = useSelector(playerStatus);
	const dispatch = useDispatch();
	const addToLikes = (musicId: string) => {
		if (savedMusic.includes(musicId)) {
			dispatch(removeMusic(musicId));
		} else {
			dispatch(saveMusic(musicId));
		}
	};

	const duration = useDuration(item?.duration_ms);
	if (!item) {
		return;
	}
	const handlePlayTrack = () => {
		dispatch(setCurrentTrack(item));
	};
	const handleDragStart = (id: string, e: any) => {
		e.dataTransfer.setData("track", id);
		console.log("Drag started");
	};
	return (
		<div
			draggable="true"
			onDragStart={(e) => handleDragStart(item?.id, e)}
			className={`flex items-center select-none ${
				currentTrack?.id === item?.id && isPlaying ? "gap-4" : "gap-6"
			}`}>
			{currentTrack?.id === item?.id && isPlaying ? (
				<Bars width={16} height={40} color="purple"/>
			) : (
				<p
					className={clsx(
						"text-gray-400 transition duration-500",
						currentTrack?.id == item?.id && "text-fuchsia-600"
					)}>
					{index! + 1}
				</p>
			)}
			<div
				className={`flex  w-full h-[70px] ${
					currentTrack?.id === item?.id && "bg-neutral-800/90"
				} p-2 group rounded-sm hover:bg-neutral-800 cursor-pointer`}>
				<div
					className="flex justify-start w-full gap-4"
					onClick={handlePlayTrack}>
					<div className="relative ">
						<img
							src={item.album?.images[0].url!}
							className="h-full rounded-sm"
						/>
						<div className="h-full w-full rounded-sm opacity-0 bg-black/0 group-hover:bg-black/50 transition duration-200 group-hover:opacity-100 absolute inset-0 flex items-center justify-center">
							{isPlaying && currentTrack.id === item.id ? (
								<FaPause />
							) : (
								<FaPlay />
							)}
						</div>
					</div>
					<div className="flex flex-col space-y-1 justify-center">
						<h1
							className={`${
								currentTrack?.id === item?.id &&
								"text-fuchsia-500 transition duration-500"
							}`}>
							{item?.name}
						</h1>
						<p className="text-gray-400">
							{item?.artists.map((artist) => (
								<span key={artist.id}>
									<Link
										to={`/artist/${artist.id}`}
										className="hover:underline text-sm">
										{artist.name}
									</Link>
									{item.artists.indexOf(artist) !== item.artists.length - 1 &&
										", "}
								</span>
							))}
						</p>
					</div>
				</div>
				<div className="w-full flex  items-center justify-center">
					<p className="text-xs text-start hover:underline">
						{item?.album?.name.length > 20
							? item?.album?.name.slice(0, 20) + "...."
							: item?.album?.name}
					</p>
				</div>
				<div className="flex w-full justify-end gap-5 items-center px-3">
					{!savedMusic.includes(item?.id) ? (
						<BiHeart
							size={18}
							className="opacity-0 hover:opacity-100 group-hover:opacity-50 text-fuchsia-500 transition duration-500 active:animate-ping"
							onClick={() => addToLikes(item?.id)}
						/>
					) : (
						<BsHeartFill
							size={18}
							className="opacity-50 hover:opacity-100 invisible group-hover:visible text-fuchsia-500 transition duration-500 active:animate-ping"
							onClick={() => addToLikes(item?.id)}
						/>
					)}
					<div>
						<p className="text-gray-400 text-sm">{duration}</p>
					</div>
					<BiDotsVerticalRounded
						onClick={() => {}}
						size={25}
						className="opacity-0 hover:opacity-100  group-hover:opacity-50 text-gray-500 transition duration-500"
					/>
					{/* {isSettingsOpen && (
						<div ref={settingsRef}>
							<SettingsModal />
						</div>
					)} */}
				</div>
			</div>
		</div>
	);
};

export default TrackBox;
