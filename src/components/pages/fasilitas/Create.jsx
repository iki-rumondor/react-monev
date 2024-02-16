import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import useLoading from "../../hooks/useLoading";
import { postAPI } from "../../utils/Fetching";
import toast from "react-hot-toast";

export default function Create() {
	const { setIsLoading, setIsSuccess } = useLoading();
	const [show, setShow] = useState(false);
	const [values, setValues] = useState({
		name: "",
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		handleClose();
		try {
			setIsSuccess(false);
			setIsLoading(true);
			const res = await postAPI("/api/facilities", "POST", values);
			toast.success(res.message);
			setIsSuccess(true);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Button className="mb-3" variant="primary" onClick={handleShow}>
				Tambah Fasilitas
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Tambah Fasilitas</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="name">
						<Form.Label>Nama Fasilitas</Form.Label>
						<Form.Control
							name="name"
							value={values?.name}
							type="text"
							onChange={handleChange}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSubmit}>
						Tambah
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
