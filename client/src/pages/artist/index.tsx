import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userAccount } from "../../redux/slices/AccountSlice";
import { _getArtistAlbumsById, _getArtistById } from "../../api/fetch/config";
import { ArtistType, SearchResult } from "../../types";

const Artist = () => {
	const { id } = useParams();
	const { userToken } = useSelector(userAccount);
	const [artist, setArtist] = useState<ArtistType | null>(null);
	const [albums, setAlbums] = useState<SearchResult | null>(null);
	useEffect(() => {
		const populatePage = async () => {
			if (id) {
				const artistData = await _getArtistById(userToken, id);
				setArtist(artistData);
				const albumsResult = await _getArtistAlbumsById(userToken, id);
				setAlbums(albumsResult);
			}
		};
		populatePage();
	}, [id]);
	console.log(albums?.items);
	
	return (
		<section className="">
			<div className="z-[10] relative">
				Artist {artist?.name}
				<p>{albums?.total} Albums</p>
				<p className="z-[10] relative text-5xl">{artist?.followers.total}</p>
			</div>
			<div className="h-[700px] absolute inset-0 ">
				<img
					src={artist?.images[0].url!}
					className="w-full h-full object-cover z-[1]"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-black/20 to to-black h-full z-[]"></div>
			</div>
		</section>
	);
};

export default Artist;
