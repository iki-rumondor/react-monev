import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { postData } from "../../../services/api";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { fetchAPI } from "../../utils/Fetching";

export default function Create({ academic_year }) {
	const { setIsLoading, setIsSuccess, isSuccess } = useLoading();
	const [show, setShow] = useState(false);
	const [facilities, setfacilities] = useState(null);
	const [values, setValues] = useState({
		amount: "",
		unit: "",
		deactive: "",
		note: "",
		facility_uuid: "",
		academic_year_uuid: academic_year,
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleLoad = async () => {
		setValues({
			amount: "",
			unit: "",
			deactive: "",
			note: "",
			facility_uuid: "",
			academic_year_uuid: academic_year,
		});
		
		try {
			setIsLoading(true);
			const res = await fetchAPI(
				`/api/facility-conditions/years/${academic_year}/options`
			);
			setfacilities(res.data);
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
			const res = await postData("facility-conditions", "POST", values);
			toast.success(res.message);
			setIsSuccess(true);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		handleLoad();
	}, [isSuccess]);

	return (
		<>
			<Button className="mb-3" href="#" onClick={handleShow}>
				Tambah Data
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Tambah Data</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group controlId="facility_uuid" className="mb-3">
						<Form.Label>Fasilitas</Form.Label>
						<Form.Control
							as="select"
							name="facility_uuid"
							value={values.facility_uuid}
							onChange={handleChange}
						>
							<option value="" disabled>
								Pilih Fasilitas
							</option>
							{facilities &&
								facilities.map((item, idx) => (
									<option key={idx} value={item.uuid}>
										{item.name}
									</option>
								))}
						</Form.Control>
					</Form.Group>
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
							value={values.deactive}
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
							value={values.note}
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
