import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import useLoading from "../../hooks/useLoading";
import { Card, CardBody, Row, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { fetchData } from "../../../services/api";
import { Actions } from "./modules/Actions";
import { RPSCard } from "./modules/Card";

export default function Tools() {
	const { setIsLoading } = useLoading();
	const [years, setYears] = useState(null);
	const [tools, setTools] = useState([]);

	const loadHandler = async () => {
		try {
			setIsLoading(true);
			const years = await fetchData("academic-years");
			setYears(years.data);
			const tools = await fetchData("tools");
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
						<RPSCard key={idx} data={item} totalSubjects={tools.length}/>
					))}
				</Row>
			</DashboardLayout>
		</>
	);
}
