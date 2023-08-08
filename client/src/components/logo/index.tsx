import logo from "../../assets/spotify-xxl.png";
import { Link } from "react-router-dom";

const Logo = () => {
	return (
		<Link to="/">
			<div className="flex items-center justify-center gap-3">
				<img src={logo} alt="aj" className="w-10 h-10" />
				<p className="text-xl -tracking-[1px] text-white">Tune In</p>
			</div>
		</Link>
	);
};

export default Logo;
