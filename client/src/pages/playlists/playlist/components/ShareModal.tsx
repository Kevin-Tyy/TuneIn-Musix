import {
	FaFacebook,
	FaLinkedin,
	FaReddit,
	FaTwitter,
	FaWhatsapp,
} from "react-icons/fa";
import Modal from "../../../../components/modals/modal";
import { BiCopy } from "react-icons/bi";
interface ShareModalProps {
	isOpen: boolean;
	onClose: () => void;
}
import logo from "../../../../assets/spotify-xxl.png";
const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="flex flex-col gap-10 items-center">
				<div className="flex items-center space-x-4">
					<img src={logo} alt="Logo" className="w-14" />
                    <p className="font-mono text-white text-2xl">tuneIn</p>
				</div>
				<div className="flex w-full flex-col gap-6 items-center">
					<p className="text-white">
						Share a link to this playlist to your friends and family
					</p>
					<div className="p-1 bg-gray-900 rounded-md flex items-center w-full  justify-between">
						<code className="text-orange-600 pl-2">hello world</code>
						<button className="p-2 hover:bg-gray-800 rounded-md cursor-pointer text-white group relative">
							<BiCopy />
							<div className="absolute top-10 bg-gray-700 p-1.5 rounded-md right-0 whitespace-nowrap z-50  invisible scale-75 transition-all duration-300 group-hover:visible group-hover:scale-100 opacity-0 group-hover:opacity-100">
								<p className="text-xs">Copy to clip board</p>
							</div>
						</button>
					</div>
					<div className="text-white flex w-full items-center justify-center text-3xl pt-6 gap-4 border-t border-gray-600">
						<FaFacebook />
						<FaWhatsapp />
						<FaLinkedin />
						<FaTwitter />
						<FaReddit />
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default ShareModal;
