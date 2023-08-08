import { IconType } from "react-icons";
import { FC } from "react";
import clsx from "clsx";
import { UseFormRegister, FieldValues } from "react-hook-form";
interface InputProps {
	icon: IconType;
	placeholder: string;
	type?: "text" | "password";
	disabled?: boolean;
	register: UseFormRegister<FieldValues>;
	id: string;
}
const Input: FC<InputProps> = ({
	icon: Icon,
	type,
	placeholder,
	disabled,
	id,
	register,
}) => {
	return (
		<div
			className={clsx(
				"flex w-full ring-1 ring-inset ring-gray-700 rounded-lg items-center gap-3 p-3 transition focus-within:bg-gray-600/20 hover:bg-gray-600/20",
				disabled && "opacity-50"
			)}>
			<Icon size={22} color="white" />
			<input
				disabled={disabled}
				type={type}
				placeholder={placeholder}
				className={clsx(
					"bg-transparent outline-none text-white text-sm placeholder:text-gray-500 w-full"
				)}
				{...register(id)}
			/>
		</div>
	);
};

export default Input;
