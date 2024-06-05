import React, { useEffect, useState } from "react";
import { Button, Dropdown, Modal, Row } from "react-bootstrap";
import { fetchData, postData } from "../../../services/api";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { ListKeyValue } from "../../module/List";

export default function Detail({ uuid }) {
	const [show, setShow] = useState(false);
	const [value, setValues] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const loadHandler = async () => {
		try {
			const res = await fetchData("academic-plans/" + uuid);
			setValues(res.data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		loadHandler();
	}, []);

	return (
		<>
			<Dropdown.Item className="text-info" href="#" onClick={handleShow}>
				Detail
			</Dropdown.Item>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header className="bg-info text-white">
					<Modal.Title>Detail RPS</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<ListKeyValue
						keys={"Mata Kuliah"}
						value={value.subject?.name}
					/>
					<ListKeyValue
						keys={"Tersedia"}
						value={value.available ? "Ya" : "Tidak"}
					/>
					<ListKeyValue keys={"Keterangan"} value={value.note} />
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
