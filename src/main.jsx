import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LoadingProvider } from "./components/context/LoadingProvider";
// import "rsuite/dist/rsuite.min.css";
// import { CustomProvider } from "rsuite";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
			<LoadingProvider>
				<App></App>
			</LoadingProvider>
		{/* <CustomProvider>
		</CustomProvider> */}
	</React.StrictMode>
);
