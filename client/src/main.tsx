import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ToasterContext from "./context/ToastContext.tsx";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { SkeletonTheme } from "react-loading-skeleton";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<PersistGate persistor={persistor}>
					<SkeletonTheme baseColor="#1d1d2e" highlightColor="#2a2a3d">
						<ToasterContext>
							<App />
						</ToasterContext>
					</SkeletonTheme>
				</PersistGate>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
