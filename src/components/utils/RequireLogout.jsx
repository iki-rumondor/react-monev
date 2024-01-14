import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const RequireLogout = () => {
	const location = useLocation();

	const token = localStorage.getItem("token");
	if (token != null) {
		return (
			<Navigate
				to={"/"}
				state={{ path: location.pathname, error: "Silahkan Logout Terlebih Dahulu" }}
			/>
		);
	}

	return <Outlet />;
};
