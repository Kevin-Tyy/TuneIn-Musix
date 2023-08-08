import logo from "../../assets/spotify-xxl.png";
import AuthForm from "./components/AuthForm";

const AuthPage = () => {
	return (
		<main className="min-h-full w-full bg-primary-dark flex justify-center items-center">
			<div className="w-full max-w-[420px] p-3">
				<div className="flex flex-col items-center">
					<img src={logo} alt="aj" className="w-14 h-14" />
					<h2 className="text-2xl text-white text-center  font-bold mt-6 tracking-tight">
						Sign in to your acccount
					</h2>
				</div>
				<AuthForm />
			</div>
		</main>
	);
};

export default AuthPage;
