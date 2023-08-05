import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ToasterContext from "./context/ToastContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<ToasterContext>
				<App />
			</ToasterContext>
		</BrowserRouter>
	</React.StrictMode>
);
