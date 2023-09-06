import { useSelector } from "react-redux";
import { loggedInUser } from "../../../../redux/slices/Authslice";
import { useNavigate } from "react-router-dom";

type ProfileModalProps = {
	setViewLogoutModal: (value: any) => void;
};
const ProfileModal: React.FC<ProfileModalProps> = ({ setViewLogoutModal }) => {
	const navigate = useNavigate();
	const {
		user: { username },
	} = useSelector(loggedInUser);
	const settings = [
		{
			title: "Profile",
			onClick: function () {
				navigate(`/profile/${username}`);
			},
		},
		{
			title: "Your playlists",
			onClick: function () {
				navigate("/playlists");
			},
		},
		{ title: "Your activity" },
		{
			title: "Logout",
			onClick: function () {
				setViewLogoutModal(true);
			},
		},
	];
	return (
		<>
			<div className="absolute min-w-[250px] right-0 overflow-hidden rounded-lg animate-slideup bg-neutral-800 p-1 text-left shadow-xl transition-all w-full my-5 sm:w-full sm:max-w-sm">
				<ul className="space-y-2">
					{settings.map((item, index) => (
						<li
							key={index}
							onClick={item.onClick}
							className="block hover:bg-neutral-700 p-3 rounded-md cursor-pointer">
							{item.title}
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default ProfileModal;
