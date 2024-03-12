import { getUserRole } from "../../../services/utils";

export const HomeController = () => {
	const role = getUserRole();
	if (role === "ADMIN") {
		window.location.href = "/home/admin";
		return
	}

	if (role === "HEAD") {
		window.location.href = "/home/head";
		return
	}

	window.location.href = "/home/department";
	return;
};
