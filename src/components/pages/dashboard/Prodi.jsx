import React, { useEffect, useState } from "react";
import { CardDashboard } from "./modules/Card";
import DashboardLayout from "../DashboardLayout";
import { BarChart } from "./modules/BarChart";
import { RadarChart } from "./modules/RadarChart";
import { getUserUuid } from "../../../services/utils";
import useLoading from "../../hooks/useLoading";
import toast from "react-hot-toast";
import { fetchAPI } from "../../utils/Fetching";
import moment from "moment";
import { StislaAlert } from "../../layout/alert/StislaAlert";

export const ProdiDashboard = () => {
	const { setIsLoading } = useLoading();
	const uuid = getUserUuid();
	const [values, setValues] = useState(null);
	const [data, setData] = useState(null);
	const [year, setYear] = useState(null);

	const handleLoad = async () => {
		try {
			setIsLoading(true);
			const res = await fetchAPI("/api/users/" + uuid);
			setValues(res.data);
			const s_res = await fetchAPI("/api/subjects");
			const t_res = await fetchAPI("/api/teachers");
			setData({
				...data,
				subject: s_res?.data?.length,
				teacher: t_res?.data?.length,
			});
			const res3 = await fetchAPI("/api/academic-years/current");
			setYear(res3.data);
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
					<div className="col-12">
						<StislaAlert year={year} />
					</div>
				</div>
				<div className="row">
					<CardDashboard
						title={"Tanggal"}
						value={moment().format("DD MMM YYYY")}
						icon="fa-calendar-alt"
						color="success"
					/>
					<CardDashboard
						title={"Koordinator Program Studi"}
						value={values?.head}
						icon="fa-user"
						color="info"
					/>
					<CardDashboard
						title={"Jumlah Mata Kuliah"}
						value={data?.subject ?? 0}
						icon="fa-book"
						color="danger"
					/>
					<CardDashboard
						title={"Jumlah Dosen"}
						value={data?.teacher ?? 0}
						icon="fa-users"
						color="warning"
					/>
				</div>
			</DashboardLayout>
		</>
	);
};
