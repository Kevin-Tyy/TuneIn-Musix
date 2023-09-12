import { LoaderIcon } from "react-hot-toast";

const Fallback = () => {
	return (
		<div className="w-full min-h-[80vh] grid place-content-center">
			<LoaderIcon style={{ width: 50, height: 50, borderWidth: 3 }} />
		</div>
	);
};

export default Fallback;
