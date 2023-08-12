import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userAccount } from "../../redux/slices/Accountslice";
import { _getAlbums, _getArtistAlbumsById } from "../../api/fetch/config";
import SearchBox from "../search/components/SearchBox";
import Header from "../../components/navigation/Header";
import { BounceLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { BsHeartFill } from "react-icons/bs";
import { loggedInUser } from "../../redux/slices/Authslice";
import { UserType } from "../../types";
import useAvatar from "../../hooks/useAvatar";
import PlayButton from "../../components/PlayButton";
const LikedSongs: React.FC = () => {
	const { userToken, savedMusic } = useSelector(userAccount);
	const { user } = useSelector(loggedInUser) as { user: UserType };
	const [likedMusic, setLikedMusic] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		if (savedMusic.length > 0) {
			setLoading(true);
			_getAlbums(userToken, savedMusic.join(","))
				.then((res) => {
					setLikedMusic(res.albums);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [savedMusic]);
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
								<BsHeartFill size={40} />
							</div>
							<div className="space-y-4">
								<p>Playlist</p>
								<h1 className="text-6xl font-black select-none">Liked Songs</h1>
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
											• {likedMusic.length} song
											{likedMusic.length !== 1 && "s"}
										</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</Header>
			<section className="h-fit mt-10 bg-gradient-to-b from-black to-primary-500/30">
				<div className="px-6">
					<PlayButton/>
				</div>
				<div>
					{loading ? (
						<div className="flex justify-center items-center h-96">
							<BounceLoader color="#36d7b7" />
						</div>
					) : (
						<div>
							{likedMusic.length > 0 ? (
								<div className="flex flex-col gap-3 px-4 mt-10">
									{likedMusic.map((item, index) => (
										<SearchBox item={item} key={index} />
									))}
								</div>
							) : (
								<div className="flex flex-col justify-center items-center h-96 gap-4">
									<h1 className="text-4xl">You have no music saved</h1>
									<button
										className="bg-primary-300/70 py-4 px-6 rounded-full hover:bg-primary-300 transition hover:scale-105"
										onClick={() => navigate("/")}>
										Explore more
									</button>
								</div>
							)}
						</div>
					)}
				</div>
			</section>
		</div>
	);
};

export default LikedSongs;
