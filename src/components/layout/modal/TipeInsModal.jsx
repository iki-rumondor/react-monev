import React from "react";
import DefaultModal from "../../module/modal";
// import AddProdiForm from "../form/TipeInsForm";
// import AddTipeInsForm from "../form/TipeInsForm";

export function AddTipeInsModal({ idModal }) {
	return (
		<>
			<DefaultModal id={idModal}>
				<DefaultModal.Header title="Tambah Data Tipe Instrumen"/>
				<DefaultModal.Body>
					{/* <AddTipeInsForm/> */}
				</DefaultModal.Body>
				<DefaultModal.Footer name={"Tambah"}/>
			</DefaultModal>
		</>
	);
}
