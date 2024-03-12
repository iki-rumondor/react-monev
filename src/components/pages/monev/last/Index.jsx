import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import toast from "react-hot-toast";
import DashboardLayout from "../../DashboardLayout";
import { fetchAPI } from "../../../utils/Fetching";
import useLoading from "../../../hooks/useLoading";
import { YearCard } from "../../../layout/cards/YearCard";
import { formatDateRange } from "../../../utils/Helpers";

export default function LastMonev() {
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
			<DashboardLayout header={"Monev Akhir Semester Setelah UAS"}>
				<Row>
					{years &&
						years.map((item, idx) => (
							<YearCard
								key={idx}
								name={item.name}
								link={`/last-monev/years/${item.uuid}`}
								open={item.status == "4"}
								status={formatDateRange(item.last_range)}
							/>
						))}
				</Row>
			</DashboardLayout>
		</>
	);
}
