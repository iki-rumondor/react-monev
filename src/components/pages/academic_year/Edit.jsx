import React, { useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { fetchData, postData } from "../../../services/api";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";

export default function Edit({ uuid }) {
	const { setIsLoading } = useLoading();
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
	const handleShow = () => {
		setShow(true);
		loadHandler();
	};

	const loadHandler = async () => {
		try {
			const res = await fetchData("academic-years/" + uuid);
			setValues({
				year: res.data.year,
				semester: res.data.semester,
			});
		} catch (error) {
			toast.error(error.message);
		}
	};

	const postHandler = async () => {
		handleClose();
		try {
			setIsLoading(true);
			const res = await postData("academic-years/" + uuid, "PUT", values);
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
						Ubah
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
