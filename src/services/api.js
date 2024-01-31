import { getUserUuid, handleApiResponse } from "./utils";

const BASE_URL = "http://localhost:8080/api";
const token = sessionStorage.getItem("token");

export const fetchData = async (endpoint, credential = true, options = {}) => {
	try {
		const response = await fetch(
			`${BASE_URL}/${endpoint}`,
			{
				headers: credential && {
					Authorization: "Bearer " + token,
				},
			},
			options
		);
		return handleApiResponse(response);
	} catch (error) {
		throw error;
	}
};

export const postData = async (endpoint, method, data, credential = true, options = {}) => {
	let headers = {
		"Content-Type": "application/json"
	}

	if(credential){
		headers["Authorization"] = "Bearer " + token
	}


	try {
		const response = await fetch(`${BASE_URL}/${endpoint}`, {
			method: method,
			headers: headers,
			body: JSON.stringify(data),
			...options,
		});
		return handleApiResponse(response);
	} catch (error) {
		throw error;
	}
};
