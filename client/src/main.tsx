import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ToasterContext from "./context/ToastContext.tsx";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<PersistGate persistor={persistor}>
					<ToasterContext>
						<App />
					</ToasterContext>
				</PersistGate>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
