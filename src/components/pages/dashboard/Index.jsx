import { Navigate, redirect, useNavigate } from "react-router-dom";
import { getUserRole } from "../../../services/utils";
import { useEffect } from "react";

export const HomeController = () => {
	const role = getUserRole();
	if (role === "ADMIN") {
		window.location.href = "/home/admin";
		return
	}
	window.location.href = "/home/department";
	return;
};
