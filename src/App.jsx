import React from "react";
import { Toaster } from "react-hot-toast";
import Loading from "./components/pages/Loading.jsx";
import useLoading from "./components/hooks/useLoading.jsx";
import Prodi from "./components/pages/prodi/Prodi.jsx";

export default function App() {
	const { isLoading } = useLoading();
	return (
		<>
			<Prodi></Prodi>
			{isLoading && <Loading/>}
			<Toaster position="top-right" reverseOrder={false} />
		</>
	);
}
