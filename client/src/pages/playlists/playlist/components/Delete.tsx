import axios from "axios";
import Modal from "../../../../components/modals/modal";
import { ApiRoot } from "../../../../api/config/apiRoot";
import { toast } from "react-hot-toast";
import { useState } from "react";
import clsx from "clsx";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
interface DeleteModalProps {
	isOpen: boolean;
	onClose: () => void;
	playlistId: string;
}
const Delete: React.FC<DeleteModalProps> = ({
	isOpen,
	onClose,
	playlistId,
}) => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false);
	const handleSubmit = (e: any) => {
		e.preventDefault();
		axios
			.delete(`${ApiRoot}/playlist/single/${playlistId}`)
			.then((response) => {
				toast.success(response.data.msg);
				navigate('/playlists');
			})
			.catch((err) => toast.error(err.response.data.msg))
			.finally(() => setLoading(false));
	};
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="flex flex-col items-center space-y-10">
				<p className="text-white">
					Are you sure you want to delete this playlist
				</p>
				<form onSubmit={handleSubmit} className="flex  gap-4">
					<button
						disabled={loading}
						type="submit"
						className={clsx(
							"text-red-600 ring-1 px-6 py-2 ring-red-700 rounded-full hover:bg-red-700/10",
							loading && "opacity-50"
						)}>
						{loading ? <ClipLoader size={20} color="white"/> : "Delete"}
					</button>
					<div
						onClick={onClose}
						className="button cursor-pointer px-6 py-2 rounded-full">
						Cancel
					</div>
				</form>
			</div>
		</Modal>
	);
};

export default Delete;
