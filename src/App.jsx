import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Loading from "./components/pages/Loading.jsx";
import useLoading from "./components/hooks/useLoading.jsx";
import { LoadingProvider } from "./components/context/LoadingProvider.jsx";
import { AuthProvider } from "./components/context/AuthContext.jsx";
import { Router } from "./Router.jsx";

export default function App() {
	const { isLoading } = useLoading();

	return (
		<AuthProvider>
			<LoadingProvider>
				<Router/>
			</LoadingProvider>
			{isLoading && <Loading />}
			<Toaster position="top-right" reverseOrder={false} />
		</AuthProvider>
	);
}
