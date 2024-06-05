import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { fetchAPI, postAPI } from "../../../utils/Fetching";
import useLoading from "../../../hooks/useLoading";

export default function Create() {
	const { setIsSuccess, setIsLoading } = useLoading();
	const [show, setShow] = useState(false);
	const [roles, setRoles] = useState(null);

	const defaultValue = {
		username: "",
		password: "",
		role: "",
	};

	const [values, setValues] = useState(defaultValue);

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};
	const handleClose = () => setShow(false);
	const handleShow = async () => {
		setShow(true);
		try {
			setIsLoading(true);
			const role = await fetchAPI(`/api/users/roles`);
			console.log(role);
			setRoles(role.data);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async () => {
		handleClose();
		try {
			setIsSuccess(false);
			setIsLoading(true);
			const res = await postAPI("/api/users", "POST", values);
			toast.success(res.message);
			setIsSuccess(true);
			setValues(defaultValue);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Button className="mb-3" variant="primary" onClick={handleShow}>
				Tambah User
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Tambah Program Studi</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="role">
						<Form.Label>Role</Form.Label>
						<Form.Control
							as="select"
							name="role"
							value={values?.role}
							onChange={handleChange}
						>
							<option value="" disabled>
								Pilih Role Pengguna
							</option>
							{roles &&
								roles.map((item, idx) => (
									<option key={idx} value={item.uuid}>
										{item.name}
									</option>
								))}
						</Form.Control>
					</Form.Group>
					<Form.Group controlId="username" className="mb-3">
						<Form.Label>Username</Form.Label>
						<Form.Control
							type="text"
							name="username"
							value={values.username}
							onChange={handleChange}
						/>
						<small>Password Akan Dibuat Sama Dengan Username</small>
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
