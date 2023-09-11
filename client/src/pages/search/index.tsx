import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addRecentMusic,
	clearAllRecentMusic,
	userAccount,
} from "../../redux/slices/Accountslice";
import { FiSearch } from "react-icons/fi";
import { _getGenres, _getTracks, _searchItems } from "../../api/fetch/config";
import { AlbumType, GenreItemType, TrackType } from "../../types";
import SearchFilter from "../../components/modals/SearchFilter";
import Header from "../../components/navigation/Header";
import { LoaderIcon, toast } from "react-hot-toast";
import TrackBox from "../../components/TrackBox";
import AlbumBox from "../../components/AlbumBox";
import { TfiMusicAlt } from "react-icons/tfi";
import RecentBox from "./ci/RecentBox";
import GenreBox from "../../components/GenreBox";

interface SearchResult<T> {
	href: string;
	items: T[];
	limit: null;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
}

type AlbumSearchResult = SearchResult<AlbumType>;
type TrackSearchResult = SearchResult<TrackType>;

const SearchPage: React.FC = () => {
	const { recentMusic } = useSelector(userAccount);
	const [queryString, setQueryString] = useState<string>("");
	const [recentTracks, setRecentTracks] = useState<TrackType[] | null>(null);
	const [TrackSearchResults, setTrackSearchResults] =
		useState<TrackSearchResult | null>(null);
	const [AlbumSearchResults, setAlumSearchResults] =
		useState<AlbumSearchResult | null>(null);
	const [genres, setGenres] = useState<GenreItemType[] | null>(null);
	const [searchFilter, setSearchFilter] = useState("track");
	const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { userToken } = useSelector(userAccount);
	const [limit, setLimit] = useState<number>(10);
	const handleSearch = (e: any) => {
		e.preventDefault();
		if (!queryString) return;
		searchResults();
	};
	const dispatch = useDispatch();
	const searchResults = () => {
		setLoading(true);
		setAlumSearchResults(null);
		setTrackSearchResults(null);
		_searchItems(userToken, queryString as string, searchFilter)
			.then((response) => {
				if (searchFilter === "track") {
					const { tracks } = response;
					return setTrackSearchResults(tracks);
				}
				if (searchFilter === "album") {
					const { albums } = response;
					return setAlumSearchResults(albums);
				}
			})
			.catch((error) => {
				toast.error(
					"Search failed: Check your internet connection and try again"
				);
				console.log(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const handleRecent = (id: string) => {
		dispatch(addRecentMusic(id));
	};
	const fetchRecentTracks = () => {
		_getTracks(userToken, recentMusic.join(",")).then((response) => {
			setRecentTracks(response.tracks);
		});
	};
	const fetchGenres = async () => {
		const genres = await _getGenres(userToken);
		setGenres(genres);
	};
	useEffect(() => {
		fetchRecentTracks();
		fetchGenres();
	}, [recentMusic]);
	return (
		<div>
			<Header>
				<div className="h-16 flex items-end">
					<h1 className="text-xl">Browse your favorite music</h1>
				</div>
				<div className="mt-10  rounded-3xl w-full  max-w-xl space-y-6">
					<form onSubmit={handleSearch}>
						<div className=" bg-neutral-100/10 focus-within:ring-1 ring-inset ring-fuchsia-600 transition duration-300 px-1 pl-3 py-1 rounded-md flex items-center gap-3">
							<button className=" text-white rounded-full">
								<FiSearch size={15} />
							</button>
							<input
								className=" w-full bg-transparent text-sm outline-none"
								placeholder="Search"
								value={queryString as string}
								onChange={(e) => {
									handleSearch(e);
									setQueryString(e.target.value);
								}}
							/>
							<div className="flex flex-col">
								{
									<SearchFilter
										searchFilter={searchFilter}
										setSearchFilter={setSearchFilter}
										isSearchFilterOpen={isSearchFilterOpen}
										setIsSearchFilterOpen={setIsSearchFilterOpen}
									/>
								}
							</div>
						</div>
					</form>
				</div>
			</Header>
			<div className="mt-5">
				{!(AlbumSearchResults || TrackSearchResults) &&
					!loading &&
					recentMusic.length > 0 && (
						<div className="px-4 relative">
							<h1 className="text-xl md:text-2xl mb-5">Your recent searches</h1>

							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-7 gap-2">
								{recentTracks &&
									recentTracks.map((item: TrackType, index: number) => (
										<RecentBox item={item} key={index} />
									))}
							</div>
							<p
								className="absolute right-3 top-3 cursor-pointer hover:underline p-4"
								onClick={() => dispatch(clearAllRecentMusic())}>
								Clear all
							</p>
						</div>
					)}
				{!(AlbumSearchResults || TrackSearchResults) && !loading && (
					<div className="p-4">
						<h1 className="text-xl md:text-2xl mb-5">Browse all categories</h1>
						{genres && (
							<div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-7 gap-3">
								{genres?.map((item, index) => (
									<GenreBox genre={item} key={index} />
								))}
							</div>
						)}
					</div>
				)}
				<div className="px-10 mt-10">
					{loading && (
						<div className="flex items-center justify-center h-96">
							<LoaderIcon style={{ width: 50, height: 50, borderWidth: 3 }} />
						</div>
					)}
					{AlbumSearchResults && (
						<div className="space-y-10">
							<h1 className="text-2xl font-semibold">Top Results</h1>
							<div className="flex flex-col gap-3">
								{AlbumSearchResults?.items.map((item, index) => (
									<AlbumBox item={item} key={index} index={index} />
								))}
							</div>
						</div>
					)}
					{TrackSearchResults &&
						(TrackSearchResults.items.length ? (
							<div className="space-y-10">
								<h1 className="text-2xl font-semibold">Top Results</h1>
								<div className="flex flex-col gap-3">
									{TrackSearchResults?.items
										.slice(0, limit)
										.map((item, index) => (
											<div key={index} onClick={() => handleRecent(item?.id)}>
												<TrackBox item={item} index={index} />
											</div>
										))}
								</div>

								<button
									className="bg-gradient-to-br  from-primary-400 via-purple-600 to-pink-400 py-3 px-6 rounded-full hover:bg-primary-300 transition hover:scale-105"
									onClick={() => setLimit(limit + 10)}
									disabled={limit >= TrackSearchResults?.items.length}>
									View more
								</button>
							</div>
						) : (
							<div>
								<p>Loading....</p>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
