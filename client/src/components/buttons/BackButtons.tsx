import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
interface BackButtonProps {
	handlePrevious: () => void;
	handleNext: () => void;
}
const BackButtons = ({ handlePrevious, handleNext }: BackButtonProps) => {
	return (
		<div className="hidden md:flex items-center space-x-2 h-12">
			<button
				onClick={handlePrevious}
				className="p-1.5 bg-black   hover:bg-black/50 rounded-full active:bg-black/20 active:ring-1 active:ring-fuchsia-700 transition">
				<MdNavigateBefore size={25} />
			</button>
			<button
				onClick={handleNext}
				className="p-1.5  bg-black hover:bg-black/50 rounded-full active:bg-black/20 active:ring-1 active:ring-fuchsia-700 transition">
				<MdNavigateNext size={25} />
			</button>
		</div>
	);
};

export default BackButtons;
