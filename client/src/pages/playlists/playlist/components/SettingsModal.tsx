import { Transition } from "@headlessui/react";

type settingsType = {
	name: string;
    onClick ?: () => void;
};
const settings: settingsType[] = [
	{ name: "View playlist" },
	{ name: "Create a new playlist" },
	{ name: "Delete playlist" },
	{ name: "Edit playlist" },
	{ name: "Share" },
	{ name: "Add more songs" },
];
const SettingsModal = ({ show} : { show : boolean}) => {
	return (
		<Transition
			show={show}
			enter="transition-opacity duration-300"
			enterFrom="opacity-0"
			enterTo="opacity-100"
			leave="transition-opacity duration-300"
			leaveFrom="opacity-100"
			leaveTo="opacity-0">
			<div className="absolute -right-52 w-[240px] bg-neutral-800 p-1 rounded-md">
				{settings.map((setting, index) => (
					<div
						key={index}
                        onClick={setting.onClick}
						className="hover:bg-neutral-700 p-3 rounded-md cursor-pointer">
						{setting.name}
					</div>
				))}
			</div>
		</Transition>
	);
};

export default SettingsModal;
