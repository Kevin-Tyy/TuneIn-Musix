import React, { useEffect, useState } from "react";
import {
	_getAlbums,
	_getArtists,
	_getGenres,
	_getPlaylistByGenre,
	_getToken,
	_getTracks,
} from "../../api/fetch/config";
import GenreBox from "../../components/GenreBox";
import { AlbumType, GenreItemType } from "../../types";
import ArtistBox from "../../components/ArtistBox";
import { useSelector } from "react-redux";
import { userAccount } from "../../redux/slices/Accountslice";
import Header from "../../components/navigation/Header";
import ListBox from "../../components/navigation/ListBox";
import { BsHeart } from "react-icons/bs";
import AlbumBox from "../../components/AlbumBox";

const HomePage: React.FC = () => {
	// const [token, setToken] = useState("");
	const [genres, setGenres] = useState<GenreItemType[]>([]);
	const [artists, setArtists] = useState<any>([]);
	const [albums, setAlbums] = useState<AlbumType[] | null>(null);
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

		const { albums } = await _getAlbums(
			userToken,
			"0aAVMtHuK9wX1mQozWvdSZ,3T4tUhGYeRNVUGevb0wThu,1ATL5GLyefJaxhQzSPVrLX,6qNMYsx5OUFDXWAoct9Pge,6q8AAimjVfKuv9PrI5xto9,277z75G1Gdz0SWN9pegrrs,36BrJMjIOTyT6Jyv43i1Uu,3nzuGtN3nXARvvecier4K0"
		);
		setAlbums(albums);
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
			<div className="p-4">
				<h1 className="text-xl">Explore Famous Hits</h1>
				{genres && (
					<div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-7 gap-2">
						{genres.slice(0, 7).map((genre) => (
							<GenreBox genre={genre} key={genre.id} />
						))}
					</div>
				)}
			</div>
			<div>
				<h1 className="text-xl">Newest Music</h1>
			</div>
			<div>
				{albums && (
					<div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-2">
						{albums.map((album: any) => (
							<AlbumBox item={album} key={album} />
						))}
					</div>
				)}
			</div>
			<div className="mt-10 p-4">
				<h1 className="text-xl">Popular Artists</h1>
				{artists && (
					<div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-2">
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
