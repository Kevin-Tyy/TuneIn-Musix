import { TfiMusicAlt } from "react-icons/tfi";
import Modal from "../../../components/modals/modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { BiPencil } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser, login } from "../../../redux/slices/Authslice";
import clsx from "clsx";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../../types";
import {
	fetchServerRequest,
	updateServerRequest,
} from "../../../api/func/fetchHeaders";
interface Props {
	onClose: () => void;
	isOpen: boolean;
	fetchUser: (username: string) => void;
	userData: UserType;
}
const EditModal = ({ onClose, isOpen, fetchUser, userData }: Props) => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [previewImage, setPreviewImage] = useState<any>(null);
	const { user } = useSelector(loggedInUser);
	const { _id, username, avatar } = user;
	const { register, handleSubmit, watch, setValue } = useForm<FieldValues>({
		defaultValues: {
			username: username,
			avatar: avatar,
		},
	});
	if (!user) {
		return (
			<Modal isOpen={isOpen} onClose={onClose}>
				<div className="space-y-6 flex flex-col justify-center">
					<div className="border-b border-gray-700 pb-3">
						<h1 className="text-xl text-white text-center">
							Edit your profile
						</h1>
					</div>
					<p className="text-white text-center">
						Please login to create a playlist
					</p>
					<button
						className="bg-white px-4 py-2 rounded-full text-sm self-end"
						onClick={() => navigate("/auth")}>
						Login Here
					</button>
				</div>
			</Modal>
		);
	}
	const dispatch = useDispatch();
	const selectedImage = watch("avatar");
	const handleImageUpload = (e: any) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			const result = reader.result;
			setPreviewImage(result);
			setValue("avatar", result);
		};
	};
	const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
		setLoading(true);
		updateServerRequest(`user/profile/${_id}`, {
			...data,
		})
			.then(() => {
				fetchServerRequest(`/user/getUser`).then((response) => {
					console.log(response.data.user);
					fetchUser(response?.data?.user?.username);
					dispatch(login(response.data?.user));
				});
			})
			.catch((error) => {
				if (error.response) {
					toast.error(error?.response?.data?.msg);
				} else {
					toast.error("Something went wrong");
				}
			})
			.finally(() => {
				setLoading(false);
			});
	};
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="space-y-4 relative">
				<div className="border-b border-gray-700 pb-3">
					<h1 className="text-xl text-white text-center"> Edit your profile</h1>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className="">
					<div className="flex flex-col items-center gap-4 w-full">
						<div className="bg-gray-800 absolute -top-32 p-1 rounded-full">
							<div className="bg-black rounded-full p-1.5">
								<label htmlFor="image" className="h-44 w-44 group relative">
									{userData?.avatar ? (
										<img
											src={previewImage || userData?.avatar}
											className="h-44 w-44 object-cover ring-1 ring-gray-800 rounded-full"
										/>
									) : selectedImage && previewImage ? (
										<img
											src={previewImage}
											className="h-44 w-44 object-cover ring-1 ring-gray-800 rounded-full"
										/>
									) : (
										<div className="h-44 w-44 bg-gradient-to-br from-purple-700 to-gray-500 shadow rounded-full flex items-center justify-center">
											<TfiMusicAlt size={40} className="text-white" />
										</div>
									)}
									<div className="absolute inset-0 bg-black opacity-0 group-hover:bg-black/70 group-hover:opacity-100 z-10 flex flex-col items-center justify-center text-white cursor-pointer rounded-full transition">
										<BiPencil size={35} />
										<p className="text-sm">
											{previewImage ? "Change" : "Choose"} photo
										</p>
									</div>
								</label>
							</div>
						</div>
						<input
							type="file"
							id="image"
							className="hidden"
							accept="image/*"
							onChange={handleImageUpload}
							disabled={loading}
						/>
						<div className="flex-1 space-y-3 pt-10 flex flex-col items-end w-full">
							<h1 className="text-white text-sm self-start">Change your username</h1>
							<input
								placeholder="Username (optional)"
								id="username"
								{...register("username")}
								disabled={loading}
								type="text"
								className={clsx(
									"bg-gray-900 text-sm w-full p-3 text-white outline-none rounded-md focus:ring-1 focus:ring-inset focus:ring-gray-700",
									loading && "opacity-60"
								)}
							/>

							<button
								disabled={loading}
								type="submit"
								className={clsx(
									"button text-black w-28 py-3 rounded-full text-sm font-bold flex justify-center items-center",
									loading && "opacity-60"
								)}>
								{loading ? <ClipLoader size={20} /> : "Save"}
							</button>
						</div>
					</div>
				</form>
				<p className="text-[10px] text-gray-400">
					By proceeding, you agree to give TuneIn access to the image you choose
					to upload. Please make sure you have the right to upload the image.
				</p>
			</div>
		</Modal>
	);
};

export default EditModal;
