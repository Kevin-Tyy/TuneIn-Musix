import React, { useEffect, useState } from "react";
import {
	_getArtists,
	_getGenres,
	_getPlaylistByGenre,
	_getToken,
	_getTracks,
} from "../../api/fetch/config";
import GenreBox from "../../components/GenreBox";
import { GenreItemType } from "../../types";
import ArtistBox from "../../components/ArtistBox";
import { useSelector } from "react-redux";
import { userAccount } from "../../redux/slices/Accountslice";
import Header from "../../components/navigation/Header";
import ListBox from "../../components/navigation/ListBox";
import { BsHeart } from "react-icons/bs";

const HomePage: React.FC = () => {
	// const [token, setToken] = useState("");
	const [genres, setGenres] = useState<GenreItemType[]>([]);
	const [artists, setArtists] = useState<any>([]);
	const { userToken } = useSelector(userAccount);

	useEffect(() => {
		if (userToken) {
			populatePage();
		}
	}, []);

	const populatePage = async () => {
		const genres = await _getGenres(userToken);
		setGenres(genres);

		const { artists } = await _getArtists(userToken);
		setArtists(artists);
		console.log(artists);
	};

	return (
		<div className=" w-full space-y-10">
			<Header>
				<div className="space-y-10">
					<h1 className="text-white text-3xl font-semibold">Welcome back</h1>
					<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
						{Array(6)
							.fill(null)
							.map((_, index) => (
								<ListBox name="Liked songs" icon={BsHeart} key={index} />
							))}
					</div>
				</div>
			</Header>
			<div>
				<h1 className="text-xl">Explore Famous Hits</h1>
				{genres && (
					<div className="mt-5 flex flex-wrap gap-4">
						{genres.slice(0, 7).map((genre) => (
							<GenreBox genre={genre} key={genre.id} />
						))}
					</div>
				)}
			</div>
			<div>
				<h1 className="text-xl">Newest Music</h1>
			</div>
			<div className="mt-10">
				<h1 className="text-xl">Popular Artists</h1>
				{artists && (
					<div className="mt-5 flex flex-wrap justify-stretch gap-4 w-full">
						{artists.map((artist: any) => (
							<ArtistBox artist={artist} key={artist.id} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default HomePage;
