import React from "react";
import DashboardLayout from "../DashboardLayout";
import ProdiTable from "../../layout/table/ProdiTable";
import CreateProdi from "./CreateProdi";

export default function Prodi() {

	return (
		<>
			<DashboardLayout header={"Program Studi"}>
				<CreateProdi/>
				<ProdiTable />
			</DashboardLayout>
		</>
	);
}
