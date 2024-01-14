import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { postData } from "../../../services/api";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";

export default function CreateAssessmentType() {
	const { setIsLoading } = useLoading();
	const [show, setShow] = useState(false);
	const [values, setValues] = useState({
		type: "",
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const postHandler = async () => {
		handleClose();
		try {
			setIsLoading(true);
			const res = await postData("assessments/type", "POST", values);
			toast.success(res.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Button className="mb-3" variant="primary" onClick={handleShow}>
				Tambah Tipe Penilaian
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Tambah Tipe Penilaian</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="name">
						<Form.Label>Tipe</Form.Label>
						<Form.Control
							value={values.type}
							type="text"
							placeholder="Masukkan Tipe Penilaian"
							onChange={(e) =>
								setValues({
									...values,
									type: e.target.value,
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
