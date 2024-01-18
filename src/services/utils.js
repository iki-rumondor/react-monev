import { jwtDecode } from "jwt-decode";

export const handleApiResponse = async (response) => {
	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.message || "Something went wrong");
	}

	return response.json();
};

export const getUserUuid = () => {
	const token = localStorage.getItem("token")
	return jwtDecode(token).uuid
}

export const getUserRole = () => {
	const token = localStorage.getItem("token")
	return jwtDecode(token).role
}

