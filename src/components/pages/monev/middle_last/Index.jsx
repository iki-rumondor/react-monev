import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import toast from "react-hot-toast";
import DashboardLayout from "../../DashboardLayout";
import { fetchAPI } from "../../../utils/Fetching";
import useLoading from "../../../hooks/useLoading";
import { YearCard } from "../../../layout/cards/YearCard";
import { formatDateRange } from "../../../utils/Helpers";

export default function MiddleLastMonev() {
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
			<DashboardLayout header={"Monev Akhir Sebelum UAS"}>
				<Row>
					{years &&
						years.map((item, idx) => (
							<YearCard
								key={idx}
								name={item.name}
								link={`/middle-last-monev/years/${item.uuid}`}
								open={item.status == "3"}
								status={formatDateRange(item.middle_last_range)}
							/>
						))}
				</Row>
			</DashboardLayout>
		</>
	);
}
