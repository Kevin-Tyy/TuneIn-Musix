//import utils hooks, types and helpers
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { ApiRoot } from "../../../api/config/apiRoot";
import { PlaylistItem, TrackType } from "../../../types";
import useAvatar from "../../../hooks/useAvatar";
import { _getRecommended, _getTracks } from "../../../api/fetch/config";

//import icons, loading and ui components
import { LoaderIcon, toast } from "react-hot-toast";
import { FiSearch } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import Header from "../../../components/navigation/Header";
import { TfiMusicAlt } from "react-icons/tfi";
import PlayButton from "../../../components/PlayButton";
import { HiDotsHorizontal } from "react-icons/hi";
import Trackbox from "../../../components/TrackBox";

//import redux functions and toolkit functions
import { loggedInUser } from "../../../redux/slices/Authslice";
import { useSelector } from "react-redux";
import { userAccount } from "../../../redux/slices/Accountslice";

// import modals
import SettingsModal from "./components/SettingsModal";
import EditPlayListModal from "./components/EditPlaylist";
import Delete from "./components/Delete";
import ShareModal from "./components/ShareModal";
import { IoClose } from "react-icons/io5";

const Playlist = () => {
	const { id } = useParams();
	const { userToken } = useSelector(userAccount);
	const [playlistData, setPlaylistData] = useState<PlaylistItem | null>(null);
	const [tracks, setTracks] = useState<TrackType[] | null>(null);
	const { user } = useSelector(loggedInUser);
	const [searchFilter, setSearchFilter] = useState<string | null>(null);

	//loading states
	const [loading, setLoading] = useState<boolean>(false);
	//modal states
	const [isModalOpen, setisModalOpen] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [shareModal, setShareModal] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	//refs for popups
	const searchRef = useRef<HTMLDivElement>(null);
	const settingsRef = useRef<HTMLDivElement>(null);
	const navigate = useNavigate();
	useEffect(() => {
		getPlaylist();
	}, [id]);
	const getPlaylist = () => {
		setLoading(true);
		axios
			.get(`${ApiRoot}/playlist/single/${id}`)
			.then((response) => {
				setPlaylistData(response.data);
				if (response.data?.songIds.length > 0) {
					_getTracks(userToken, response.data?.songIds.join(",")).then(
						(response) => {
							setTracks(response.tracks);
						}
					);
				}
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
	const handleSettingsOutsideClick = (e: any) => {
		if (settingsRef.current && !settingsRef.current.contains(e.target)) {
			setIsSettingsOpen(false);
		}
	};
	const handleSearchOutsideClick = (e: any) => {
		if (searchRef.current && !searchRef.current.contains(e.target)) {
			setIsExpanded(false);
		}
	};
	document.addEventListener("mousedown", handleSearchOutsideClick);
	document.addEventListener("mousedown", handleSettingsOutsideClick);
	return (
		<div>
			{/* header component */}
			<Header>
				<div className="space-y-7">
					<div className="flex gap-4 items-end">
						<div className="relative min-[400px]:w-h-32 min-[400px]:w-32 h-28 w-28  sm:w-36 sm:h-36 md:h-48 md:w-48 lg:w-52 lg:h-52 xl:w-60 xl:h-60 bg-gradient-to-br from-purple-700 to-gray-400 flex items-center justify-center">
							{playlistData?.playlistImage ? (
								<img
									src={playlistData?.playlistImage}
									className="h-28 w-28 min-[400px]:w-h-32 min-[400px]:w-32  sm:h-36 sm:w-36 md:w-48 md:h-48 lg:w-52 lg:h-52 xl:w-60 xl:h-60 object-cover"
								/>
							) : (
								<TfiMusicAlt size={30} />
							)}
						</div>
						<div className="space-y-1 md:space-y-4">
							<p>Playlist</p>
							<h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black font-sans select-none">
								{playlistData?.playlistName}
							</h1>
							<p className="text-sm text-gray-300">
								{playlistData?.playlistDescription}
							</p>
							{user && (
								<div className="flex items-center gap-2">
									{user?.avatar ? (
										<img
											src={user.avatar}
											alt="avatar"
											className="w-4 sm:w-6 h-4 sm:h-6 rounded-full"
											title={user.username}
										/>
									) : (
										<div className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-full w-4 sm:w-6 h-4 sm:h-6 flex items-center justify-center text-[10px] sm:text-xs select-none">
											{placeholderUrl}
										</div>
									)}
									<p className="text-sm sm:text-base">
										<span className="hover:underline cursor-pointer text-sm sm:text-base">
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
						<div className="flex items-center gap-3 sm:gap-8 md:gap-10">
							<PlayButton />
							<div className="relative">
								<HiDotsHorizontal
									size={38}
									onClick={() => setIsSettingsOpen(true)}
									className="p-2 sm:p-1.5 hover:bg-gray-800/60 rounded-full cursor-pointer active:bg-gray-600/60 transition duration-300"
								/>
								{isSettingsOpen && (
									<div ref={settingsRef}>
										<SettingsModal
											closeModal={setIsSettingsOpen}
											viewEditModal={() => setisModalOpen(true)}
											deletePlaylist={() => setDeleteModal(true)}
											viewShareModal={() => setShareModal(true)}
										/>
									</div>
								)}
							</div>
						</div>
						<div className="flex items-center relative">
							<div
								className="w-40 sm:w-60 lg:w-72 bg-[#6967704d] max-h-10 delay-0 ring-gray-400 transition-all rounded-md ease-in-out duration-1000 absolute right-0 z-10 text-white"
								ref={searchRef}
								style={{
									maxWidth: isExpanded ? "999px" : "0",
								}}>
								<div className="relative p-3 flex z-10 gap-3 text-xs items-center justify-end">
									<FiSearch size={15} />
									<input
										type="text"
										placeholder="Search in playlist"
										onChange={(e) => setSearchFilter(e.target.value)}
										className={`w-full bg-transparent outline-none placeholder:text-white`}
									/>
									{searchFilter && isExpanded && (
										<div
											className="absolute right-2 hover:bg-gray-600/40 cursor-pointer transition rounded-md p-1.5"
											onClick={() => setIsExpanded(false)}>
											<IoClose />
										</div>
									)}
								</div>
							</div>
							<FiSearch
								size={38}
								onClick={toggleSearchBar}
								className={`cursor-pointer hover:bg-white/10 rounded-full p-2 z-1 transition-all duration-100 ${
									isExpanded && "opacity-0 invisible"
								}`}
							/>
						</div>
					</div>
				</div>
			</Header>
			<div>
				{!playlistData?.songIds.length && (
					<div className="flex flex-col justify-center items-center h-96 gap-5">
						<TfiMusicAlt size={50} />
						<div className="flex flex-col items-center gap-2">
							<h1 className="text-xl select-none">This playlist is empty</h1>
							<p className="text-gray-500">Add some music into this playlist</p>
						</div>
						<button
							className="bg-gradient-to-br  from-primary-400 via-purple-600 to-pink-400 py-4 px-6 rounded-full hover:bg-primary-300 transition hover:scale-105"
							onClick={() => navigate("/")}>
							Explore more
						</button>
					</div>
				)}
				{tracks ? (
					<div>
						{tracks.length > 0 && (
							<div className="flex flex-col gap-3 px-4 ">
								{tracks.map((track, index) => (
									<Trackbox item={track} key={index} index={index} />
								))}
							</div>
						)}
					</div>
				) : (
					<div className="min-h-[30vh] grid place-content-center">
						<LoaderIcon style={{ width: 50, height: 50, borderWidth: 3 }} />
					</div>
				)}
			</div>

			{/* functionality modals */}

			<EditPlayListModal
				isOpen={isModalOpen}
				onClose={() => setisModalOpen(false)}
				playlist={playlistData}
			/>
			<Delete
				isOpen={deleteModal}
				onClose={() => setDeleteModal(false)}
				playlistId={id!}
			/>
			<ShareModal isOpen={shareModal} onClose={() => setShareModal(false)} />
		</div>
	);
};

export default Playlist;
