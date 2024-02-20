import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import useLoading from "../../../../hooks/useLoading";
import { postAPI } from "../../../../utils/Fetching";

export default function Update({ uuid, student_amount }) {
	const { setIsLoading, setIsSuccess } = useLoading();
	const [show, setShow] = useState(false);
	const defaultValue = {
		student_amount: student_amount,
		final_amount: "",
	};

	const [values, setValues] = useState(defaultValue);

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleSubmit = async () => {
		handleClose();
		try {
			setIsSuccess(false);
			setIsLoading(true);
			const res = await postAPI(
				`/api/last-monev/student-final/${uuid}`,
				"PATCH",
				values
			);
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
			<Button
				className="btn-sm"
				variant="primary"
				href="#"
				onClick={handleShow}
			>
				Update
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Update Data</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="final_amount">
						<Form.Label>
							Jumlah Mahasiswa Yang Ikut UAS
						</Form.Label>
						<Form.Control
							type="number"
							name="final_amount"
							value={values?.final_amount}
							onChange={handleChange}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSubmit}>
						Update
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
