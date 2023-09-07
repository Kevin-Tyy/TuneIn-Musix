import React from "react";
import Playlist from "./Playlist";
import Track from "./Track";

const SettingsPage: React.FC = () => {
	return (
		<div>
			<h1>music list (drag and drop to add music to your playlist)</h1>
			<Track id="music1" title="Demo Sagamba" />
			<Track id="music2" title="Joli Kenny Sol" />
			<Track id="music3" title="Fenty Kenny Sol 2 saint" />
			<Track id="music4" title="Bandana Fireboy Asake DML " />
			<Track id="music5" title="Bloody Samaritan Ayra Starr" />

			<div className="mt-10">
				<h1>Your playlists</h1>
				<Playlist />
			</div>
			dlkahsd
		</div>
	);
};

export default SettingsPage;
