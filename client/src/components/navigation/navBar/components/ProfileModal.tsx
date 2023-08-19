import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../../../redux/slices/Authslice";
import { Link } from "react-router-dom";

const ProfileModal = ({ onClose }: any) => {
	const { user : { username }} = useSelector(loggedInUser)
	const settings = [
		{ title: "Profile", link: `/profile/${username}` },
		{ title: "Your playlists", link: "#" },
		{ title: "Your activity", link: "#" },
		{ title: "Logout", link: "#" },
	];
	return (
		<div className="absolute right-0 overflow-hidden rounded-lg animate-slideup bg-neutral-900 px-1  pb-4  pt-5 text-left shadow-xl transition-all w-full sm:my-5 sm:w-full sm:max-w-lg">
			<button
				onClick={onClose}
				className="absolute top-1 right-1 p-1 rounded-md text-gray-400 hover:bg-gray-600 hover:text-white transition">
				<MdClose size={25} />
			</button>
			<ul className="space-y-3 mt-2">
				{settings.map((item, index) => (
					<Link to={item.link} key={index} className="block p-3 transition rounded-[4px] hover:bg-gradient-to-br from-primary-500 to-fuchsia-900">
						{item.title}
					</Link>
				))}
			</ul>
		</div>
	);
};

export default ProfileModal;
