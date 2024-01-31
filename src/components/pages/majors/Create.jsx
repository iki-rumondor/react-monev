import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { fetchData, postData } from "../../../services/api";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";

export const CreateMajor = () => {
	const { setIsLoading } = useLoading();
	const [show, setShow] = useState(false);
	const [values, setValues] = useState({
		name: "",
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const postHandler = async () => {
		handleClose();
		try {
			setIsLoading(true);
			const res = await postData("majors", "POST", values);
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
				Tambah Jurusan
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Tambah Jurusan</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group controlId="name">
						<Form.Label>Nama Jurusan</Form.Label>
						<Form.Control
							type="text"
							value={values.name}
							placeholder="Nama Jurusan"
							onChange={(e) =>
								setValues({
									...values,
									name: e.target.value,
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
};
