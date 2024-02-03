import useSWR from "swr";

const accessToken = sessionStorage.getItem("token");
const baseAPIUrl = "http://localhost:8080";
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

export const useGetData = (endpoint) => {
	const { data, error, isLoading } = useSWR(endpoint, fetcher);

	return {
		res: data,
		isLoading,
		isError: error,
	};
}
