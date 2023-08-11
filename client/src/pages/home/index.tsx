import React, { useEffect, useState } from "react";
import {
	_getArtists,
	_getGenres,
	_getPlaylistByGenre,
	_getToken,
	_getTracks,
} from "../../api/fetch/config";
import GenreBox from "../../components/GenreBox";
import { GenreItemType, ArtistType } from "../../types";
import ArtistBox from "../../components/ArtistBox";
import { useDispatch } from "react-redux";
import { addToken } from "../../redux/slices/Accountslice";

const HomePage: React.FC = () => {
	// const [token, setToken] = useState("");
	const [genres, setGenres] = useState<GenreItemType[]>([]);
	const [artists, setArtists] = useState<any>([]);
	const dispatch = useDispatch();
	useEffect(() => {
		populatePage();
	}, []);

	const populatePage = async () => {
		const accessToken = await _getToken();
		// setToken(accessToken);
		dispatch(addToken(accessToken));

		const genres = await _getGenres(accessToken);
		setGenres(genres);

		const { artists } = await _getArtists(accessToken);
		setArtists(artists);
		console.log(artists);
	};

	return (
		<div className="mt-10 w-full space-y-10">
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
