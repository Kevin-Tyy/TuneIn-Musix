import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MdClose } from "react-icons/md";

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
				<div className="absolute right-0 overflow-hidden rounded-lg bg-white px-4  pb-4  pt-5 text-left shadow-xl transition-all w-full sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
					<button onClick={onClose}>
						<MdClose />
					</button>
					<ul className="name is-open">
						<li>hi</li>
						<li>hi</li>
						<li>hi</li>
						<li>hi</li>
						<li>hi</li>
						<li>hi</li>
						<li>hi</li>
					</ul>
				</div>
			</Transition.Child>
		</Transition.Root>
	);
};

export default ProfileModal;
