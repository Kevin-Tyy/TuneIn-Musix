import React, { useEffect, useState } from "react";
import Header from "../../components/navigation/Header";
import { TfiMusicAlt } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/slices/Authslice";
import { PlaylistItem, UserType } from "../../types";
import useAvatar from "../../hooks/useAvatar";
import PlaylistModal from "./components/modal";
import axios from "axios";
import { ApiRoot } from "../../api/config/apiRoot";
import PlaylistBox from "./components/PlaylistBox";
import PlaylistSearch from "./components/PlaylistSearch";
const PlayLists: React.FC = () => {
	const { user } = useSelector(loggedInUser) as { user: UserType };
	const [isModalOpen, setisModalOpen] = useState(false);
	const [playlists, setPlaylists] = useState<PlaylistItem[]>([]);
	const [filteredPlaylists, setFilteredPlaylists] = useState<PlaylistItem[]>(
		[]
	);

	let placeholderUrl;
	if (user) {
		placeholderUrl = useAvatar(user.username);
	}
	useEffect(() => {
		axios
			.get(`${ApiRoot}/playlist/${user?._id}`)
			.then((response) => {
				setPlaylists(response.data);
				setFilteredPlaylists(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	const handleFilterChange = (filterText: string) => {
		const filtered = playlists.filter((playlist) =>
			playlist.playlistName.toLowerCase().includes(filterText.toLowerCase())
		);
		setFilteredPlaylists(filtered);
	};
	return (
		<>
			<div className="space-y-10">
				<Header>
					<div className="space-y-10 pl-5">
						<div className="flex flex-col items-start space-y-5">
							<h1 className="text-xl">Browse your favorite music</h1>
							<div className="flex gap-4 items-end">
								<div className="h-44 w-44 bg-gradient-to-br from-purple-700 to-gray-500 shadow flex items-center justify-center">
									<TfiMusicAlt size={40} />
								</div>
								<div className="space-y-4">
									<p>Playlist</p>
									<h1 className="text-6xl font-black select-none">
										Your playlists
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
												<div className="bg-fuchsia-500 rounded-full w-6 h-6 flex items-center justify-center text-xs select-none">
													{placeholderUrl}
												</div>
											)}
											<p>
												<span className="hover:underline cursor-pointer">
													{user.username.split(" ")[0]}
												</span>{" "}
												• {playlists.length} playlist
												{playlists.length !== 1 && "s"}
											</p>
										</div>
									)}
								</div>
							</div>
						</div>
						<div>
							<div className="flex flex-col items-start gap-4">
								<h1 className="text-gray-500">
									Your playlists can only be seen by you unless you make them
									public
								</h1>
								<div className="flex gap-3 items-center w-full justify-start">
									<PlaylistSearch
										playlists={filteredPlaylists}
										onFilterChange={handleFilterChange}
									/>
									<button
										onClick={() => setisModalOpen(true)}
										className="px-6 py-3 bg-gradient-to-br whitespace-nowrap from-primary-400 via-purple-600 to-pink-400 rounded-full hover:scale-105 transition active:scale-95 select-none">
										Create playlist
									</button>
								</div>
							</div>
						</div>
					</div>
				</Header>
				<div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
					{filteredPlaylists.map((item, index) => (
						<PlaylistBox item={item} key={index} />
					))}
				</div>
				{!playlists.length && (
					<div className="flex flex-col justify-center items-center h-96 gap-3">
						<TfiMusicAlt size={50} />
						<h1 className="text-lg select-none">
							You have no playlists yet !
						</h1>
						<button
							className="bg-gradient-to-br  from-primary-400 via-purple-600 to-pink-400 py-3 px-6 rounded-full hover:bg-primary-300 transition hover:scale-105"
							onClick={() => setisModalOpen(true)}>
							Create one
						</button>
					</div>
				)}
			</div>
			<PlaylistModal
				onClose={() => setisModalOpen(false)}
				isOpen={isModalOpen}
			/>
		</>
	);
};

export default PlayLists;
