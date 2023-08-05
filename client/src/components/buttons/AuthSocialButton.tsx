import React from "react";
import { IconType } from "react-icons";
interface AuthSocialButtonProps {
	icon: IconType;
	onClick: () => void;
}
const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
	icon: Icon,
	onClick,
}) => {
	return (
		<button className="inline-flex w-full justify-center py-3 ring-1 ring-inset ring-gray-800 bg-gray-500/10 text-gray-300 rounded-md hover:bg-gray-600/20 transition" onClick={onClick}>
			<Icon size={18}/>
		</button>
	);
};

export default AuthSocialButton;
