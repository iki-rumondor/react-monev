import React, { useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { fetchAPI, postAPI } from "../../utils/Fetching";

export default function Edit({ uuid }) {
	const { setIsLoading, setIsSuccess } = useLoading();
	const [show, setShow] = useState(false);
	const [values, setValues] = useState({
		name: "",
	});

	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
		loadHandler();
	};

	const loadHandler = async () => {
		try {
			const res = await fetchAPI("/api/facilities/" + uuid);
			setValues({
				name: res.data.name,
			});
		} catch (error) {
			toast.error(error);
		}
	};

	const postHandler = async () => {
		handleClose();
		try {
			setIsSuccess(false);
			setIsLoading(true);
			const res = await postAPI("/api/facilities/" + uuid, "PUT", values);
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
					<Modal.Title>Edit Fasilitas</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="name">
						<Form.Label>Nama</Form.Label>
						<Form.Control
							value={values.name}
							type="text"
							placeholder="Masukkan Nama Fasilitas"
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
						Ubah
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
