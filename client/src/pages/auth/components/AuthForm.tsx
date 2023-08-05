import Input from "../../../components/inputs/Input";
import { HiOutlineUser, HiOutlineMail, HiOutlineKey } from "react-icons/hi";
import { BsGithub, BsGoogle } from "react-icons/bs";
import Button from "../../../components/buttons/Button";
import AuthSocialButton from "../../../components/buttons/AuthSocialButton";
import { useCallback, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import axios from "axios";
import { ApiRoot } from "../../../api/config/apiRoot";
import { toast } from "react-hot-toast";
const AuthForm = () => {
	const [variant, setVariant] = useState<"LOGIN" | "REGISTER">("LOGIN");
	const [loading, setLoading] = useState<boolean>(false);

	const toggleVariant = useCallback(() => {
		setVariant(variant === "LOGIN" ? "REGISTER" : "LOGIN");
	}, [variant]);
	const { register, handleSubmit } = useForm<FieldValues>({
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setLoading(true);
		if (variant === "REGISTER") {
			axios
				.post(`${ApiRoot}/user/register`, data)
				.then((response) => {
					toast.success(response.data.msg)
				})
				.catch((error) => {
					if(error.response){
						toast.error(error.response.data.msg)
					}else{
						toast.error('Something went wrong')
					}
				})
				.finally(() => setLoading(false));
		}
		if (variant === "LOGIN") {
		}
	};

	return (
		<div className="mt-8 sm:mx-4  sm:rounded-lg">
			<form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
				<Input
					icon={HiOutlineMail}
					placeholder="Email"
					disabled={loading}
					id="email"
					register={register}
				/>
				{variant === "REGISTER" && (
					<Input
						icon={HiOutlineUser}
						placeholder="Username"
						type="text"
						disabled={loading}
						id="username"
						register={register}
					/>
				)}
				<Input
					icon={HiOutlineKey}
					placeholder="Password"
					type="password"
					disabled={loading}
					id="password"
					register={register}
				/>
				<div>
					<Button disabled={loading}>
						{variant === "LOGIN" ? "Sign in " : "Register"}
					</Button>
				</div>
			</form>
			<div className="mt-6">
				<div className="flex items-center">
					<div className="w-full border-t border-gray-500" />
					<div className="w-full flex justify-center text-sm">
						<span className="px-2 text-gray-500 text-sm">Or continue with</span>
					</div>
					<div className="w-full border-t border-gray-500" />
				</div>
				<div className="flex gap-2 mt-6">
					<AuthSocialButton icon={BsGithub} onClick={() => {}} />
					<AuthSocialButton icon={BsGoogle} onClick={() => {}} />
				</div>
			</div>
			<div className="flex gap-2 justify-center text-sm px-2 mt-6 text-gray-500">
				<div>
					{variant === "LOGIN"
						? "New to messenger?"
						: "Already have an account?"}
				</div>
				<div onClick={toggleVariant} className="underline cursor-pointer">
					{variant === "LOGIN"
						? "Create an account"
						: "Login into your account"}
				</div>
			</div>
		</div>
	);
};

export default AuthForm;