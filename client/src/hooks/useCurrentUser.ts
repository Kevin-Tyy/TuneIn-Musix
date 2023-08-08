import { useSelector } from "react-redux";
import { loggedInUser } from "../redux/slices/AuthSlice";

const useCurrentUser = () => {
	const {
		auth: { user },
	} = useSelector(loggedInUser);
	console.log(user);
	
	return user;
};

export default useCurrentUser