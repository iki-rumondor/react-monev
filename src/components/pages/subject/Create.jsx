import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { postData } from "../../../services/api";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";

export default function CreateSubject() {
	const { setIsLoading } = useLoading();
	const [show, setShow] = useState(false);
	const [values, setValues] = useState({
		name: "",
		code: "",
		practical: false,
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const postHandler = async () => {
		handleClose();
		try {
			setIsLoading(true);
			const res = await postData("subjects", "POST", values);
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
				Tambah Mata Kuliah
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Tambah Mata Kuliah</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="code">
						<Form.Label>Kode</Form.Label>
						<Form.Control
							value={values.code}
							type="text"
							placeholder="Masukkan Kode Mata Kuliah"
							onChange={(e) =>
								setValues({
									...values,
									code: e.target.value,
								})
							}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="name">
						<Form.Label>Nama</Form.Label>
						<Form.Control
							value={values.name}
							type="text"
							placeholder="Masukkan Nama Mata Kuliah"
							onChange={(e) =>
								setValues({
									...values,
									name: e.target.value,
								})
							}
						/>
					</Form.Group>
					<Form.Group controlId="jenis" className="mb-3">
						<Form.Label>Jenis Mata Kuliah</Form.Label>
						<Form.Control
							as="select"
							value={values.practical}
							onChange={(e) =>
								setValues({
									...values,
									practical: e.target.value === "true",
								})
							}
						>
							<option value="true">Praktikum</option>
							<option value="false">Umum</option>
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
