import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getUserRole } from '../../services/utils';

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
}

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
}
