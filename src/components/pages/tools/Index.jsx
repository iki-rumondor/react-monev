import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import useLoading from "../../hooks/useLoading";
import { Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { fetchData } from "../../../services/api";
import { ToolsCard } from "./modules/Card";

export default function Tools() {
	const { setIsLoading } = useLoading();
	const [years, setYears] = useState(null);
	const [tools, setTools] = useState([]);

	const loadHandler = async () => {
		try {
			setIsLoading(true);
			const years = await fetchData("academic-years");
			setYears(years.data);
			const tools = await fetchData("subjects/practical");
			setTools(tools.data);
		} catch (error) {
			toast.error(error.message);
		}finally{
			setIsLoading(false)
		}
	};

	useEffect(() => {
		loadHandler();
	}, []);

	return (
		<>
			<DashboardLayout header={"Ketersediaan Alat Praktikum"}>
				<Row>
					{years && years.map((item, idx) => (
						<ToolsCard key={idx} data={item} totalTools={tools?.length ?? 0}/>
					))}
				</Row>
			</DashboardLayout>
		</>
	);
}
