import React, { useEffect, useState } from "react";
import { Navigate, Outlet, redirect, useLocation } from "react-router-dom";
import { getUserRole } from "../../services/utils";
import useLoading from "../hooks/useLoading";
import { fetchAPI } from "./Fetching";
import toast from "react-hot-toast";

export const IsAdmin = () => {
	const location = useLocation();

	const role = getUserRole();
	if (role != "ADMIN") {
		return (
			<Navigate
				to={"/home"}
				state={{ path: location.pathname, error: "Forbidden Page" }}
			/>
		);
	}

	return <Outlet />;
};

export const IsProdi = () => {
	const location = useLocation();

	const role = getUserRole();
	if (role != "DEPARTMENT") {
		return (
			<Navigate
				to={"/home"}
				state={{ path: location.pathname, error: "Forbidden Page" }}
			/>
		);
	}

	return <Outlet />;
};

export const IsHead = () => {
	const location = useLocation();

	const role = getUserRole();
	if (role != "HEAD") {
		return (
			<Navigate
				to={"/home"}
				state={{ path: location.pathname, error: "Forbidden Page" }}
			/>
		);
	}

	return <Outlet />;
};

export const StepAccept = ({ stepRequire }) => {
	const { setIsLoading } = useLoading();
	const [step, setStep] = useState("");
	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI(`/api/settings`);
			res.data.map((item) => {
				if (item.name == "step_monev") {
					setStep(item.value);
				}
			});
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleLoad();
	}, []);

	if (step) {
		if (step != stepRequire) {
			window.location.href = "/home";
		}
	}

	return <Outlet />;
};
