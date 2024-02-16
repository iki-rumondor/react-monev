import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { fetchAPI, postAPI } from "../../utils/Fetching";

export default function Edit({ uuid }) {
	const { setIsLoading, setIsSuccess } = useLoading();
	const [show, setShow] = useState(false);
	const [values, setValues] = useState(null);

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleLoad = async () => {
		try {
			const res = await fetchAPI("/api/facility-conditions/" + uuid);
			setValues({
				amount: res.data.amount,
				unit: res.data.unit,
				deactive: res.data.deactive,
				note: res.data.note,
			});
		} catch (error) {
			toast.error(error.message);
		}
	};

	const handleSubmit = async () => {
		handleClose();
		try {
			setIsSuccess(false);
			setIsLoading(true);
			const res = await postAPI(
				"/api/facility-conditions/" + uuid,
				"PUT",
				values
			);
			toast.success(res.message);
			setIsSuccess(true);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		handleLoad();
	}, []);

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
					<Modal.Title>Edit RPS</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col sm={6}>
							<Form.Group className="mb-3" controlId="amount">
								<Form.Label>Jumlah</Form.Label>
								<Form.Control
									name="amount"
									value={values?.amount}
									type="number"
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
						<Col sm={6}>
							<Form.Group className="mb-3" controlId="unit">
								<Form.Label>Satuan</Form.Label>
								<Form.Control
									name="unit"
									value={values?.unit}
									type="text"
									onChange={handleChange}
								/>
							</Form.Group>
						</Col>
					</Row>
					<Form.Group controlId="deactive" className="mb-3">
						<Form.Label>Jumlah Tidak Berfungsi</Form.Label>
						<Form.Control
							name="deactive"
							value={values?.deactive}
							type="number"
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group controlId="note" className="mb-3">
						<Form.Label>Keterangan</Form.Label>
						<Form.Control
							name="note"
							as="textarea"
							rows={"3"}
							value={values?.note}
							onChange={handleChange}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleSubmit}>
						Ubah
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
