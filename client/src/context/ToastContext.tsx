import { Toaster } from "react-hot-toast";
import { Fragment, ReactNode, FC } from "react";
type ToastContextProps = {
	children: ReactNode;
};
const ToasterContext: FC<ToastContextProps> = ({ children }) => {
	return (
		<Fragment>
			<Toaster
				toastOptions={{
					style: {
						backgroundColor: "#340F5F2d",
						border: "1px solid #340F5F",
						color: "white",
						fontSize: "14px",
					},
				}}
			/>
			{children}
		</Fragment>
	);
};

export default ToasterContext;
