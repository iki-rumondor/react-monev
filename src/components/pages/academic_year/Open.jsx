import React from "react";
import { Dropdown } from "react-bootstrap";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { postAPI } from "../../utils/Fetching";

export default function Open({ uuid, value }) {
	const { setIsLoading, setIsSuccess } = useLoading();
	const handleClick = async () => {
		try {
			setIsSuccess(false);
			setIsLoading(true);
			const res = await postAPI(`/api/academic-years/${uuid}/open`, "PATCH", {
				open: !value
			});
			toast.success(res.message);
			setIsSuccess(true);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Dropdown.Item className="text-info" href="#" onClick={handleClick}>
				{value ? "Tutup" : "Buka"}
			</Dropdown.Item>
		</>
	);
}
