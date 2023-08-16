
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { userAccount } from "../../redux/slices/Accountslice";
import axios from "axios";
import { playerStatus } from "../../redux/slices/PlayerSlice";
// import axios from "axios";

const Player = () => {
	const { userToken } = useSelector(userAccount);
  const { currentTrack } = useSelector(playerStatus)
  
	useEffect(() => {
	}, []);

	return (
		<div className="bg-black fixed bottom-0 w-full h-[5vh] ring-1 ring-fuchsia-600">
      <div className="flex items-center justify-between h-full">
        <div>Song details</div>
        <div>Playback</div>
        <div>Effects</div>
      </div>  
    </div>
	);
};

export default Player;
