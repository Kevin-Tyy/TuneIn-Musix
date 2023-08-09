export interface UserType {
	username: string;
	email: string;
	authenticationmethod: "email_password" | "oauth";
	savedMusic: Array<any>;
	avatarUrl: string;
}
interface MusicType {}
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
export interface playlistsType {
	collaborative: boolean;
	descrition: string;
	external_urls: ExternalUrlsType;
	href: string;
	id: string;
	images: ImageType[];
	name: string;
	owner: any;
	primary_color: string | null;
	public: string | null;
	snapshot_id: string;
	tracks: string;
	type: string;
	uri: string;
}
type ExternalUrlsType = {
    spotify : string
}
type PlaylistOwner = {
    
}
// collaborative : false
// description: "The latest straight bars and Afro-Trap. Cover:  <a href=\"https://open.spotify.com/artist/2gzWmhOZhDN6gXL49JW9qj?si=Ora3xnr8SBGrMFD1T03W7A\"> Nasty C</a>"
// external_urls:{spotify: 'https://open.spotify.com/playlist/37i9dQZF1DXdl8xYyG9Dm1'}
// href: "https://api.spotify.com/v1/playlists/37i9dQZF1DXdl8xYyG9Dm1"
// id:"37i9dQZF1DXdl8xYyG9Dm1"
// images: [{…}]
// name: "No Wahala"
// owner: {display_name: 'Spotify', external_urls: {…}, href: 'https://api.spotify.com/v1/users/spotify', id: 'spotify', type: 'user', …}
// primary_color: null
// public : null
// snapshot_id: "MTY5MDUwMjQ2MCwwMDAwMDAwMDE3ZjI4OTM2MjA3M2UwNWJlMzBiYjNiMmJkZTkwNjY1"
// tracks: {href: 'https://api.spotify.com/v1/playlists/37i9dQZF1DXdl8xYyG9Dm1/tracks', total: 70}
// type : "playlist"
// uri : "spotify:playlist:37i9dQZF1DXdl8xYyG9Dm1"
