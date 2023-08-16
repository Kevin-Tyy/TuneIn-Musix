import SpotifyPlayer from "react-spotify-web-playback";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { userAccount } from "../../redux/slices/Accountslice";
import axios from "axios";

const Player = () => {
	const { userToken } = useSelector(userAccount);
  
	useEffect(() => {
		// getPlayer();
	}, []);
	// const getPlayer = async () => {
	// 	const player = await axios.get("https://api.spotify.com/v1/me/player", {
	// 		headers: {
	// 			Authorization: "Bearer " + userToken,
	// 		},
	// 	});
	// 	console.log(player);
	// };
	return (
		<div className="text-white fixed bottom-0">
			
		</div>
	);
};

export default Player;
