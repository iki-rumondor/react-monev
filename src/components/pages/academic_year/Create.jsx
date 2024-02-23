import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { postData } from "../../../services/api";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";

export default function Create() {
	const { setIsLoading, setIsSuccess } = useLoading();
	const [show, setShow] = useState(false);
	const defaultValue = {
		semester: "",
		year: "",
	};
	const [values, setValues] = useState(defaultValue);

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const postHandler = async () => {
		handleClose();
		try {
			setIsLoading(true);
			setIsSuccess(false);
			const res = await postData("academic-years", "POST", values);
			toast.success(res.message);
			setIsSuccess(true);
			setValues(defaultValue);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Button className="mb-3" variant="primary" onClick={handleShow}>
				Tambah Tahun Ajaran
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Tambah Tahun Ajaran</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="year">
						<Form.Label>Tahun</Form.Label>
						<Form.Control
							value={values.year}
							name="year"
							type="text"
							placeholder="Masukkan Tahun"
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="semester">
						<Form.Label>Semester</Form.Label>
						<Form.Control
							as="select"
							name="semester"
							value={values?.semester}
							onChange={handleChange}
						>
							<option value="" disabled>
								Pilih Semester
							</option>
							<option>Genap</option>
							<option>Ganjil</option>
						</Form.Control>
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
