import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userAccount } from "../../redux/slices/Accountslice";
import { _getAlbums, _getTracks } from "../../api/fetch/config";
import Header from "../../components/navigation/Header";
import { useNavigate } from "react-router-dom";
import { BsHeartFill } from "react-icons/bs";
import { loggedInUser } from "../../redux/slices/Authslice";
import { TrackType, UserType } from "../../types";
import useAvatar from "../../hooks/useAvatar";
import PlayButton from "../../components/PlayButton";
import { TfiMusicAlt } from "react-icons/tfi";
import TrackBox from "../../components/TrackBox";
const LikedSongs: React.FC = () => {
	const { userToken, savedMusic } = useSelector(userAccount);
	const { user } = useSelector(loggedInUser) as { user: UserType };
	const [likedMusic, setLikedMusic] = useState<TrackType[]>([]);
	const navigate = useNavigate();
	useEffect(() => {
		if (savedMusic.length > 0) {
			_getTracks(userToken, savedMusic.join(",")).then((res) => {
				console.log(res.tracks);
				setLikedMusic(res.tracks);
			});
		}
	}, [savedMusic]);
	console.log(savedMusic);

	let placeholderUrl;
	if (user) {
		placeholderUrl = useAvatar(user.username);
	}

	return (
		<div className="space-y-5 h-full">
			<Header>
				<div className="space-y-5 sm:space-y-10 md:pl-5">
					<div className="flex flex-col items-start space-y-5">
						<h1 className="text-xl">Browse your favorite music</h1>
						<div className="flex gap-4 items-end">
							<div className="h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44 bg-gradient-to-br from-purple-700 to-fuchsia-200 shadow flex items-center justify-center">
								<BsHeartFill size={40} />
							</div>
							<div className="space-y-1 sm:space-y-3 md:space-y-4">
								<p>Playlist</p>
								<h1 className="text-3xl sm:text-4xl md:text-6xl font-black select-none">Liked Songs</h1>
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
										<p className="text-sm sm:text-base">
											<span className="text-sm sm:text-base hover:underline cursor-pointer">
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
					<div>
						<PlayButton />
					</div>
				</div>
			</Header>
			<section className="h-fit mt-10">
				<div>
					<div>
						{savedMusic.length !== 0 ? (
							<div className="flex flex-col gap-3 px-4 mt-10">
								{likedMusic.map((item, index) => (
									<TrackBox item={item} index={index} key={index} />
								))}
							</div>
						) : (
							<div className="flex flex-col justify-center items-center h-96 gap-3">
								<TfiMusicAlt size={50} />
								<h1 className="text-lg select-none">
									You haven't liked anything yet
								</h1>
								<button
									className="bg-gradient-to-br  from-primary-400 via-purple-600 to-pink-400 py-3 px-6 rounded-full hover:bg-primary-300 transition hover:scale-105"
									onClick={() => navigate("/")}>
									Explore more
								</button>
							</div>
						)}
					</div>
				</div>
			</section>
		</div>
	);
};

export default LikedSongs;
