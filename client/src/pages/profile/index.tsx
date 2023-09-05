import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/navigation/Header";
import { useEffect, useState } from "react";
import moment from "moment";
import { fetchServerRequest } from "../../api/func/fetchHeaders";
import { toast } from "react-hot-toast";
import { PlaylistItem, UserType } from "../../types";
import { PuffLoader } from "react-spinners";
import useAvatar from "../../hooks/useAvatar";
import axios from "axios";
import { ApiRoot } from "../../api/config/apiRoot";
import PlaylistBox from "../playlists/components/PlaylistBox";
import PlaylistModal from "../playlists/components/modal";
import { TfiMusicAlt } from "react-icons/tfi";
import EditModal from "./components/EditModal";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../redux/slices/Authslice";
import { BiEdit, BiPencil } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
const ProfilePage: React.FC = () => {
	const {
		user: { _id },
	} = useSelector(loggedInUser);
	const { username } = useParams();
	const [userData, setUserData] = useState<UserType | null>(null);
	const [userPlaylists, setUserPlaylists] = useState<PlaylistItem[] | null>(
		null
	);
	const [loading, setLoading] = useState(false);
	const [isModalOpen, setisModalOpen] = useState(false);
	const [editModal, setEditModal] = useState(false);

	//function to fetch user's playlists
	const fetchPlaylists = () => {
		if (!userData) return;
		setLoading(true);
		axios
			.get(`${ApiRoot}/playlist/${userData?._id}`)
			.then((response) => {
				setUserPlaylists(response.data);
			})
			.catch((err) => {
				toast.error("Network Error");
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};
	const navigate = useNavigate();
	// refetch the user
	const fetchProfile = (username: string) => {
		navigate(`/profile/${username}`);
	};

	useEffect(() => {
		//fetch user data on name param change...
		setLoading(true);
		fetchServerRequest(`user/profile/${username}`)
			.then((response) => {
				if (response.status === 200) {
					setUserData(response.data?.user);
				}
			})
			.catch((error) => {
				if (error?.response?.status === (403 || 401)) {
					toast.error("Please login again");
				} else {
					toast.error("Something went wrong");
				}
			})
			.finally(() => {
				setLoading(false);
			});
	}, [username]);

	//invoke fetch user playlists on page load...
	useEffect(() => {
		fetchPlaylists();
	}, [userData]);

	if (loading) {
		return (
			<div className="min-h-[50vh] h-full w-full grid place-content-center">
				<PuffLoader color="white" />
			</div>
		);
	}
	if (!userData) {
		return (
			<div>
				<h1>No user found</h1>
			</div>
		);
	}
	const avatar = useAvatar(userData?.username!);
	return (
		<div>
			<Header>
				<div className="flex items-center space-x-5">
					<div className="relative group">
						{userData?.avatar ? (
							<img
								src={userData?.avatar}
								className="h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44 object-cover"
							/>
						) : (
							<div className="h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44 bg-gradient-to-br from-purple-700 to-fuchsia-200 grid place-content-center text-3xl sm:text-4xl md:text-6xl font-semibold select-none rounded-full">
								{avatar}
							</div>
						)}
						{userData?._id === _id && (
							<div
								onClick={() => setEditModal(true)}
								className="h-28 w-28 sm:h-36 sm:w-36 md:h-44 md:w-44 absolute inset-0 bg-black opacity-0 group-hover:bg-black/40 group-hover:opacity-100 z-10 flex flex-col items-center justify-center text-white cursor-pointer transition">
								<BiPencil size={35} />
								<p className="text-sm">Edit Profile</p>
							</div>
						)}
					</div>
					<div className="space-y-3">
						<h1 className="text-3xl sm:text-4xl md:text-6xl font-black select-none">
							{userData?.username}
						</h1>
						<div>
							<p className="text-lg">{userData?.email}</p>
							{userData?.createdAt && (
								<p className="text-sm text-gray-500">
									Joined {moment(userData?.createdAt).fromNow()}
								</p>
							)}
						</div>

						{userData?._id === _id && (
							<button
								className="transition hover:scale-105"
								onClick={() => setEditModal(true)}>
								<FiEdit />
							</button>
						)}
					</div>
				</div>
			</Header>
			<div className="mt-10">
				{userPlaylists?.length ? (
					<div className="space-y-6">
						<h1>
							{userData?._id === _id ? "Your" : userData?.username + "'s"}{" "}
							playlists
						</h1>
						<div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
							{userPlaylists.map((playlist, index) => (
								<PlaylistBox item={playlist} key={index} />
							))}
						</div>
					</div>
				) : (
					<div className="min-h-[50vh] grid place-content-center">
						<div className="flex flex-col justify-center items-center h-96 gap-3">
							<TfiMusicAlt size={50} />
							<h1 className="text-lg select-none">
								You have no playlists yet !
							</h1>
							<button
								className="bg-gradient-to-br  from-primary-400 via-purple-600 to-pink-400 py-3 px-6 rounded-full hover:bg-primary-300 transition hover:scale-105"
								onClick={() => setisModalOpen(true)}>
								Create one
							</button>
						</div>{" "}
					</div>
				)}
				<PlaylistModal
					onClose={() => setisModalOpen(false)}
					isOpen={isModalOpen}
					fetchPlaylists={fetchPlaylists}
				/>
				<EditModal
					onClose={() => setEditModal(false)}
					isOpen={editModal}
					userData={userData!}
					fetchUser={fetchProfile}
				/>
			</div>
		</div>
	);
};

export default ProfilePage;
