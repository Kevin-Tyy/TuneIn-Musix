import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import ListBox from "./ListBox";
const Header = ({ children }: { children: React.ReactNode }) => {
	const handleNext = () => {
		window.history.forward();
	};
	const handlePrevious = () => {
		window.history.back();
	};
	return (
		<div className="h-fit bg-gradient-to-b from-primary-300 p-3 rounded-xl">
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
				<div className="">{children}</div>
			</div>
			<div>
				<h1 className="text-white text-3xl font-semibold">Welcome back</h1>
				<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
					<ListBox/>
				</div>
			</div>
		</div>
	);
};

export default Header;
