import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { CardDashboard } from "./modules/Card";
import { fetchAPI } from "../../utils/Fetching";
import { SubjectInfo } from "./modules/Subjects";
import useLoading from "../../hooks/useLoading";
import toast from "react-hot-toast";

export const HeadDashboard = () => {
	const { setIsLoading, isSuccess } = useLoading();
	const [values, setValues] = useState(null);

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
			<DashboardLayout header={"Selamat Datang Kepala UPM Fakultas Teknik"}>
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
						value={values?.majors}
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
						value={values?.departments}
						icon="fa-user"
						color="warning"
					/>
				</div>
			</DashboardLayout>
		</>
	);
};
