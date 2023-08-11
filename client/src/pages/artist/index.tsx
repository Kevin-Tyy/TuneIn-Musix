import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userAccount } from "../../redux/slices/Accountslice";
import {
	_getArtistAlbumsById,
	_getArtistById,
	_getArtistRelated,
} from "../../api/fetch/config";
import { ArtistType, SearchResult } from "../../types";
import ArtistBox from "../../components/ArtistBox";

const Artist = () => {
	const { id } = useParams();
	const { userToken } = useSelector(userAccount);
	const [artist, setArtist] = useState<ArtistType>();
	const [relatedArtists, setRelatedArtists] = useState<ArtistType[]>([]);
	const [albums, setAlbums] = useState<SearchResult | null>(null);

	useEffect(() => {
		const populatePage = async () => {
			if (id) {
				const artistData = await _getArtistById(userToken, id);
				setArtist(artistData);
				const albumsResult = await _getArtistAlbumsById(userToken, id);
				setAlbums(albumsResult);
				const relatedArtists = await _getArtistRelated(userToken, id);
				setRelatedArtists(relatedArtists.artists);
			}
		};
		populatePage();
	}, [id]);
	console.log(relatedArtists);

	return (
		<section className="">
			<div className="h-[600px]">
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
			</div>
			<div className="mt-10 ">
				<h1 className="text-xl">Popular Artists</h1>
				{relatedArtists && (
					<div className="mt-5 flex flex-wrap justify-stretch gap-4 w-full">
						{relatedArtists.map((artist: ArtistType) => (
							<ArtistBox artist={artist} key={artist.id} />
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default Artist;
