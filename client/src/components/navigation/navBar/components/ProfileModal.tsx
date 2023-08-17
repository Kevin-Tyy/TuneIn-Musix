import { MdClose } from "react-icons/md";

const settings = [
	{ title: "Profile", link: "#" },
	{ title: "Your playlists", link: "#" },
	{ title: "Your activity", link: "#" },
	{ title: "Logout", link: "#" },
];
const ProfileModal = ({ onClose }: any) => {
	return (
		<div className="absolute right-0 overflow-hidden rounded-lg animate-slideup bg-primary-dark px-1  pb-4  pt-5 text-left shadow-xl transition-all w-full sm:my-5 sm:w-full sm:max-w-lg">
			<button
				onClick={onClose}
				className="absolute top-1 right-1 p-1 rounded-md text-gray-400 hover:bg-gray-600 hover:text-white transition">
				<MdClose size={25} />
			</button>
			<ul className="space-y-2 mt-2">
				{settings.map((item, index) => (
					<li key={index} className="p-2 hover:bg-primary-500">
						{item.title}
					</li>
				))}
			</ul>
		</div>
	);
};

export default ProfileModal;
