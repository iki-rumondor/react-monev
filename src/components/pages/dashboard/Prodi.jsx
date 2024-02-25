import React, { useEffect, useState } from "react";
import { CardDashboard } from "./modules/Card";
import DashboardLayout from "../DashboardLayout";
import { BarChart } from "./modules/BarChart";
import { RadarChart } from "./modules/RadarChart";
import { getUserUuid } from "../../../services/utils";
import useLoading from "../../hooks/useLoading";
import toast from "react-hot-toast";
import { fetchAPI } from "../../utils/Fetching";

export const ProdiDashboard = () => {
	const { setIsLoading } = useLoading();
	const uuid = getUserUuid();
	const [values, setValues] = useState(null);

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI("/api/users/" + uuid);
			setValues(res.data);
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
			<DashboardLayout
				header={`Selamat Datang, Koordinator Prodi ${values?.name}`}
			>
				<div className="row">
					<CardDashboard
						title={"Status"}
						value={"Monev Awal Semester"}
						icon="fa-book"
						color="success"
					/>
					<CardDashboard
						title={"Koordinator Program Studi"}
						value={values?.head}
						icon="fa-users"
						color="info"
					/>
					<CardDashboard
						title={"Jumlah Mata Kuliah"}
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
			</DashboardLayout>
		</>
	);
};
