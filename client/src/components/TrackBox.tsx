import React, { useState, useRef, useEffect } from "react";
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
// import SettingsModal from "../pages/playlists/playlist/components/SettingsModal";
import { playerStatus, setCurrentTrack } from "../redux/slices/PlayerSlice";
import { ScaleLoader } from "react-spinners";
import clsx from "clsx";
type TrackBoxProps = {
	item: TrackType;
	index?: number;
};
const TrackBox: React.FC<TrackBoxProps> = ({ item, index }) => {
	const settingsRef = useRef<HTMLDivElement>(null);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
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
	const handleSettingsOutsideClick = (e: any) => {
		if (settingsRef.current && !settingsRef.current.contains(e.target)) {
			setIsSettingsOpen(false);
		}
	};
	useEffect(() => {
		document.addEventListener("mousedown", handleSettingsOutsideClick);
		return () => {
			document.addEventListener("mousedown", handleSettingsOutsideClick);
		};
	}, []);

	const duration = useDuration(item?.duration_ms);
	if (!item) {
		return;
	}
	const handlePlayTrack = () => {
		dispatch(setCurrentTrack(item));
	};

	return (
		<div
			className={`flex items-center select-none ${
				currentTrack?.id === item?.id && isPlaying ? "gap-2" : "gap-6"
			}`}>
			{currentTrack?.id === item?.id && isPlaying ? (
				<ScaleLoader width={1} height={20} color="purple" className="" />
			) : (
				<p
					className={clsx(
						"font-bold transition duration-500",
						currentTrack?.id == item?.id && "text-fuchsia-600"
					)}>
					{index! + 1}
				</p>
			)}
			<div
				className={`flex  w-full h-[90px] ${
					currentTrack?.id === item?.id
						? "bg-neutral-800/90"
						: " bg-neutral-900/80"
				} p-2 group rounded-md hover:bg-neutral-800 transition cursor-pointer`}>
				<div className="flex flex-1 w-full gap-4" onClick={handlePlayTrack}>
					<div className="relative ">
						<img
							src={item.album?.images[0].url!}
							className="h-full rounded-sm"
						/>
						<div className="h-full w-full rounded-sm opacity-0 bg-black/0 group-hover:bg-black/70 transition duration-200 group-hover:opacity-100 absolute inset-0 flex items-center justify-center">
							{isPlaying ? <FaPause /> : <FaPlay />}
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
					{!savedMusic.includes(item?.id) ? (
						<BiHeart
							size={22}
							className="opacity-0 hover:opacity-100 group-hover:opacity-50 text-fuchsia-500 transition duration-500 active:animate-ping"
							onClick={() => addToLikes(item?.id)}
						/>
					) : (
						<BsHeartFill
							size={22}
							className="opacity-50 hover:opacity-100 hidden group-hover:block text-fuchsia-500 transition duration-500 active:animate-ping"
							onClick={() => addToLikes(item?.id)}
						/>
					)}
					<div>
						<p className="text-gray-400">{duration}</p>
					</div>
					<BiDotsVerticalRounded
						onClick={() => {}}
						size={25}
						className="opacity-0 hover:opacity-100  group-hover:opacity-50 text-green-500 transition duration-500"
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
