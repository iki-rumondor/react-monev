import { Navigate } from "react-router-dom";

export default function Logout() {
	sessionStorage.removeItem("token");
	sessionStorage.removeItem("login_time");
	return <Navigate to="/" replace />;
}
