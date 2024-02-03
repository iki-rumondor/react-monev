import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import { CardDashboard } from "./modules/Card";
import { BarChart } from "./modules/BarChart";
import { useGetData } from "../../utils/Fetching";
import { SubjectInfo } from "./modules/Subjects";

export const AdminDashboard = ({ role }) => {
	const { res } = useGetData("/api/dashboards/subjects")
	return (
		<>
			<DashboardLayout header={"Selamat Datang Admin " + role}>
				<div className="row">
					<CardDashboard
						title={"Mata Kuliah"}
						value={<SubjectInfo all={res?.data?.general} practical={res?.data?.practical}/>}
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
