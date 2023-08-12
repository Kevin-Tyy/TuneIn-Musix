export interface UserType {
	_id : string;
	username: string;
	email: string;
	authenticationmethod: "email_password" | "oauth";
	savedMusic: Array<any>;
	avatar: string;
}
// interface MusicType {}
export interface GenreItemType {
	href: string;
	icons: Array<ImageType>;
	id: string;
	name: string;
}
export interface ImageType {
	height: number | null;
	url: string | null;
	width: number | null;
}
export interface ArtistType {
	external_urls: ExternalUrlsType;
	followers: ArtistFollowerType;
	href: string;
	id: string;
	name: string;
	images: ImageType[];
	genres: string[];
	popularity: number;
	type: string;
	uri: string;
}
type ExternalUrlsType = {
	spotify: string;
};
type ArtistFollowerType = {
	href: string | null;
	total: number;
};

// type PlaylistOwner = {
// 	external_urls: ExternalUrlsType;
// 	display_name: string;
// 	spotify: string;
// 	href: string;
// 	id: string;
// 	type: string;
// 	uri: string;
// };

// type Track = {
// 	href: string;
// 	total: number;
// };

export interface AlbumType {
	album_group: string;
	album_type: string;
	artists: ArtistType[];
	available_markets: string[];
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: ImageType[];
	name: string;
	release_date: string;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	uri: string;
}

export interface SearchResult {
	href: string;
	items: AlbumType[];
	limit: null;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
}
