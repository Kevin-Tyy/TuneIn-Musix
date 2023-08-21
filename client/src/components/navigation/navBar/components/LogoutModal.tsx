import React, { useState } from "react";
import Modal from "../../../modals/modal";
// import axios from "axios";
// import { ApiRoot } from "../../../../api/config/apiRoot";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/slices/Authslice";
interface LogoutModalProps {
	isOpen: boolean;
	onClose: () => void;
}
const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose }) => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleSubmit = (e: any) => {
		e.preventDefault();
		setLoading(true);
		// axios
		// 	.post(`${ApiRoot}/user/logout`)
		// 	.then(() => {
		// 		navigate("/");
		// 	})
		// 	.catch((err) => toast.error(err.response.data.msg))
		// 	.finally(() => setLoading(false));
		setTimeout(() => {
			setLoading(false);
			dispatch(logout());
			navigate("/");
			toast.success("Logged out");
		}, 2000);
	};
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="flex flex-col items-center space-y-10">
				<p className="text-white text-center">
					Are you sure you want to logout from tuneIn? You can always login back
					to your account on any device
				</p>
				<form onSubmit={handleSubmit} className="flex  gap-4">
					<button
						disabled={loading}
						type="submit"
						className={clsx(
							"text-red-600 ring-1 w-24 py-2 ring-red-700 rounded-full hover:bg-red-700/10",
							loading && "opacity-50"
						)}>
						{loading ? <ClipLoader size={20} color="white" /> : "Logout"}
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

export default LogoutModal;
