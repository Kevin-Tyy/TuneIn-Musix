// type FuncProps = (value: string) => any;
const clientId = "a370aafac3f84b53a50cc0600aa2f531";
const clientSecret = "bd1c4a3b88b149beb2e5cc7b349b8905";

const BaseUrl = "https://api.spotify.com/v1";
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
	const result = await fetch(`${BaseUrl}/browse/categories?locale=sv_US`, {
		method: "GET",
		headers: { Authorization: "Bearer " + token },
	});

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

const _getArtists = async (token: string) => {
	const result = await fetch(
		`${BaseUrl}/artists?ids=3wcj11K77LjEY1PkEazffa,7vk5e3vY1uw9plTHJAMwjN,6DqOCt7j8SziMQBGXrXVFD,048LktY5zMnakWq7PTtFrz,75VKfyoBlkmrJFDqo1o2VY,5H4yInM5zmHqpKIoMNAx4r,46pWGuE3dSwY3bMMXGBvVS,1vCWHaC5f2uS3yhpwWbIA6`,
		{
			method: "GET",
			headers: {
				Authorization: "Bearer " + token,
			},
		}
	);
	const data = result.json();
	return data;
};
const _getArtistById = async (token: string, artistId: string) => {
	const result = await fetch(`${BaseUrl}/artists/${artistId}`, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + token,
		},
	});
	const data = result.json();
	return data;
};
const _getArtistData = async (token: string, artistId: string , feed : string) => {
	const result = await fetch(`${BaseUrl}/artists/${artistId}/${feed}`, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + token,
		},
	});
	const data = result.json();
	return data;
};
const _getArtistRelated = async (token: string, artistId: string) => {
	const result = await fetch(`${BaseUrl}/artists/${artistId}/related-artists`, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + token,
		},
	});
	const data = await result.json();
	return data;
};
const _searchItems = async (token: string, query: string, filter: string) => {
	const result = await fetch(`${BaseUrl}/search?q=${query}&type=${filter}`, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + token,
		},
	});
	const data = await result.json();
	return data;
};

const _getAlbums = async (token: string , ids : string) => {
	const result = await fetch(`${BaseUrl}/albums?ids=${ids}`, {
		method: "GET",
		headers: {
			Authorization: "Bearer " + token,
		},
	});
	const data = await result.json();
	return data;
};

export {
	_getGenres,
	_getToken,
	_getTrack,
	_getPlaylistByGenre,
	_getTracks,
	_getArtists,
	_getArtistById,
	_getArtistData,
	_getArtistRelated,
	_searchItems,
	_getAlbums
};
