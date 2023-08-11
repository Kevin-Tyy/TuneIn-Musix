import { FaPlay } from "react-icons/fa";

const ListBox = ({ name, icon: Icon }: any) => {
	return (
		<div className="w-full">
			<button className="relative w-full group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 cursor-pointer hover:bg-neutral-100/20 transition pr-4">
				<div className="relative min-h-[64px] min-w-[64px] bg-gradient-to-br from-purple-700 to-gray-400 flex items-center justify-center">
					<Icon size={26} />
				</div>
				<p className="font-medium truncate py-5">{name}</p>
				<div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
					<FaPlay className="text-black" />
				</div>
			</button>
		</div>
	);
};

export default ListBox;
