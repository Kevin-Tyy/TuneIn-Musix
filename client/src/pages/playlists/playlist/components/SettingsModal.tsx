
type settingsType = {
	name: string;
	onClick?: () => void;
};
interface SettingsModalProps {
	viewEditModal: () => any;
	deletePlaylist: () => any;
}
const SettingsModal = ({
	viewEditModal,
	deletePlaylist,
}: SettingsModalProps) => {
	const settings: settingsType[] = [
		{ name: "View playlist" },
		{ name: "Create a new playlist" },
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
		{ name: "Share" },
		{ name: "Add more songs" },
	];
	return (
		<div className="animate-slideup absolute -right-52 w-[240px] bg-neutral-800 p-1 rounded-md">
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
