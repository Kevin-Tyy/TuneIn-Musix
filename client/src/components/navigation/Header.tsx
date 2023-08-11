import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import ListBox from "./ListBox";
import { BsHeart } from "react-icons/bs";
import { useLocation } from "react-router-dom";

const Header = ({ children }: { children: React.ReactNode }) => {
	const location = useLocation();

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
				<div className="">{children}</div>
			</div>
			{location.pathname === "/search" && (
				<div className="h-16 flex items-end">
					<h1 className="text-xl">Browse your favorite music</h1>
				</div>
			)}
			{location.pathname === "/" && (
				<div className="space-y-10">
					<h1 className="text-white text-3xl font-semibold">Welcome back</h1>
					<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
						{Array(6)
							.fill(null)
							.map((_, index) => (
								<ListBox name="Liked songs" icon={BsHeart} key={index} />
							))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Header;
