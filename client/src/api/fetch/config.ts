// import axios from "axios";

// type FuncProps = (value: string) => any;
const clientId = "a370aafac3f84b53a50cc0600aa2f531";
const clientSecret = "bd1c4a3b88b149beb2e5cc7b349b8905";

const _getToken = async () => {
	const result = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
		},
		body: "grant_type=client_credentials",
	});

	const data = await result.json();
	return data.access_token;
};

const _getGenres = async (token: string) => {
	const result = await fetch(
		`https://api.spotify.com/v1/browse/categories?locale=sv_US`,
		{
			method: "GET",
			headers: { Authorization: "Bearer " + token },
		}
	);

	const data = await result.json();
	return data.categories.items;
};

const _getPlaylistByGenre = async (token: string, genreId: string) => {
	const limit = 10;

	const result = await fetch(
		`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
		{
			method: "GET",
			headers: { Authorization: "Bearer " + token },
		}
	);

	const data = await result.json();
	return data.playlists.items;
};

const _getTracks = async (token: string, tracksEndPoint: string) => {
	const limit = 10;

	const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
		method: "GET",
		headers: { Authorization: "Bearer " + token },
	});

	const data = await result.json();
	return data.items;
};

const _getTrack = async (token: string, trackEndPoint: string) => {
	const result = await fetch(`${trackEndPoint}`, {
		method: "GET",
		headers: { Authorization: "Bearer " + token },
	});

	const data = await result.json();
	return data;
};

export { _getGenres, _getToken, _getTrack, _getPlaylistByGenre, _getTracks };