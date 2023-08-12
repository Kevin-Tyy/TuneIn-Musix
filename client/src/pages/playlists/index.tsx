import React, { useState } from "react";
import Header from "../../components/navigation/Header";
import { TfiMusicAlt } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/slices/Authslice";
import { UserType } from "../../types";
import useAvatar from "../../hooks/useAvatar";
import PlaylistModal from "./components/modal";
const PlayLists: React.FC = () => {
	const { user } = useSelector(loggedInUser) as { user: UserType };
	const [isModalOpen, setisModalOpen] = useState(false);
	let placeholderUrl;
	if (user) {
		placeholderUrl = useAvatar(user.username);
	}
	return (
		<>
			<div className="space-y-10">
				<Header>
					<div className="space-y-10 pl-5">
						<div className="flex flex-col items-start space-y-10">
							<h1 className="text-xl">Browse your favorite music</h1>
							<div className="flex gap-4 items-end">
								<div className="h-48 w-48 bg-gradient-to-br from-purple-700 to-gray-500 shadow flex items-center justify-center">
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
												<div className="bg-purple-500 rounded-full w-6 h-6 flex items-center justify-center text-xs select-none">
													{placeholderUrl}
												</div>
											)}
											<p>
												<span className="hover:underline cursor-pointer">
													{user.username.split(" ")[0]}
												</span>{" "}
												{/* • {likedMusic.length} song
											{likedMusic.length !== 1 && "s"} */}
											</p>
										</div>
									)}
								</div>
							</div>
						</div>
						<div className="">
							<div className="flex flex-col items-start gap-2">
								<h1>
									Your playlists can only be seen by you unless you make them
									public
								</h1>
								<button
									onClick={() => setisModalOpen(true)}
									className="px-6 py-3 bg-gradient-to-br from-primary-400 via-purple-600 to-pink-400 rounded-full hover:scale-105 transition active:scale-95 select-none">
									Create playlist
								</button>
							</div>
						</div>
					</div>
				</Header>
			</div>
			<PlaylistModal onClose={() => setisModalOpen(false)} isOpen={isModalOpen}/>
		</>
	);
};

export default PlayLists;
