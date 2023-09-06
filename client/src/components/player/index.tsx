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
	const [isShuffled, setIsShuffled] = useState(false);
	const [isRepeat, setIsRepeat] = useState(false);
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
			<div className="grid grid-cols-3 h-full ring-1 ring-neutral-900 rounded-md">
				<div className="h-full p-3 flex items-center justify-start  gap-4">
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
				<div className="flex justify-center items-center gap-2 flex-col">
					<div
						className={clsx(
							"justify-center flex items-center space-x-5",
							disabled && "opacity-40"
						)}>
						<button disabled={disabled}>
							<BiShuffle
								className={clsx("text-white", isShuffled && "text-green-600")}
								size={18}
								onClick={() => setIsShuffled(!isShuffled)}
							/>
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
							{isPlaying && currentTrack ? (
								<HiMiniPause size={20} />
							) : (
								<HiMiniPlay size={20} />
							)}
						</button>
						<button disabled={disabled}>
							<BiSkipNext className="text-white" size={30} onClick={() => {}} />
						</button>
						<button disabled={disabled}>
							<BsRepeat
								className={clsx("text-white", isRepeat && "text-green-600")}
								size={18}
								onClick={() => setIsRepeat(!isRepeat)}
							/>
						</button>
					</div>
					<div
						className={clsx(
							"flex gap-3 items-center w-full max-w-xl select-none",
							disabled && "opacity-50"
						)}>
						<h1 className="text-white text-xs">4:05</h1>
						<div className="h-1 bg-white rounded-full flex-1"></div>
						<h1 className="text-white text-xs">4:05</h1>
					</div>
				</div>
				<div
					className={clsx(
						"text-white pr-10 flex items-center justify-end gap-10",
						disabled && "opacity-50"
				)}>
					<div className="cursor-pointer">
						<TbMicrophone2 size={20} />
					</div>
					<div className="flex items-center gap-3">
						<div
							className="cursor-pointer"
							onClick={() => setIsMuted(!isMuted)}>
							{isMuted ? <FaVolumeMute size={15} /> : <FaVolumeOff size={15} />}
						</div>
						<div
							aria-disabled={isMuted}
							className="h-1 cursor-pointer flex-1 w-20 rounded-full bg-white"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Player;
