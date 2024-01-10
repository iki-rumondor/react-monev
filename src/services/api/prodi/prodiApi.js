import { fetchData } from '../api';

const USER_ENDPOINT = 'prodi';

export const getAllProdi = async () => {
  try {
    const result = await fetchData(`${USER_ENDPOINT}`);
    return result;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const createProdi = async (data) => {
	try {
		const result = await fetchData(`${USER_ENDPOINT}`, {
			
		});
		return result;
	  } catch (error) {
		console.error('Error fetching user:', error);
		throw error;
	  }
}
