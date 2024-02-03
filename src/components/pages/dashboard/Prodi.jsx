import React, { useEffect, useState } from "react";
import { CardDashboard } from "./modules/Card";
import DashboardLayout from "../DashboardLayout";
import { BarChart } from "./modules/BarChart";
import { RadarChart } from "./modules/RadarChart";

export const ProdiDashboard = () => {
	return (
		<>
			<DashboardLayout header={"Selamat Datang"}>
				<div className="row">
					<CardDashboard
						title={"Jumlah Laboratorium"}
						value={"subjects.general"}
						icon="fa-book"
						color="success"
					/>
					<CardDashboard
						title={"Jumlah Dosen"}
						value={10}
						icon="fa-users"
						color="info"
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
					<RadarChart/>
					{/* <BarChart tipe={"radar"} /> */}
				</div>
			</DashboardLayout>
		</>
	);
};
