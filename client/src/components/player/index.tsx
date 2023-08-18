import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	removeMusic,
	saveMusic,
	userAccount,
} from "../../redux/slices/Accountslice";
import { playPause, playerStatus } from "../../redux/slices/PlayerSlice";
import { TrackType } from "../../types";
import { Link } from "react-router-dom";
import { BiHeart } from "react-icons/bi";
import { BsHeartFill, BsRepeat } from "react-icons/bs";
import { HiMiniPause, HiMiniPlay } from "react-icons/hi2";
import { BiShuffle, BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { FaVolumeMute, FaVolumeOff } from "react-icons/fa";
import { TbMicrophone2 } from "react-icons/tb";
import clsx from "clsx";
// import axios from "axios";

const Player = () => {
	// const { userToken } = useSelector(userAccount);
	const { savedMusic } = useSelector(userAccount);
	const [isMuted, setIsMuted] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const { currentTrack, isPlaying } = useSelector(playerStatus) as {
		currentTrack: TrackType;
		isPlaying: boolean;
	};
	const dispatch = useDispatch();
	useEffect(() => {
		if (!currentTrack) setDisabled(true);
	}, [currentTrack]);

	const addToLikes = (musicId: string) => {
		if (savedMusic.includes(musicId)) {
			dispatch(removeMusic(musicId));
		} else {
			dispatch(saveMusic(musicId));
		}
	};

	return (
		<div className="bg-black fixed bottom-0 w-full h-[9vh] px-3 pt-3 pb-2">
			<div className="flex items-center justify-between h-full ring-1 ring-neutral-900 rounded-md">
				<div className="h-full p-3 flex items-center gap-4">
					{currentTrack && (
						<div>
							<div className="h-full group relative">
								<img
									src={currentTrack.album.images[0].url!}
									className="h-full rounded-sm"
								/>
								<div className="opacity-0 group-hover:opacity-60 absolute inset-0 bg-black"></div>
							</div>
							<div className="space-y-1">
								<h1 className="text-white font-sans font-semibold tracking-tight text-sm">
									{currentTrack.name}
								</h1>
								<p className="text-gray-400 text-[10px]">
									{currentTrack.artists.map((artist) => (
										<span key={artist.id}>
											<Link
												to={`/artist/${artist.id}`}
												className="hover:underline">
												{artist.name}
											</Link>
											{currentTrack.artists.indexOf(artist) !==
												currentTrack.artists.length - 1 && ", "}
										</span>
									))}
								</p>{" "}
							</div>
							<div className="ml-3">
								{!savedMusic.includes(currentTrack.id) ? (
									<BiHeart
										size={22}
										className="opacity-50 hover:opacity-100 cursor-pointer text-fuchsia-500 transition duration-500 active:animate-ping"
										onClick={() => addToLikes(currentTrack.id)}
									/>
								) : (
									<BsHeartFill
										size={22}
										className="opacity-50 hover:opacity-100 cursor-pointer text-fuchsia-500 transition duration-500 active:animate-ping"
										onClick={() => addToLikes(currentTrack.id)}
									/>
								)}
							</div>
						</div>
					)}
				</div>
				<div
					className={clsx(
						"self-center flex items-center space-x-10",
						disabled && "opacity-40"
					)}>
					<button disabled={disabled}>
						<BiShuffle className="text-white" size={15} onClick={() => {}} />
					</button>
					<button>
						<BiSkipPrevious
							className="text-white"
							size={30}
							onClick={() => {}}
						/>
					</button>
					<button
						disabled={disabled}
						className="bg-white p-2 rounded-full self-center text-black flex items-center justify-center cursor-pointer active:scale-95 transition"
						onClick={() => dispatch(playPause())}>
						{isPlaying ? <HiMiniPause size={20} /> : <HiMiniPlay size={20} />}
					</button>
					<button disabled={disabled}>
						<BiSkipNext className="text-white" size={30} onClick={() => {}} />
					</button>
					<button disabled={disabled}>
						<BsRepeat className="text-white" size={15} onClick={() => {}} />
					</button>
				</div>
				<div className="text-white pr-10 flex items-center gap-10">
					<div className="cursor-pointer">
						<TbMicrophone2 size={20} />
					</div>
					<div className="cursor-pointer" onClick={() => setIsMuted(!isMuted)}>
						{isMuted ? <FaVolumeMute size={20} /> : <FaVolumeOff />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Player;
