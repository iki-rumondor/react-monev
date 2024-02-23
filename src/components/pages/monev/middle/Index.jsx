import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { YearCard } from "./Card";
import DashboardLayout from "../../DashboardLayout";
import { fetchAPI } from "../../../utils/Fetching";
import useLoading from "../../../hooks/useLoading";

export default function MiddleMonev() {
	const { setIsLoading } = useLoading();
	const [years, setYears] = useState(null);

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const years = await fetchAPI("/api/academic-years");
			setYears(years.data);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleLoad();
	}, []);

	return (
		<>
			<DashboardLayout header={"Monev Tengah Semester"}>
				<Row>
					{years &&
						years.map((item, idx) => (
							<YearCard
								key={idx}
								data={item}
							/>
						))}
				</Row>
			</DashboardLayout>
		</>
	);
}
