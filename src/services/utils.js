export const handleApiResponse = async (response) => {
	if (!response.ok) {
	  const error = await response.json();
	  throw new Error(error.message || 'Something went wrong');
	}

	return response.json();
  };
