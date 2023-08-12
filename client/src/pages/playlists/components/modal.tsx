import { TfiMusicAlt } from "react-icons/tfi";
import Modal from "../../../components/modals/modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { BiPencil } from "react-icons/bi";
import axios, { AxiosResponse } from "axios";
import { ApiRoot } from "../../../api/config/apiRoot";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../../redux/slices/Authslice";
import clsx from "clsx";
import { ClipLoader } from "react-spinners";
const PlaylistModal = ({ onClose, isOpen }: any) => {
	const [loading, setLoading] = useState(false);
	const [previewImage, setPreviewImage] = useState<any>(null);
	const {
		user: { _id },
	} = useSelector(loggedInUser);
	const { register, handleSubmit, watch, setValue } = useForm<FieldValues>({
		defaultValues: {
			playlistName: "",
			playlistDescription: "",
		},
	});
	const selectedImage = watch("image");
	const handleImageUpload = (e: any) => {
		const file = e.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			const result = reader.result;
			setPreviewImage(result);
			setValue("image", result);
		};
	};
	const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
		setLoading(true);
		axios
			.post(`${ApiRoot}/playlist/create`, { ...data, userId: _id })
			.then((response: AxiosResponse) => {
				toast.success(response.data.msg);
			})
			.catch((error) => {
				if (error.response) {
					toast.error(error?.response?.data?.msg);
				} else {
					toast.error("Something went wrong");
				}
			})
			.finally(() => setLoading(false));
	};
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="space-y-4">
				<div className="border-b border-gray-700 pb-3">
					<h1 className="text-xl text-white text-center">Create a playlist</h1>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className="">
					<div className="flex gap-4">
						<label htmlFor="image" className="h-44 w-44 group relative">
							{selectedImage && previewImage ? (
								<img
									src={previewImage}
									className="h-44 w-44 object-cover ring-1 ring-gray-800 rounded-sm"
								/>
							) : (
								<div className="h-44 w-44 bg-gradient-to-br from-purple-700 to-gray-500 shadow flex items-center justify-center">
									<TfiMusicAlt size={40} className="text-white" />
								</div>
							)}
							<div className="absolute inset-0 bg-black opacity-0 group-hover:bg-black/70 group-hover:opacity-100 z-10 flex flex-col items-center justify-center text-white cursor-pointer transition">
								<BiPencil size={35} />
								<p className="text-sm">
									{previewImage ? "Change" : "Choose"} photo
								</p>
							</div>
						</label>
						<input
							type="file"
							id="image"
							className="hidden"
							onChange={handleImageUpload}
							disabled={loading}
						/>
						<div className="flex-1 space-y-3 flex flex-col items-end">
							<input
								placeholder="Placeholder name"
								id="playlistName"
								{...register("playlistName")}
								disabled={loading}
								type="text"
								className={clsx(
									"bg-gray-900 text-xs w-full p-3 text-white outline-none rounded-md focus:ring-1 focus:ring-inset focus:ring-gray-700",
									loading && "opacity-60"
								)}
							/>
							<textarea
								className={clsx(
									"h-32 resize-none bg-gray-900 w-full p-3 text-white outline-none rounded-md focus:ring-1 focus:ring-inset focus:ring-gray-700 text-xs",
									loading && "opacity-60"
								)}
								{...register("playlistDescription")}
								disabled={loading}
								placeholder="Add an optional dscription"></textarea>
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

export default PlaylistModal;
