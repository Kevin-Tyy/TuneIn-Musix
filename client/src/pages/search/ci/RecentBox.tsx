import { TrackType } from "../../../types";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { removeRecentMusic } from "../../../redux/slices/Accountslice";

type Props = {
	item: TrackType;
};
const RecentBox = ({ item }: Props) => {
	const dispatch = useDispatch();
	const handleRemoveRecent = (musicId: string) => {
		dispatch(removeRecentMusic(musicId));
	};
	return (
		<div
			className="flex items-center gap-5 select-none"
			title={item?.album?.name}>
			<div className="relative flex flex-col w-full bg-neutral-900 h-80 p-2 group rounded-lg hover:bg-neutral-800/80 transition cursor-pointer">
				<div
					className="bg-neutral-800/20 p-2 absolute top-0 right-0 z-[1] rounded-full m-1 backdrop-blur-md hover:bg-neutral-700"
					onClick={() => handleRemoveRecent(item?.id)}>
					<IoClose size={20} />
				</div>
				<div className="flex flex-col gap-4 p-4">
					<div className="relative">
						<img
							src={item?.album?.images[0].url!}
							className="h-full rounded-lg"
						/>
					</div>
					<div className="flex flex-col space-y-1 justify-center">
						<h1 className="line-clamp-2">{item?.name}</h1>
						<p className="text-gray-400 text-xs">
							{item?.artists.map((artist) => (
								<span key={artist.id}>
									<Link
										to={`/artist/${artist.id}`}
										className="hover:underline text-sm">
										{artist.name}
									</Link>
									{item.artists.indexOf(artist) !== item.artists.length - 1 &&
										", "}
								</span>
							))}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecentBox;
