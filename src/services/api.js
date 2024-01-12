import { handleApiResponse } from "./utils";

const BASE_URL = "http://localhost:8080/api";

export const fetchData = async (endpoint, options = {}) => {
	try {
		const response = await fetch(`${BASE_URL}/${endpoint}`, options);
		return handleApiResponse(response);
	} catch (error) {
		throw error;
	}
};

export const postData = async (
	endpoint,
	method,
	data,
	options = {}
) => {
	try {
		const response = await fetch(`${BASE_URL}/${endpoint}`, {
			method: method,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
			...options,
		});
		return handleApiResponse(response);
	} catch (error) {
		throw error;
	}
};
