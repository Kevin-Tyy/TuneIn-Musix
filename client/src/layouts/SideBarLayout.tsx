import { useSelector } from "react-redux";
import { playerStatus } from "../redux/slices/PlayerSlice";
import { PlaylistItem, TrackType } from "../types";
import { TfiMusicAlt } from "react-icons/tfi";
import { HiDotsHorizontal, HiMenuAlt3 } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
	removeMusic,
	saveMusic,
	userAccount,
} from "../redux/slices/Accountslice";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { HiPlay } from "react-icons/hi2";
import axios from "axios";
import { ApiRoot } from "../api/config/apiRoot";
import useCurrentUser from "../hooks/useCurrentUser";
import { useEffect, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { Link } from "react-router-dom";
import clsx from "clsx";
const SideBarLayout = () => {
	const { currentTrack } = useSelector(playerStatus) as {
		currentTrack: TrackType;
	};
	const user = useCurrentUser();
	const [playlists, setPlaylists] = useState<PlaylistItem[] | null>(null);
	const dispatch = useDispatch();
	const { savedMusic } = useSelector(userAccount);

	const addToLikes = (musicId: string) => {
		if (savedMusic.includes(musicId)) {
			dispatch(removeMusic(musicId));
		} else {
			dispatch(saveMusic(musicId));
		}
	};
	const fetchPlaylists = () => {
		axios
			.get(`${ApiRoot}/playlist/${user?._id}`)
			.then((response) => {
				setPlaylists(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};
	playlists && console.log(playlists[0]?.songIds);

	useEffect(() => {
		fetchPlaylists();
	}, []);
	return (
		<div
			className={clsx(
				"w-full max-w-[400px] max-h-[90vh] bg-neutral-950 p-3 rounded-xl overflow-auto sticky top-3"
			)}>
			<div className="absolute right-0 top-0 text-white m-3 p-2 hover:bg-neutral-800 cursor-pointer rounded-md  transition-all">
				<HiMenuAlt3 size={25} />
			</div>
			{currentTrack && (
				<h1 className="absolute top-4 left-3 text-md text-white">
					Currently playing
				</h1>
			)}
			{currentTrack && (
				<div className="mt-12">
					<div>
						{!currentTrack?.album?.images ? (
							<div className="bg-neutral-900 text-white w-full h-full min-h-[350px] grid place-content-center rounded-xl">
								<TfiMusicAlt size={40} />
							</div>
						) : (
							<img
								src={currentTrack?.album?.images[0].url!}
								className="h-full w-full rounded-xl"
							/>
						)}
						<div className="flex items-center mt-5">
							<div className="w-full overflow-hidden">
								<h1 className="text-xl text-white font-bold whitespace-nowrap w-full overflow-hidden text-ellipsis">
									{currentTrack?.name}
								</h1>
							</div>
							<div className="flex gap-4 items-center">
								<div className="ml-2">
									{!savedMusic.includes(currentTrack.id) ? (
										<BsHeart
											size={18}
											className="opacity-50 hover:opacity-100 cursor-pointer text-fuchsia-500 transition duration-500 active:animate-ping"
											onClick={() => addToLikes(currentTrack.id)}
										/>
									) : (
										<BsHeartFill
											size={18}
											className="opacity-50 hover:opacity-100 cursor-pointer text-fuchsia-500 transition duration-500 active:animate-ping"
											onClick={() => addToLikes(currentTrack.id)}
										/>
									)}
								</div>
								<HiDotsHorizontal
									size={25}
									className="text-gray-300 hover:text-white cursor-pointer"
								/>
							</div>
						</div>
						<div className="bg-neutral-900 p-2 mt-6">
							<h1 className="text-white">Next in queue</h1>
							<div
								className="h-16 mt-3 flex items-center gap-2 cursor-pointer hover:bg-neutral-800/50 p-1.5"
								onClick={() => {}}>
								<div className="relative group h-full w-[50px] max-w-[50px]">
									{!currentTrack?.album?.images ? (
										<div className="bg-neutral-800 text-white h-full w-full rounded-md grid place-content-center">
											<TfiMusicAlt />
										</div>
									) : (
										<img
											src={currentTrack?.album?.images[0].url!}
											className="h-full w-full rounded-md"
										/>
									)}
									<div className="absolute inset-0 h-full w-full max-w-[50px] grid place-content-center bg-neutral-600/20 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition text-white">
										<HiPlay size={20} />
									</div>
								</div>
								<h1 className="text-white">{currentTrack?.name}</h1>
							</div>
						</div>
					</div>
				</div>
			)}
			<div className="mt-7">
				{playlists ? (
					playlists.length ? (
						<div className="flex flex-col gap-4">
							<h1 className="text-white">your playlists</h1>
							{playlists.map((playlist, index) => (
								<div
									key={index}
									className="bg-neutral-900 hover:bg-neutral-800/80 p-2 rounded-md"
									onDrop={() => console.log("dropped")}>
									<Link
										to={`/playlist/${playlist._id}`}
										className="flex gap-2 items-center">
										<div className="relative h-14 w-14 bg-gradient-to-br from-purple-700 text-white to-gray-400 rounded-md flex items-center justify-center">
											{playlist.playlistImage ? (
												<img
													src={playlist.playlistImage}
													className="w-14 h-14 object-cover rounded-md"
												/>
											) : (
												<TfiMusicAlt size={18} />
											)}
										</div>
										<div>
											<h1 className="text-white">{playlist?.playlistName}</h1>
											<div className="flex items-center gap-1.5 text-gray-400 capitalize">
												<span className="text-sm">Playlist</span>
												<span className="text-lg">•</span>
												<span className="text-sm">
													{playlist?.user?.username}
												</span>
											</div>
										</div>
									</Link>
								</div>
							))}
						</div>
					) : (
						<div>you have no playlists , create a new one</div>
					)
				) : (
					<div>
						<LoaderIcon style={{ width: 20, height: 20, borderWidth: 5 }} />
					</div>
				)}
			</div>
		</div>
	);
};

export default SideBarLayout;
