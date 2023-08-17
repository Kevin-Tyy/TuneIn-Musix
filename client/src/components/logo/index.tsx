import clsx from "clsx";
import logo from "../../assets/spotify-xxl.png";

const Logo = ({
	isExpanded,
	handleToggle,
}: {
	isExpanded: boolean;
	handleToggle: () => void;
}) => {
	return (
		<div className={`flex items-center cursor-pointer ${isExpanded && 'pl-4'} gap-3`} onClick={handleToggle}>
			<img src={logo} alt="logo" className="w-7 h-7" />
			<p
				className={clsx(
					"text-xl -tracking-[1px] text-white whitespace-nowrap overflow-hidden transition-all duration-500",
					isExpanded ? "w-20" : "w-0"
				)}>
				Tune In
			</p>
		</div>
	);
};

export default Logo;
