import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
interface BackButtonProps {
	handlePrevious: () => void;
	handleNext: () => void;
}

const BackButtons = ({ handlePrevious, handleNext }: BackButtonProps) => {
	return (
		<div className="flex items-center space-x-2 h-12 p-4 z-50">
			<div className="group relative">
				<button
					onClick={handlePrevious}
					className="p-1.5 bg-black/80  hover:bg-black rounded-full active:bg-black/80 transition">
					<MdNavigateBefore size={25} />
				</button>

				<div className="bg-neutral-800 absolute -bottom-11 whitespace-nowrap -left-8 p-3 shadow-lg shadow-neutral-950 rounded-md transition duration-150 delay-150 invisible group-hover:visible opacity-0 group-hover:opacity-100">
					Go back
				</div>
			</div>
			<div className="group relative">
				<button
					onClick={handleNext}
					className="p-1.5  bg-black/80 hover:bg-black rounded-full active:bg-black/80 transition">
					<MdNavigateNext size={25} />
				</button>
				<div className="bg-neutral-800 absolute -bottom-10 whitespace-nowrap left-4 p-3 shadow-lg shadow-neutral-900 rounded-md transition duration-150 delay-150 invisible group-hover:visible opacity-0 group-hover:opacity-100">
					Go forward
				</div>
			</div>
		</div>
	);
};

export default BackButtons;
