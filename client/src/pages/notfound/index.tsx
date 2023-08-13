import React from "react";
import Image from "./561-5616833_404-png.png";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
	const navigate = useNavigate()
	return (
		<div className="bg-cover h-screen w-full flex flex-col gap-10 items-center justify-center bg-primary-dark">
			<img src={Image} alt="" className="max-w-xs" />
			<button onClick={() => navigate('/')} className="px-6 py-3 bg-gradient-to-br whitespace-nowrap from-primary-600 via-purple-800 to-pink-400 rounded-full hover:scale-105 transition active:scale-95 select-none text-white text-sm">
				Back to home
			</button>
		</div>
	);
};

export default NotFound;
