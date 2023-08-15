import React, { useState } from "react";
import { useSelector } from "react-redux";
import { userAccount } from "../../redux/slices/Accountslice";
import { FiSearch } from "react-icons/fi";
import { _searchItems } from "../../api/fetch/config";
import { SearchResult } from "../../types";
import SearchBox from "../../components/AlbumBox";
import SearchFilter from "../../components/modals/SearchFilter";
import Header from "../../components/navigation/Header";
import { toast } from "react-hot-toast";
import { BounceLoader } from "react-spinners";
const SearchPage: React.FC = () => {
	const { recentMusic } = useSelector(userAccount);
	const [queryString, setQueryString] = useState<string>("");
	const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
	const [searchFilter, setSearchFilter] = useState("track");
	const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const { userToken } = useSelector(userAccount);
	const handleSearch = (e: any) => {
		e.preventDefault();
		if (queryString) {
			setLoading(true);
			setSearchResults(null);
			_searchItems(userToken, queryString as string, "track")
				.then((response) => {
					const { tracks } = response;
					setSearchResults(tracks);
				})
				.catch((error) => {
					toast.error("Something went wrong");
					console.log(error);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	};
	return (
		<div>
			<Header>
				<div className="h-16 flex items-end">
					<h1 className="text-xl">Browse your favorite music</h1>
				</div>
				<div className="mt-10  rounded-3xl w-full  max-w-2xl space-y-6">
					<form onSubmit={handleSearch}>
						<div className=" bg-neutral-100/10 focus-within:ring-1 ring-inset ring-gray-600 px-4 py-2 rounded-md flex items-center gap-3">
							<button className=" text-white rounded-full">
								<FiSearch size={15} />
							</button>
							<input
								className=" w-full bg-transparent text-sm outline-none"
								placeholder="Search"
								value={queryString as string}
								onChange={(e) => setQueryString(e.target.value)}
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
				{!searchResults && (
					<>
						{recentMusic.length > 0 ? (
							<div>
								{recentMusic.map((_: any, index: number) => (
									<p key={index}>RecentMusic at {index}</p>
								))}
							</div>
						) : (
							<div className="flex justify-center items-center">
								<h1 className="text-xl">No Recent Music</h1>
							</div>
						)}
					</>
				)}
				<div className="px-4 mt-5">
					{loading && !searchResults && (
						<div className="flex items-center justify-center h-96">
							<BounceLoader size={140} color="#36d7b7" />
						</div>
					)}
					{searchResults && (
						<div className="space-y-10">
							<h1 className="text-2xl font-semibold">Top Results</h1>
							<div className="flex flex-col gap-3">
								{searchResults?.items.map((item, index) => (
									<SearchBox item={item} key={index} index={index} />
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
