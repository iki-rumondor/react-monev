import React, { useEffect, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import { Row } from "react-bootstrap";
import useLoading from "../../../hooks/useLoading";
import { YearCard } from "../../../layout/cards/YearCard";
import toast from "react-hot-toast";
import { fetchAPI } from "../../../utils/Fetching";

export const YearMonitoring = () => {
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
			<DashboardLayout header={"Grafik Hasil Monitoring"}>
				<Row>
					{years &&
						years.map((item, idx) => (
							<YearCard
								key={idx}
								name={item.name}
								status={item.status}
								link={`/monitoring/years/${item.uuid}`}
							/>
						))}
				</Row>
			</DashboardLayout>
		</>
	);
};
