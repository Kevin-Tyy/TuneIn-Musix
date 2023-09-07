import { BiMusic } from "react-icons/bi";

interface Props {
	id: string;
	title: string;
}
const Track = ({ id, title }: Props) => {
	const handleDragStart = (e: any) => {
		const obj = {
			id: id,
			title: title,
		};
		e.dataTransfer.setData("track", JSON.stringify(obj));
		console.log("Drag started");

	};
	return (
		<div
			className="bg-neutral-700 my-4 p-2 flex  items-center cursor-pointer"
			draggable="true"
			onDragStart={handleDragStart}>
			<BiMusic size={20} />
			{title}
		</div>
	);
};

export default Track;
