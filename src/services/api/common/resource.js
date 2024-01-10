
export const get = async (endpoint, options={}) => {
	try {
	  const result = await fetchData(`${USER_ENDPOINT}`);
	  return result;
	} catch (error) {
	  console.error('Error fetching user:', error);
	  throw error;
	}
  };
