import React from "react";
import DashboardLayout from "../DashboardLayout";
import { ModalButton } from "../../units/Button";
import TipeInsTable from "../../layout/table/TipeInsTable";
import { AddTipeInsModal } from "../../layout/modal/TipeInsModal";

export default function TipeInstrumen() {
	return (
		<>
			<DashboardLayout header={"Tipe Instrumen"}>
				<ModalButton className={"mb-3"} idModal={"addModal"}>
					Tambah Tipe Instrumen
				</ModalButton>
				<TipeInsTable/>
			</DashboardLayout>
			<AddTipeInsModal idModal={"addModal"} />
		</>
	);
}
