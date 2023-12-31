import Input from "../../../components/inputs/Input";
import { HiOutlineUser, HiOutlineMail, HiOutlineKey } from "react-icons/hi";
import { BsGithub, BsGoogle } from "react-icons/bs";
import Button from "../../../components/buttons/Button";
import AuthSocialButton from "../../../components/buttons/AuthSocialButton";
import { useCallback, useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import axios, { AxiosResponse } from "axios";
import { ApiRoot } from "../../../api/config/apiRoot";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../../redux/slices/Authslice";
import { ClipLoader } from "react-spinners";
const AuthForm = () => {
	const [variant, setVariant] = useState<"LOGIN" | "REGISTER">("LOGIN");
	const [loading, setLoading] = useState<boolean>(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	document.title = variant === "REGISTER" ? "Join TuneIn" : "Sign into TuneIn";

	const toggleVariant = useCallback(() => {
		setVariant(variant === "LOGIN" ? "REGISTER" : "LOGIN");
	}, [variant]);
	const { register, handleSubmit } = useForm<FieldValues>({
		defaultValues: {
			username: variant === "REGISTER" ? "" : undefined,
			email: "",
			password: "",
		},
	});

	//email-password authentication

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setLoading(true);
	
		if (variant === "REGISTER") {
			axios
				.post(`${ApiRoot}/user/register`, data)
				.then((response: AxiosResponse) => {
					toast.success(response.data.msg);
					console.log(response.data.user);

					dispatch(login(response.data.user));
					navigate("/");
				})
				.catch((error) => {
					if (error.response) {
						toast.error(error?.response?.data?.msg);
					} else {
						toast.error("Something went wrong");
					}
				})
				.finally(() => setLoading(false));
		}
		if (variant === "LOGIN") {
			axios
				.post(`${ApiRoot}/auth/signin/email`, data)
				.then((response: AxiosResponse) => {
					toast.success(response.data.msg);
					localStorage.setItem('token', response.data.token);
					dispatch(login(response.data.user));
					navigate("/");
				})
				.catch((error) => {
					if (error.response) {
						toast.error(error?.response?.data?.msg);
					} else {
						toast.error("Something went wrong");
					}
				})
				.finally(() => setLoading(false));
		}
	};

	//oauth
	const socialAction = (action: string) => {
		window.open(`${ApiRoot}/auth/${action}`, "_self");
	};
	useEffect(() => {
		const token = new URLSearchParams(location.search).get("token");
		if (!token) return;

		window.history.replaceState({}, document.title, "/");
		setLoading(true);
		axios
			.get(`${ApiRoot}/user/getuser`, {
				headers: {
					Authorization: token,
				},
			})
			.then((response: AxiosResponse) => {
				toast.success(response.data.msg);
				console.log(response.data.user);

				dispatch(login(response.data.user));
				navigate("/");
			})
			.catch((error) => {
				if (error.response) {
					toast.error(error?.response?.data?.msg);
				} else {
					toast.error("Something went wrong");
				}
			})
			.finally(() => setLoading(false));
	}, []);

	return (
		<div className="mt-8 sm:mx-4 sm:rounded-lg">
			<form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
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
						{loading && <ClipLoader size={20} color="#ffffff" />}
						{!loading && (
							<span>{variant === "LOGIN" ? "Sign in " : "Register"}</span>
						)}
						{loading && "Processing..."}
					</Button>
				</div>
			</form>
			<div className="space-y-8 mt-8">
				<div className="flex items-center">
					<div className="w-full border-t border-gray-500" />
					<div className="w-full flex justify-center">
						<span className="px-2 text-gray-500 text-center whitespace-nowrap">
							Or continue with
						</span>
					</div>
					<div className="w-full border-t border-gray-500" />
				</div>
				<div className="flex gap-2">
					<AuthSocialButton
						disabled={loading}
						icon={BsGithub}
						onClick={() => socialAction("github")}
					/>
					<AuthSocialButton
						disabled={loading}
						icon={BsGoogle}
						onClick={() => socialAction("google")}
					/>
				</div>
			</div>
			<div className="flex gap-2 justify-center  px-2 mt-6 text-gray-500">
				<div className="flex flex-wrap gap-2">
					<span>
						{variant === "LOGIN"
							? "New to messenger?"
							: "Already have an account?"}
					</span>
					<span onClick={toggleVariant} className="underline cursor-pointer">
						{variant === "LOGIN" ? "Create an account" : "Sign in"}
					</span>
				</div>
			</div>
		</div>
	);
};

export default AuthForm;
