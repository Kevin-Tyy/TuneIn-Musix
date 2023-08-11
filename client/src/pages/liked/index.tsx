import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userAccount } from "../../redux/slices/Accountslice";
import { _getAlbums, _getArtistAlbumsById } from "../../api/fetch/config";
import SearchBox from "../search/components/SearchBox";
import Header from "../../components/navigation/Header";
import { BounceLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
const LikedSongs: React.FC = () => {
	const { userToken, savedMusic } = useSelector(userAccount);
	const [likedMusic, setLikedMusic] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate()
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

	return (
		<div>
			<Header>
				<div className="space-y-2">
					<div className="h-16 flex items-end">
						<h1 className="text-xl">Browse your favorite music</h1>
					</div>
				</div>
			</Header>
			{loading ? (
				<div className="flex justify-center items-center h-96">
					<BounceLoader color="#36d7b7" />
				</div>
			) : (
				<>
					{likedMusic.length > 0 ? (
						<div className="flex flex-col gap-3 px-4 mt-10">
							{likedMusic.map((item, index) => (
								<SearchBox item={item} key={index} />
							))}
						</div>
					) : (
						<div className="flex flex-col justify-center items-center h-96 gap-4">
							<h1 className="text-4xl">You have no music saved</h1>
							<button className="bg-primary-300/70 py-4 px-6 rounded-full hover:bg-primary-300 transition hover:scale-105" onClick={() => navigate('/')}>
								Explore more
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default LikedSongs;
