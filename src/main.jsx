import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LoadingProvider } from "./components/context/LoadingProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<LoadingProvider>
			<App></App>
		</LoadingProvider>
	</React.StrictMode>
);
