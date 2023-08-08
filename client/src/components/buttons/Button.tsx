import clsx from "clsx";

interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
	children,
	type,
	onClick,
	disabled,
}) => {
	return (
		<button
			onClick={onClick}
			type={type}
			disabled={disabled}
			className={clsx(
				" ring-1 ring-primary-300/80 text-gray-300  py-3 rounded-md w-full transition bg-primary-300/20 text-sm hover:bg-primary-300/30",
				disabled && 'opacity-50 cursor-not-allowed bg-primary-200'
			)}>
			{children}
		</button>
	);
};

export default Button;
