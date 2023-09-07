import React from "react";
import Track from "./Track";

type ITrack = {
	id: string;
	title: string;
};
const Playlist = () => {
	const [playlist, setPlaylist] = React.useState<ITrack[]>([]);
	const [isDraggedOver, setIsDraggedOver] = React.useState(false);
	const handleDrop = (e: any) => {
		e.preventDefault();
		console.log("File dropped");
		const track = e.dataTransfer.getData("track");
		const isTrackAlreadyAdded = playlist.some((intrack) => intrack.id === track.id);
		console.log(isTrackAlreadyAdded);
		if (isTrackAlreadyAdded) return alert("Track already added");
		setPlaylist([...playlist, JSON.parse(track as never)]);
    setIsDraggedOver(false)
	};

	const allowDrop = (e: any) => {
		e.preventDefault();
		console.log("Dragged over");
	};
	return (
		<div
			className={`bg-neutral-700 p-10 my-10 ${
				isDraggedOver && "bg-green-600"
			}`}
			id="playlist"
			onDragOver={allowDrop}
      onDragEnter={() => setIsDraggedOver(true)}
			onDrop={handleDrop}
			onDragLeave={() => setIsDraggedOver(false)}>
			Playlist
			<div className="bg-neutral-800 my-2">
				{playlist.map((item, index) => (
					<Track id={item.id} title={item.title} key={index} />
				))}
			</div>
		</div>
	);
};

export default Playlist;
