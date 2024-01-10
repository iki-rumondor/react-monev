import { fetchData } from '../api';

const USER_ENDPOINT = 'jurusan';

export const getAllJurusan = async () => {
  try {
    const result = await fetchData(`${USER_ENDPOINT}`);
    return result;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};
