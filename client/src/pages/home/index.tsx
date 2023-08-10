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
import { addToken } from "../../redux/slices/AccountSlice";

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
		<div className="mt-4">
			{genres && (
				<div className="flex flex-wrap gap-4">
					{genres.slice(0, 7).map((genre) => (
						<GenreBox genre={genre} key={genre.id} />
					))}
				</div>
			)}
			{artists && (
				<div className="flex flex-wrap gap-4">
					{artists.map((artist: any) => (
						<ArtistBox artist={artist} key={artist.id} />
					))}
				</div>
			)}
		</div>
	);
};

export default HomePage;
