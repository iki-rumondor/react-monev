import { jwtDecode } from "jwt-decode";

const handleLogout = () => {
	if(sessionStorage.getItem("token")){
		sessionStorage.removeItem("token")
	}
}

export const handleApiResponse = async (response) => {

	if (!response.ok) {
		if (response.status == 401) {
			handleLogout();
		}
		const error = await response.json();
		throw new Error(error.message || "Something went wrong");
	}

	return response.json();
};

export const getUserUuid = () => {
	const token = sessionStorage.getItem("token")
	return jwtDecode(token).uuid
}

export const getUserRole = () => {
	const token = sessionStorage.getItem("token")
	return jwtDecode(token).role
}

