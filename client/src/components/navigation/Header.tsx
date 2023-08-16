import Navbar from "./navBar";
import BackButtons from "../buttons/BackButtons";
const Header = ({ children }: { children: React.ReactNode }) => {
	const handleNext = () => {
		window.history.forward();
	};
	const handlePrevious = () => {
		window.history.back();
	};

	return (
		<div className="h-fit bg-gradient-to-b from-primary-300 p-3 rounded-xl space-y-2 min-h-96">
			<div className="w-full mb-4 flex items-center justify-between">
				<BackButtons handleNext={handleNext} handlePrevious={handlePrevious} />
				<div>
					<Navbar />
				</div>
			</div>
			<div>{children}</div>
		</div>
	);
};

export default Header;
