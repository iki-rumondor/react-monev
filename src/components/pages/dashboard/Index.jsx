import { getUserRole } from "../../../services/utils";
import { AdminDashboard } from "./Admin";
import { ProdiDashboard } from "./Prodi";

export const HomeController = () => {
	const role = getUserRole();
	if (role === "ADMIN") {
		return <AdminDashboard role={role}/>;
	}

	return <ProdiDashboard role={role}/>;
};
