import { handleApiResponse } from './common/apiUtils';

const BASE_URL = 'http://localhost:8080/api';

export const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, options);
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postData = async (endpoint, data, method="POST", options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
		method: method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
		...options,
	});
    return handleApiResponse(response);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
