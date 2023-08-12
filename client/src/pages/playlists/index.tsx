import React from "react";
import Header from "../../components/navigation/Header";
import { TfiMusicAlt } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/slices/Authslice";
import { UserType } from "../../types";
import useAvatar from "../../hooks/useAvatar";
const PlayLists: React.FC = () => {
	const { user } = useSelector(loggedInUser) as { user: UserType };
	let placeholderUrl
	if(user){
		placeholderUrl = useAvatar(user.username);

	}
	return (
		<div className="space-y-10">
			<Header>
				<div className="space-y-2 pl-5">
					<div className="flex flex-col items-start space-y-10">
						<h1 className="text-xl">Browse your favorite music</h1>
						<div className="flex gap-4 items-end">
							<div className="h-48 w-48 bg-gradient-to-br from-purple-700 to-gray-500 shadow flex items-center justify-center">
								<TfiMusicAlt size={40} />
							</div>
							<div className="space-y-4">
								<p>Playlist</p>
								<h1 className="text-6xl font-black select-none">Your playlists</h1>
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
											<div className="bg-purple-400 rounded-full w-6 h-6 flex items-center justify-center text-xs select-none">
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
				</div>
			</Header>
		</div>
	);
};

export default PlayLists;
