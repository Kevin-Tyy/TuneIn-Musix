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
import { TbMicrophone2 } from "react-icons/tb";
import clsx from "clsx";
import { HiMenuAlt3, HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { TfiMusicAlt } from "react-icons/tfi";
import useDuration from "../../hooks/useDuration";
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
	const [audio] = useState<any>(new Audio(currentTrack?.preview_url!));
	const [volume, setVolume] = useState(0.5);
	const handleVolumeChange = (e: any) => {
		const newVolume = e.target.value;
		audio.volume = newVolume;
		setVolume(newVolume);
		newVolume == 0 ? setIsMuted(true) : setIsMuted(false);
	};
	const handleMute = () => {
		setIsMuted(!isMuted);
		if (isMuted) {
			audio.volume = 0;
		} else {
			audio.volume = volume;
		}
	};
	return (
		<div className="bg-black z-50 fixed bottom-0 w-full h-[8vh] min-h-[90px] px-3 py-1">
			<div className=" ring-1 grid grid-cols-4 h-full ring-neutral-900 rounded-md">
				<div className="h-full p-3 col-span-2 md:col-span-1">
					{!currentTrack && (
						<div className="text-white bg-neutral-800 h-full w-full max-w-[60px] grid place-content-center rounded-sm">
							<TfiMusicAlt />
						</div>
					)}
					{currentTrack && (
						<div className="w-full  flex items-center gap-4 h-full">
							<div className="h-full w-full max-w-[60px] group relative">
								<img
									src={currentTrack.album.images[0].url!}
									className="h-full rounded-sm"
								/>
								<div className="opacity-0 group-hover:opacity-60 absolute inset-0 bg-black"></div>
							</div>
							<div className="space-y-1">
								<h1 className="text-white font-sans font-semibold tracking-tight ">
									{currentTrack.name}
								</h1>
								<p className="text-gray-400 text-[10px]">
									{currentTrack.artists.map((artist) => (
										<span key={artist.id}>
											<Link
												to={`/artist/${artist.id}`}
												className="hover:underline text-sm">
												{artist.name}
											</Link>
											{currentTrack.artists.indexOf(artist) !==
												currentTrack.artists.length - 1 && ", "}
										</span>
									))}
								</p>{" "}
							</div>
							<div className="ml-2">
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
				<div className="flex md:col-span-2 w-full justify-center items-center gap-2 flex-col">
					<div
						className={clsx(
							"justify-center flex items-center space-x-5",
							disabled && "opacity-40"
						)}>
						<button disabled={disabled}>
							<BiShuffle
								className={clsx("text-white", isShuffled && "!text-green-500 ")}
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
								<HiMiniPause size={20} onClick={() => audio.pause()} />
							) : (
								<HiMiniPlay size={20} onClick={() => audio.play()} />
							)}
						</button>
						<button disabled={disabled}>
							<BiSkipNext className="text-white" size={30} onClick={() => {}} />
						</button>
						<button disabled={disabled}>
							<BsRepeat
								className={clsx("text-white", isRepeat && "!text-green-600")}
								size={18}
								onClick={() => setIsRepeat(!isRepeat)}
							/>
						</button>
					</div>
					<div
						className={clsx(
							"hidden md:flex gap-3 items-center w-full max-w-xl select-none",
							disabled && "opacity-40"
						)}>
						<h1 className="text-white text-xs">1:05</h1>
						<div className="h-1 bg-white rounded-full flex-1"></div>
						<h1 className="text-white text-xs">
							{useDuration(currentTrack?.duration_ms)}
						</h1>
					</div>
				</div>
				<div className="flex md:hidden text-white justify-end self-center pr-4">
					<HiMenuAlt3 size={25} />
				</div>
				<div
					className={clsx(
						"text-white pr-10 md:flex w-full justify-end items-center gap-6 hidden",
						disabled && "opacity-40"
					)}>
					<div className="cursor-pointer">
						<TbMicrophone2 size={18} />
					</div>
					<div className="flex items-center gap-3">
						<div className="cursor-pointer" onClick={handleMute}>
							{isMuted ? <HiVolumeOff size={20} /> : <HiVolumeUp size={20} />}
						</div>
						<input
							type="range"
							min="0"
							disabled={isMuted}
							max="1"
							step="0.01"
							value={volume}
							onChange={handleVolumeChange}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Player;
