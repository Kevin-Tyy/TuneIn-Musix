import React, { useState } from "react";
import { useSelector } from "react-redux";
import { userAccount } from "../../redux/slices/Accountslice";
import Header from "../../components/navigation/Header";
import { FiSearch } from "react-icons/fi";
import { LuSettings2 } from "react-icons/lu";
import { _searchItems } from "../../api/fetch/config";
import { SearchResult } from "../../types";
import SearchBox from "./components/SearchBox";
const SearchPage: React.FC = () => {
	const { recentMusic } = useSelector(userAccount);
	const [queryString, setQueryString] = useState<string>('');
	const [searchResults, setSearchResults] = useState<SearchResult | null>(null);

	const { userToken } = useSelector(userAccount);
	const handleSearch = (e: any) => {
		e.preventDefault();
		if (queryString) {
			_searchItems(userToken, queryString as string).then((response) => {
				const { albums } = response;
				setSearchResults(albums);
			});
		}
	};

	console.log(searchResults);

	return (
		<div className="mt-5">
			<div className=" p-3 rounded-3xl w-full  max-w-2xl space-y-6">
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
						<div className="flex items-center text-gray-400 cursor-pointer hover:bg-gray-700/50 p-2 rounded-md">
							<LuSettings2 />
							<p className="">Filters</p>
						</div>
					</div>
				</form>
			</div>
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
			<div className="px-4">
				{searchResults && (
					<div className="flex flex-col gap-3">
						{searchResults?.items.map((item, index) => (
							<SearchBox item={item} key={index} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default SearchPage;
