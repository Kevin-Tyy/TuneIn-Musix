import { Link } from "react-router-dom";
import { ArtistType } from "../types";

interface ArtistBoxProps {
	artist: ArtistType;
}
const ArtistBox: React.FC<ArtistBoxProps> = ({ artist }) => {
	return (
		<Link to={`/artist/${artist.id}`}>
			<div className="max-w-[300px]">
				<img src={artist.images[0].url!} alt="w-12 rounded-full" />
			</div>
		</Link>
	);
};

export default ArtistBox;
