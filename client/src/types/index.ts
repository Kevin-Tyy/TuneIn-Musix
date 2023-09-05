export enum SearchFilterType {
	Album = "album",
	Artist = "artist",
	Track = "track",
}

export interface UserType {
	_id: string;
	username: string;
	email: string;
	authenticationmethod: "email_password" | "oauth";
	savedMusic: Array<any>;
	avatar: string;
	createdAt: Date;
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
	total?: number
	release_date: string;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	uri: string;
}

export interface SearchAlbumResult {
	href: string;
	items: AlbumType[];
	limit: null;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
}
export interface SearchTrackResult {
	href: string;
	items: TrackType[];
	limit: null;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
}
export interface PlaylistItem {
	_id: string;
	playlistImage: string;
	playlistName: string;
	playlistDescription: string;
	user: UserType;
	songIds: String[];
	createdAt: Date;
	updatedAt: Date;
}

export interface TrackType {
	album: AlbumType;
	artists: ArtistType[];
	available_markets?: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_urls: {
		spotify: string;
	};
	external_ids: {
		isrc: string;
		ean: string;
		upc: string;
	};
	href: string;
	id: string;
	is_playable: boolean;
	linked_from: object;
	restriction: { reason: string };
	name: string;
	popularity: number;
	preview_url: string | null;
	track_number: number;
	type: 'track';
	uri: string;
	is_local: boolean;
}
