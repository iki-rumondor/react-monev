import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { CardDashboard } from "./modules/Card";
import { BarChart } from "./modules/BarChart";
import { fetchAPI } from "../../utils/Fetching";
import { SubjectInfo } from "./modules/Subjects";
import useLoading from "../../hooks/useLoading";

export const AdminDashboard = () => {
	const { setIsLoading, isSuccess } = useLoading();
	const [values, setValues] = useState(null);
	const steps = [
		"Monev Awal Semester",
		"Monev Tengah Semester",
		"Monev Sebelum UAS",
		"Monev Setelah UAS",
	];

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI("/api/dashboards");
			setValues(res.data);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleLoad();
	}, [isSuccess]);

	return (
		<>
			<DashboardLayout header={"Selamat Datang Admin"}>
				<div className="row">
					<CardDashboard
						title={"Jumlah Mata Kuliah"}
						value={
							<SubjectInfo
								all={values?.g_subject}
								practical={values?.p_subject}
							/>
						}
						icon="fa-book"
					/>
					<CardDashboard
						title={"Status Monev"}
						value={steps[values?.step - 1]}
						icon="fa-users"
						color="success"
					/>
					<CardDashboard
						title={"Jumlah Tahun Ajaran"}
						value={values?.year}
						icon="fa-book"
						color="danger"
					/>
					<CardDashboard
						title={"Jumlah Dosen"}
						value={values?.teacher}
						icon="fa-users"
						color="warning"
					/>
				</div>
			</DashboardLayout>
		</>
	);
};
