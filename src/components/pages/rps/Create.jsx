import React, { useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { postData } from "../../../services/api";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";

export default function Create({subject_uuid, academic_year_uuid}) {
	const { setIsLoading } = useLoading();
	const [show, setShow] = useState(false);
	const [values, setValues] = useState({
		available: false,
		note: "",
		subject_uuid: subject_uuid,
		academic_year_uuid: academic_year_uuid,
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const postHandler = async () => {
		handleClose();
		try {
			setIsLoading(true);
			const res = await postData("academic-plans", "POST", values);
			toast.success(res.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Dropdown.Item
			className="text-primary"
				href="#"
				onClick={handleShow}
			>
				Lengkapi Data
			</Dropdown.Item>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Lengkapi Data</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group controlId="ketersediaan" className="mb-3">
						<Form.Label>Ketersediaan</Form.Label>
						<Form.Control
							as="select"
							value={values.available}
							onChange={(e) =>
								setValues({
									...values,
									available: e.target.value === "true",
								})
							}
						>
							<option value="true">Tersedia</option>
							<option value="false">Tidak Tersedia</option>
						</Form.Control>
					</Form.Group>

					<Form.Group controlId="note" className="mb-3">
						<Form.Label>Keterangan</Form.Label>
						<Form.Control
							as="textarea"
							rows={"3"}
							value={values.note}
							onChange={(e) =>
								setValues({
									...values,
									note: e.target.value,
								})
							}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={postHandler}>
						Tambah
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
