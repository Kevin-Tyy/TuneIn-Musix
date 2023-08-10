import useAvatar from "../../../../hooks/useAvatar";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { UserType } from "../../../../types";

const Profile = () => {
	const user: UserType = useCurrentUser();
	const placeholderUrl = useAvatar(user.username);
	return (
		<div className="bg-neutral-900 p-2 rounded-3xl w-full max-w-md">
			<div className="relative cursor-pointer">
				<div className="bg-primary-200 w-10 rounded-full p-0.5" onClick={() => console.log("going to profile")}>
					{user?.avatar ? (
						<img src={user.avatar} className="w-14 rounded-full"/>
					) : (
						<div className="bg-green-400 rounded-full w-10 h-10 flex items-center justify-center text-xl">
							{placeholderUrl}
						</div>
					)}
				</div>
				<div className="absolute inset-0 w-10 h-10 rounded-full transition bg-white opacity-0 hover:opacity-10"></div>
			</div>
		</div>
	);
};

export default Profile;
