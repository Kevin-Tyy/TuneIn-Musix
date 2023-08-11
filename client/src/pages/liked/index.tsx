import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userAccount } from "../../redux/slices/Accountslice";
import { _getAlbums, _getArtistAlbumsById } from "../../api/fetch/config";
import SearchBox from "../search/components/SearchBox";
import Header from "../../components/navigation/Header";

const LikedSongs: React.FC = () => {
	const { userToken, savedMusic } = useSelector(userAccount);
	const [likedMusic, setLikedMusic] = useState([]);
	useEffect(() => {
		if (savedMusic.length > 0) {
			_getAlbums(userToken, savedMusic.join(",")).then((res) => {
				setLikedMusic(res.albums);
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
			{likedMusic.length > 0 ? (
				<div className="flex flex-col gap-3 px-4 mt-10">
					{likedMusic.map((item, index) => (
						<SearchBox item={item} key={index} />
					))}
				</div>
			) : (
				<div>
					<h1 className="text-4xl">You have no music saved</h1>
				</div>
			)}
		</div>
	);
};

export default LikedSongs;
