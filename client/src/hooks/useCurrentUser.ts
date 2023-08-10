import { useSelector } from "react-redux";
import { loggedInUser } from "../redux/slices/Authslice";

const useCurrentUser = () => {
	const { user } = useSelector(loggedInUser);
	console.log(user);

	return user;
};

export default useCurrentUser;
