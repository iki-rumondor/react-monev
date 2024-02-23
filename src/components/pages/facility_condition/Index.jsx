import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import useLoading from "../../hooks/useLoading";
import { Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { AcademicCard } from "./modules/Card";
import { fetchAPI } from "../../utils/Fetching";

export default function FacilityCondition() {
	const { setIsLoading } = useLoading();
	const [years, setYears] = useState(null);

	const loadHandler = async () => {
		try {
			setIsLoading(true);
			const years = await fetchAPI("/api/academic-years");
			setYears(years.data);
		} catch (error) {
			toast.error(error);
		}finally{
			setIsLoading(false)
		}
	};

	useEffect(() => {
		loadHandler();
	}, []);

	return (
		<>
			<DashboardLayout header={"Kondisi Fasilitas, Sarana, dan Prasarana"}>
				<Row>
					{years && years.map((item, idx) => (
						<AcademicCard key={idx} data={item}/>
					))}
				</Row>
			</DashboardLayout>
		</>
	);
}
