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
						fontSize: "14px",
						padding : '13px',
					},
				}}
			/>
			{children}
		</Fragment>
	);
};

export default ToasterContext;
