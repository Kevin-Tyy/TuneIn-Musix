import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ApiRoot } from "../../../api/config/apiRoot";
import { PlaylistItem, TrackType } from "../../../types";
import { toast } from "react-hot-toast";
import { FiSearch } from "react-icons/fi";

import { ClipLoader } from "react-spinners";
import Header from "../../../components/navigation/Header";
import { TfiMusicAlt } from "react-icons/tfi";
import useAvatar from "../../../hooks/useAvatar";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../../redux/slices/Authslice";
import PlayButton from "../../../components/PlayButton";
import { HiDotsHorizontal } from "react-icons/hi";
import { _getRecommended, _getTracks } from "../../../api/fetch/config";
import { userAccount } from "../../../redux/slices/Accountslice";
import Trackbox from "../../../components/TrackBox";
const Playlist = () => {
	const { id } = useParams();
	const { userToken } = useSelector(userAccount);
	const [playlistData, setPlaylistData] = useState<PlaylistItem | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [tracks, setTracks] = useState<TrackType[] | null>(null);
	const [isExpanded, setIsExpanded] = useState(false);
	const { user } = useSelector(loggedInUser);
	const searchRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		getPlaylist();
		_getTracks(
			userToken,
			"7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B"
		).then((response) => {
			setTracks(response.tracks);
		});
	}, [id]);

	const getPlaylist = () => {
		setLoading(true);
		axios
			.get(`${ApiRoot}/playlist/single/${id}`)
			.then((response) => {
				setPlaylistData(response.data);
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.message);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	if (loading && !playlistData) {
		return (
			<div className="h-[70vh] w-full flex items-center justify-center">
				{loading && <ClipLoader color="white" size={50} />}
			</div>
		);
	}

	let placeholderUrl;
	if (user) {
		placeholderUrl = useAvatar(user.username);
	}

	const toggleSearchBar = () => {
		setIsExpanded(!isExpanded);
	};
	const handleOutsideClick = (e: any) => {
		if (searchRef.current && !searchRef.current.contains(e.target)) {
			setIsExpanded(false);
		}
	};
	document.addEventListener("mousedown", handleOutsideClick);
	return (
		<div>
			<Header>
				<div className="space-y-7">
					<div className="flex gap-4 items-end">
						<div className="relative h-48 w-48 bg-gradient-to-br from-purple-700 to-gray-400 flex items-center justify-center">
							{playlistData?.playlistImage ? (
								<img
									src={playlistData?.playlistImage}
									className="w-48 h-48 object-cover"
								/>
							) : (
								<TfiMusicAlt size={30} />
							)}
						</div>
						<div className="space-y-4">
							<p>Playlist</p>
							<h1 className="text-6xl font-black font-sans select-none">
								{playlistData?.playlistName}
							</h1>
							{user && (
								<div className="flex items-center gap-2">
									{user?.avatar ? (
										<img
											src={user.avatar}
											alt="avatar"
											className="w-6 h-6 rounded-full"
											title={user.username}
										/>
									) : (
										<div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-full w-6 h-6 flex items-center justify-center text-xs select-none">
											{placeholderUrl}
										</div>
									)}
									<p>
										<span className="hover:underline cursor-pointer">
											{user.username.split(" ")[0]}
										</span>{" "}
										• {playlistData?.songIds.length} song
										{playlistData?.songIds.length !== 1 && "s"}
									</p>
								</div>
							)}
						</div>
					</div>
					<div className="flex items-center justify-between gap-10 pb-10 pt-5 border-t border-gray-700">
						<div className="flex items-center gap-10">
							<PlayButton />
							<HiDotsHorizontal
								size={38}
								onClick={() => {}}
								className="p-1.5 hover:bg-gray-800/60 rounded-full cursor-pointer active:bg-gray-600/60 transition duration-300"
							/>
						</div>
						<div className="flex items-center relative">
							<div
								className=" w-60 p-3 bg-gray-800/40 ring-gray-400 transition-all duration-[1.2s] absolute right-0 flex gap-3 text-xs items-center justify-end text-white"
								ref={searchRef}
								style={{
									maxWidth: isExpanded ? "999px" : "0",
									opacity: isExpanded ? "1" : "0",
								}}>
								<FiSearch size={15} />
								<input
									type="text"
									placeholder="Search in playlist"
									className={`w-full bg-transparent outline-none placeholder:text-white`}
								/>
							</div>
							<FiSearch
								size={38}
								onClick={toggleSearchBar}
								className={`cursor-pointer hover:bg-white/10 rounded-full p-2 z-10 transition-all duration-500 ${
									isExpanded && "opacity-0"
								}`}
							/>
						</div>
					</div>
				</div>
			</Header>
			<div>
				{tracks && (
					<div>
						{tracks.map((track, index) => (
							<Trackbox item={track} key={index}/>
))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Playlist;
