import React from "react";
import { AlbumType } from "../types";

type AlbumBoxProps = {
	item: AlbumType;
	index?: number;
};
const AlbumBox: React.FC<AlbumBoxProps> = ({ item }) => {
	return (
		<div className="flex items-center gap-5 select-none" title={item?.name}>
			<div className="flex flex-col w-full bg-neutral-900 max-h-[300px] p-2 group rounded-lg hover:bg-neutral-800/80 transition cursor-pointer">
				<div className="flex flex-col gap-4 p-4">
					<div className="relative">
						<img src={item?.images[0].url!} className="h-full rounded-lg" />
					</div>
					<div className="flex flex-col space-y-1 justify-center">
						<h1 className="line-clamp-2">{item?.name}</h1>
						<p className="text-gray-400 text-xs">
							{item?.release_date.split("-")[0]} • {item?.album_group}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AlbumBox;
