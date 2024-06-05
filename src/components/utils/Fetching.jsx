import axios from "axios";
import useSWR from "swr";

const accessToken = sessionStorage.getItem("token");
const baseAPIUrl = "http://localhost:8081";

const fetcher = async (url) => {
	const response = await fetch(`${baseAPIUrl}${url}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
	});
	const data = await response.json();
	return data;
};

export const postFile = async (endpoint, method, data) => {
	try {
		const response = await axios({
			method,
			url: `${baseAPIUrl}${endpoint}`,
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "multipart/form-data",
			},
			data: data,
		});
		return response.data;
	} catch (error) {
		throw error.response ? error.response.data.message : error.message;
	}
};

export const postAPI = async (endpoint, method, data = null) => {
	try {
		const response = await axios({
			method,
			url: `${baseAPIUrl}${endpoint}`,
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			data: data,
		});
		return response.data;
	} catch (error) {
		throw error.response?.data?.message ?? error?.message;
	}
};

export const deleteAPI = async (endpoint) => {
	try {
		const response = await axios({
			method: "DELETE",
			url: `${baseAPIUrl}${endpoint}`,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	} catch (error) {
		throw error.response?.data?.message ?? error?.message;
	}
};

export const fetchAPI = async (endpoint) => {
	try {
		const response = await axios({
			method: "GET",
			url: `${baseAPIUrl}${endpoint}`,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		return response?.data;
	} catch (error) {
		if (error.response?.data?.message == undefined) {
			throw error.message;
		} else {
			throw error.response?.data?.message ?? error?.message;
		}
	}
};

export const fetchPdf = async (endpoint) => {
	try {
		const response = await axios({
			method: "GET",
			url: `${baseAPIUrl}${endpoint}`,
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/pdf",
			},
			responseType: "blob",
		});
		const url = window.URL.createObjectURL(response.data);
		window.open(url, "_blank");
	} catch (error) {
		if (error.response?.data?.message == undefined) {
			throw error.message;
		} else {
			throw error.response?.data?.message ?? error?.message;
		}
	}
};

export const useGetData = (endpoint) => {
	const { data, error, isLoading } = useSWR(endpoint, fetcher);
	return {
		res: data?.data,
		isLoading,
		isError: error,
	};
};
