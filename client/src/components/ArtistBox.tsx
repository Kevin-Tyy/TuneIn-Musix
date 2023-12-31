import { Link } from "react-router-dom";
import { ArtistType } from "../types";
import PlayButton from "./PlayButton";

interface ArtistBoxProps {
	artist: ArtistType;
}
const ArtistBox: React.FC<ArtistBoxProps> = ({ artist }) => {
	return (
		<Link to={`/artist/${artist.id}`}>
			<div className="w-full max-w-md p-4 bg-neutral-600/30 rounded-md flex flex-col gap-5 transition hover:bg-neutral-800 relative group">
				<img
					src={
						artist.images[0]?.url! ||
						"https://res.cloudinary.com/dcwro189i/image/upload/v1691949744/360_F_107434511_iarF2z88c6Ds6AlgtwotHSAktWCdYOn7_td8c4b.webp"
					}
					className="w-[150px] h-[150px] rounded-full object-cover"
				/>

				<h1 className="text-center capitalize font-semibold">{artist.name}</h1>
				{/* <p className="text-gray-500">{artist.type}</p> */}
				<div className="opacity-0 absolute bottom-0 right-3 group-hover:opacity-100  group-hover:-translate-y-6 duration-300 transition">
					<PlayButton />
				</div>
			</div>
		</Link>
	);
};

export default ArtistBox;
