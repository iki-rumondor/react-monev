import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { CardDashboard } from "./modules/Card";
import { BarChart } from "./modules/BarChart";
import { fetchAPI } from "../../utils/Fetching";
import { SubjectInfo } from "./modules/Subjects";
import useLoading from "../../hooks/useLoading";

export const AdminDashboard = ({ role }) => {
	const { setIsLoading, isSuccess } = useLoading();
	const [values, setValues] = useState(null);

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI("/api/dashboards/subjects");
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
			<DashboardLayout header={"Selamat Datang Admin " + role}>
				<div className="row">
					<CardDashboard
						title={"Mata Kuliah"}
						value={
							<SubjectInfo
								all={values?.general}
								practical={values?.practical}
							/>
						}
						icon="fa-book"
					/>
					<CardDashboard
						title={"Jumlah Dosen"}
						value={10}
						icon="fa-users"
						color="success"
					/>
					<CardDashboard
						title={"Jumlah Laboratorium"}
						value={10}
						icon="fa-book"
						color="danger"
					/>
					<CardDashboard
						title={"Jumlah Dosen"}
						value={10}
						icon="fa-users"
						color="warning"
					/>
				</div>
				<div className="row">
					<BarChart tipe={"bar"} />
					<BarChart tipe={"radar"} />
				</div>
			</DashboardLayout>
		</>
	);
};
