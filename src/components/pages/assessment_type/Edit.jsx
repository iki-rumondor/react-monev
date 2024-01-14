import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { fetchData, postData } from "../../../services/api";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";

export default function EditAssessmentType({ uuid }) {
	const { setIsLoading } = useLoading();
	const [show, setShow] = useState(false);
	const [values, setValues] = useState({
		type: "",
	});

	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
		loadHandler();
	};

	const loadHandler = async () => {
		try {
			const res = await fetchData("assessments/type/" + uuid);
			setValues({
				type: res.data.type,
			});
		} catch (error) {
			toast.error(error.message);
		}
	};

	const postHandler = async () => {
		handleClose();
		try {
			setIsLoading(true);
			const res = await postData(
				"assessments/type/" + uuid,
				"PUT",
				values
			);
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
				className="text-warning"
				href="#"
				onClick={handleShow}
			>
				Edit
			</Dropdown.Item>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Edit Tipe Penilaian</Modal.Title>
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
						Ubah
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
