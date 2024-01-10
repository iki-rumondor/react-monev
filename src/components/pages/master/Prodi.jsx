import React from "react";
import DashboardLayout from "../DashboardLayout";
import ProdiTable from "../../layout/table/ProdiTable";
import { ModalButton } from "../../units/Button";
import { AddProdiModal } from "../../layout/modal/ProdiModal";

export default function Prodi() {
	return (
		<>
			<DashboardLayout header={"Program Studi"}>
				<ModalButton className={"mb-3"} idModal={"addModal"}>
					Tambah Program Studi
				</ModalButton>
				<ProdiTable />
			</DashboardLayout>
			<AddProdiModal idModal={"addModal"} />
		</>
	);
}
