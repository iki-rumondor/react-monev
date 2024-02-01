import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import useLoading from "../../hooks/useLoading";
import { Card, CardBody, Row, Table } from "react-bootstrap";
import toast from "react-hot-toast";
import { fetchData } from "../../../services/api";
import { Actions } from "./modules/Actions";
import { RPSCard } from "./modules/Card";

export default function RPS() {
	const { setIsLoading } = useLoading();
	const [years, setYears] = useState(null);
	const [subjects, setSubjects] = useState([]);

	const loadHandler = async () => {
		try {
			setIsLoading(true);
			const years = await fetchData("academic-years");
			setYears(years.data);
			const subjects = await fetchData("subjects");
			setSubjects(subjects.data);
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
			<DashboardLayout header={"Ketersediaan RPS"}>
				<Row>
					{years && years.map((item, idx) => (
						<RPSCard key={idx} data={item} totalSubjects={subjects.length}/>
					))}
				</Row>
			</DashboardLayout>
		</>
	);
}
