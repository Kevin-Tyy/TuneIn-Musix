import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import Navbar from "./navBar";
const Header = ({ children }: { children: React.ReactNode }) => {
	const handleNext = () => {
		window.history.forward();
	};
	const handlePrevious = () => {
		window.history.back();
	};

	return (
		<div className="h-fit bg-gradient-to-b from-primary-300 p-3 rounded-xl space-y-6 min-h-96">
			<div className="w-full mb-4 flex items-center justify-between">
				<div className="hidden md:flex items-center space-x-2 h-12">
					<button
						onClick={handlePrevious}
						className="p-1 bg-black   hover:bg-white/10 rounded-full active:bg-white/20">
						<MdNavigateBefore size={25} />
					</button>
					<button
						onClick={handleNext}
						className="p-1  bg-black hover:bg-black/50 rounded-full active:bg-white/20">
						<MdNavigateNext size={25} />
					</button>
				</div>
				<div>
					<Navbar />
				</div>
			</div>
			<div>{children}</div>
		</div>
	);
};

export default Header;
