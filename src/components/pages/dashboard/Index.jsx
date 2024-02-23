import { Navigate, redirect, useNavigate } from "react-router-dom";
import { getUserRole } from "../../../services/utils";
import { useEffect } from "react";

export const HomeController = () => {
	const role = getUserRole();
	const navigate = useNavigate();

	useEffect(() => {
		if (role === "ADMIN") {
			window.location.href = "/home/admin"
		}
		window.location.href = "/home/department"
	}, []);
	return;
};
