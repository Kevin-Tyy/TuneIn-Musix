import { useNavigate } from "react-router-dom";
import useAvatar from "../../../../hooks/useAvatar";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { UserType } from "../../../../types";
import { settings } from "../../../../utils/constants";
import ProfileModal from "./ProfileModal";
import { useState, useRef, useEffect } from "react";
import LogoutModal from "./LogoutModal";
const Profile = () => {
	const user: UserType = useCurrentUser();
	const navigate = useNavigate();
	const [isModalOpen, setisModalOpen] = useState(false);
	const [viewLogoutModal, setViewLogoutModal] = useState(false);

	const popUpRef = useRef<HTMLDivElement>(null);

	const handleNavigate = () => {
		navigate("/auth");
	};
	useEffect(() => {
		return () => {
			document.addEventListener("mousedown", handleOutsideModalClick);
		};
	}, []);
	const handleOutsideModalClick = (e: any) => {
		if (popUpRef.current && !popUpRef.current.contains(e.target)) {
			setisModalOpen(false);
		}
	};
	if (!user) {
		return (
			<div className="flex space-x-4">
				<button
					className="bg-transparent transition rounded-full px-5 py-2 text-white whitespace-nowrap hover:ring-1 hover:ring-white"
					onClick={handleNavigate}>
					Sign up
				</button>
				<button
					className="bg-white px-5 py-2 whitespace-nowrap rounded-full text-black"
					onClick={handleNavigate}>
					Login
				</button>
			</div>
		);
	}
	if (user) {
		const placeholderUrl = useAvatar(user.username);
		return (
			<>
				<div className=" bg-black p-1 rounded-full ring-1 ring-black ring-inset flex items-center space-x-7 h-12">
					<div className="cursor-pointer w-10 ">
						<div onClick={() => setisModalOpen(true)} title={user.username}>
							{user?.avatar ? (
								<img src={user.avatar} className="w-10 h-10 object-cover rounded-full" />
							) : (
								<div className="bg-purple-400 hover:bg-purple-500 rounded-full w-10 h-10 flex items-center justify-center text-xl">
									{placeholderUrl}
								</div>
							)}
						</div>
						{isModalOpen && (
							<div ref={popUpRef}>
								<ProfileModal setViewLogoutModal={setViewLogoutModal} />
							</div>
						)}
						<LogoutModal
							isOpen={viewLogoutModal}
							onClose={() => setViewLogoutModal(false)}
						/>
					</div>
				</div>
			</>
		);
	}
};

export default Profile;
