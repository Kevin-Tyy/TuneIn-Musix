import { useNavigate } from "react-router-dom";

type settingsType = {
	name: string;
	onClick?: () => void;
};
interface SettingsModalProps {
	viewEditModal: () => any;
	deletePlaylist: () => any;
	closeModal: (value: any) => void;
	viewShareModal: () => any;
}
const SettingsModal = ({
	viewEditModal,
	deletePlaylist,
	viewShareModal,
	closeModal,
}: SettingsModalProps) => {
	const navigate = useNavigate()
	const settings: settingsType[] = [
		{
			name: "View playlist",
			onClick: function () {
				closeModal(false);
			},
		},
		{ name: "Create a new playlist" , onClick : function () {
			navigate('/playlists')
		}},
		{
			name: "Delete playlist",
			onClick: function () {
				deletePlaylist();
			},
		},
		{
			name: "Edit playlist",
			onClick: function () {
				viewEditModal();
			},
		},
		{
			name: "Share",
			onClick: function () {
				viewShareModal();
			},
		},
		{
			name: "Add more songs",
			onClick: function () {
				closeModal(false);
			},
		},
	];
	return (
		<div className="animate-slideup absolute -right-52 w-[240px] bg-neutral-800 p-1 rounded-md z-50">
			{settings.map((setting, index) => (
				<div
					key={index}
					onClick={setting.onClick}
					className="hover:bg-neutral-700 p-3 rounded-md cursor-pointer">
					{setting.name}
				</div>
			))}
		</div>
	);
};

export default SettingsModal;
