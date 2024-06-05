import { jwtDecode } from "jwt-decode";
import { handleLogout } from "./UnauthHandler";
import { redirect } from "react-router-dom";

export const handleApiResponse = async (response) => {

	if (!response.ok) {
		if (response.status == 401) {
			handleLogout()
		}
		const error = await response.json();
		throw new Error(error.message || "Something went wrong");
	}

	return response.json();
};

export const getUserUuid = () => {
	const token = sessionStorage.getItem("token")
	if (token == null){
		redirect("/login")
	}
	return jwtDecode(token).uuid
}

export const getUserRole = () => {
	const token = sessionStorage.getItem("token")
	if (token == null){
		redirect("/login")
	}
	return jwtDecode(token).role
}

