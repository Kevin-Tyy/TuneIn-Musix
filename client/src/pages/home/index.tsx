import React, { useEffect, useState } from "react";
import { _getGenres, _getToken } from "../../api/fetch/config";
import GenreBox from "../../components/GenreBox";
import { GenreItemType } from "../../types";


const HomePage: React.FC = () => {
	const [token, setToken] = useState("");
	const [genres, setGenres] = useState<GenreItemType[]>([]);
	useEffect(() => {
		populatePage();
	}, []);
	console.log(genres);
	
	const populatePage = async () => {
		const accessToken = await _getToken();
		setToken(accessToken);

		const genres = await _getGenres(accessToken);
		setGenres(genres);
	};

	return (
		<div>
			{genres && (
				<div className="flex flex-wrap gap-4">
					{genres.map((genre) => (
						<GenreBox genre={genre} key={genre.name}/>
					))}
				</div>
			)}
		</div>
	);
};

export default HomePage;
