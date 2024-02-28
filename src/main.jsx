import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LoadingProvider } from "./components/context/LoadingProvider";
// import "jquery";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import './assets/css/style.css';
// import './assets/css/components.css';
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
