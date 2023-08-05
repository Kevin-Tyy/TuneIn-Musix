import clsx from "clsx";
import React from "react";
import { IconType } from "react-icons";
interface AuthSocialButtonProps {
	icon: IconType;
	onClick: () => void;
	disabled?: boolean;
}
const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
	icon: Icon,
	onClick,
	disabled,
}) => {
	return (
		<button
			className={clsx(
				" inline-flex w-full justify-center py-3 ring-1 ring-inset ring-gray-800 bg-gray-500/10 text-gray-300 rounded-md hover:bg-gray-600/20 transition",
				disabled && 'opacity-50'
			)}
			onClick={onClick}
			disabled={disabled}>
			<Icon size={18} />
		</button>
	);
};

export default AuthSocialButton;
