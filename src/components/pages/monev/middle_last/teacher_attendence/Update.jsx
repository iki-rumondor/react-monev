import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import useLoading from "../../../../hooks/useLoading";
import { postAPI } from "../../../../utils/Fetching";

export default function Update({ uuid }) {
	const { setIsLoading, setIsSuccess } = useLoading();
	const [show, setShow] = useState(false);
	const defaultValue = {
		last: "",
	};
	const percentages = ["70", "80", "90", "100"];

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
				`/api/middle-monev/last/teacher-attendences/${uuid}`,
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
					<Modal.Title>Lengkapi Data</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="last">
						<Form.Label>Presentasi Kehadiran</Form.Label>
						<Form.Control
							as="select"
							name="last"
							value={values?.last}
							onChange={handleChange}
						>
							<option value="" disabled>
								Pilih Presentasi Kehadiran
							</option>
							{percentages.map((item, idx) => (
								<option key={idx} value={item}>
									{`${item}%`}
								</option>
							))}
						</Form.Control>
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
