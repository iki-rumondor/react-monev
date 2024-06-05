import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { CardDashboard } from "./modules/Card";
import { BarChart } from "./modules/BarChart";
import { fetchAPI } from "../../utils/Fetching";
import { SubjectInfo } from "./modules/Subjects";
import useLoading from "../../hooks/useLoading";
import toast from "react-hot-toast";

export const AdminDashboard = () => {
	const { setIsLoading, isSuccess } = useLoading();
	const [others, setOthers] = useState(null);
	const [values, setValues] = useState(null);

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI("/api/dashboards");
			const j_res = await fetchAPI("/api/majors");
			const d_res = await fetchAPI("/api/departments");
			setValues(res.data);
			setOthers({
				majors: j_res.data,
				departments: d_res.data,
			});
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
			<DashboardLayout header={"Selamat Datang Admin UPM Fakultas Teknik"}>
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
						title={"Jumlah Jurusan"}
						value={others?.majors?.length}
						icon="fa-building"
						color="success"
					/>
					<CardDashboard
						title={"Jumlah Tahun Ajaran"}
						value={values?.year}
						icon="fa-calendar-alt"
						color="danger"
					/>
					<CardDashboard
						title={"Jumlah Program Studi"}
						value={others?.departments?.length}
						icon="fa-user"
						color="warning"
					/>
				</div>
			</DashboardLayout>
		</>
	);
};
