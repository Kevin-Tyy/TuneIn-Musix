import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MdClose } from "react-icons/md";

const settings = [
	{ title: "Profile", link: "#" },
	{ title: "Your playlists", link: "#" },
	{ title: "Your activity", link: "#" },
	{ title: "Logout", link: "#" },
];
const ProfileModal = ({ isOpen, onClose }: any) => {
	return (
		<Transition.Root show={isOpen} as={Fragment}>
			<Transition.Child
				as={Fragment}
				enter="ease-out duration-300"
				enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
				enterTo="opacity-100 translate-y-0 sm:scale-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100 translate-y-0 sm:scale-100"
				leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
				<div className="absolute right-0 overflow-hidden rounded-lg  bg-primary-dark px-1  pb-4  pt-5 text-left shadow-xl transition-all w-full sm:my-5 sm:w-full sm:max-w-lg">
					<button onClick={onClose} className="absolute top-1 right-1 p-1 rounded-md text-gray-400 hover:bg-gray-600 hover:text-white transition">
						<MdClose size={25}/>
					</button>
					<ul className="space-y-2 mt-2">
						{settings.map((item, index) => (
							<li key={index} className="p-2 hover:bg-primary-500">{item.title}</li>
						))}
					</ul>
				</div>
			</Transition.Child>
		</Transition.Root>
	);
};

export default ProfileModal;
