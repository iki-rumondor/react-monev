import React, { useState } from "react";
import DashboardLayout from "../DashboardLayout";
import ProdiTable from "../../layout/table/ProdiTable";
import { Button, Modal } from "react-bootstrap";

export default function Prodi() {
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<>
			<DashboardLayout header={"Program Studi"}>
				<Button className="mb-3" variant="primary" onClick={handleShow}>
					Launch demo modal
				</Button>

				<ProdiTable />
			</DashboardLayout>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Tambah Program Studi</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Woohoo, you're reading this text in a modal!
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
