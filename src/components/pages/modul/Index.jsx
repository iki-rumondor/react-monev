import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import useLoading from "../../hooks/useLoading";
import { Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { fetchData } from "../../../services/api";
import { ModulCard } from "./modules/Card";

export default function Modul() {
	const { setIsLoading } = useLoading();
	const [years, setYears] = useState(null);
	const [subjects, setSubjects] = useState([]);

	const loadHandler = async () => {
		try {
			setIsLoading(true);
			const years = await fetchData("academic-years");
			setYears(years.data);
			const subjects = await fetchData("subjects/practical");
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
			<DashboardLayout header={"Ketersediaan Modul Praktikum"}>
				<Row>
					{years && years.map((item, idx) => (
						<ModulCard key={idx} data={item} totalSubjects={subjects?.length ?? 0}/>
					))}
				</Row>
			</DashboardLayout>
		</>
	);
}
