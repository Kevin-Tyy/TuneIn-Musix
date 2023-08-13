import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userAccount } from "../../redux/slices/Accountslice";
import {
	_getArtistById,
	_getArtistData,
	_getArtistRelated,
} from "../../api/fetch/config";
import { ArtistType, SearchResult } from "../../types";
import ArtistBox from "../../components/ArtistBox";
import SearchBox from "../search/components/SearchBox";
import clsx from "clsx";
import { VscVerifiedFilled } from "react-icons/vsc";
import BackButtons from "../../components/buttons/BackButtons";
import Navbar from "../../components/navigation/navBar";
import PlayButton from "../../components/PlayButton";

const Artist = () => {
	const { id } = useParams();
	const [limit, setLimit] = useState(5);
	const [artistlimit, setartistLimit] = useState(10);
	const { userToken } = useSelector(userAccount);
	const [artist, setArtist] = useState<ArtistType>();
	const [relatedArtists, setRelatedArtists] = useState<ArtistType[]>([]);
	const [albums, setAlbums] = useState<SearchResult | null>(null);
	// const [topTracks, setTopTracks] = useState<SearchResult | null>(null);
	const handleNext = () => {
		window.history.forward();
	};
	const handlePrevious = () => {
		window.history.back();
	};
	useEffect(() => {
		const populatePage = async () => {
			if (id) {
				const artistData = await _getArtistById(userToken, id);
				setArtist(artistData);
				const albumsResult = await _getArtistData(userToken, id, "albums");
				setAlbums(albumsResult);
				const trackResult = await _getArtistData(userToken, id, "top-tracks");
				setTopTracks(trackResult);
				const relatedArtists = await _getArtistRelated(userToken, id);
				setRelatedArtists(relatedArtists.artists);
			}
		};
		populatePage();
		resetPage();
	}, [id]);

	const resetPage = () => {
		setLimit(5);
		setartistLimit(10);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	};
	const disabled = limit === albums?.items.length;
	const artistdisabled = artistlimit === relatedArtists.length;
	return (
		<section className="relative overflow-auto">
			<div
				className="h-fit overflow-hidden bg-cover bg-no-repeat bg-fixed bg-center relative rounded-xl"
				style={{ backgroundImage: `url(${artist?.images[0].url!})` }}>
				<div className="flex p-4 justify-between items-center bg-transparent">
					<BackButtons
						handleNext={handleNext}
						handlePrevious={handlePrevious}
					/>
					<div>
						<Navbar />
					</div>
				</div>
				<div className="h-[600px] flex items-end">
					<div className="z-[10] p-10 space-y-5">
						<div className="flex items-center">
							<VscVerifiedFilled className="text-blue-500" size={20} />
							<p className="font-bold">Verified Artist</p>
						</div>
						<p className="text-7xl font-sans font-black"> {artist?.name}</p>
						<p className="text-gray-400">
							<span>{albums?.total?.toLocaleString()} Albums •</span>
							<span>
								{" "}
								<span className="tracking-widest">
									{artist?.followers.total!.toLocaleString()}
								</span>{" "}
								Followers
							</span>
						</p>
					</div>
				</div>
				<div className="absolute inset-0 bg-gradient-to-b from-black/20 to to-black backdrop-blur-md"></div>
			</div>
			<div className="px-10 flex items-center space-x-6">
				<PlayButton />
				<button className="px-6 py-2 ring-1 ring-gray-500 hover:ring-white transition rounded-full">
					Follow
				</button>
			</div>
			{albums && (
				<div className="space-y-4 mt-10">
					<h1>Popular Songs</h1>
					<div className="flex flex-col gap-3">
						{albums.items.slice(0, limit).map((item, index) => (
							<SearchBox item={item} index={index} key={index} />
						))}
					</div>
					<div className="pl-2 flex items-center gap-5">
						<button
							onClick={() => setLimit((prev) => prev + 5)}
							disabled={disabled}
							className={clsx(
								" max-w-[] px-6 py-3 bg-gradient-to-br whitespace-nowrap from-primary-400 via-purple-600 to-pink-400 rounded-full hover:scale-105 transition active:scale-95 select-none",
								disabled && "opacity-50 hover:scale-100 active:scale-100"
							)}>
							See more
						</button>
						{disabled && (
							<p
								className="hover:underline text-white cursor-pointer"
								onClick={() => setLimit(5)}>
								Show less
							</p>
						)}
					</div>
				</div>
			)}
			<div className="mt-10 ">
				<h1 className="text-xl">Popular Artists</h1>
				{relatedArtists && (
					<div className="space-y-5">
						<div className="mt-5 flex flex-wrap justify-stretch gap-4 w-full">
							{relatedArtists
								.slice(0, artistlimit)
								.map((artist: ArtistType) => (
									<ArtistBox artist={artist} key={artist.id} />
								))}
						</div>
						<div className="pl-2 flex items-center gap-5">
							<button
								onClick={() => setartistLimit((prev) => prev + 5)}
								disabled={artistdisabled}
								className={clsx(
									" max-w-[] px-6 py-3 bg-gradient-to-br whitespace-nowrap from-primary-400 via-purple-600 to-pink-400 rounded-full hover:scale-105 transition active:scale-95 select-none",
									artistdisabled &&
										"opacity-50 hover:scale-100 active:scale-100"
								)}>
								See more
							</button>
							{artistdisabled && (
								<p
									className="hover:underline text-white cursor-pointer"
									onClick={() => setartistLimit(5)}>
									Show less
								</p>
							)}
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default Artist;
