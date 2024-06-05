import React, { useEffect, useState } from "react";
import { Button, Form, FormControl, InputGroup, Modal } from "react-bootstrap";
import { postData } from "../../../services/api";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { StislaInput } from "../../layout/form/StislaInput";

export default function Create() {
	const { setIsLoading, setIsSuccess } = useLoading();
	const [show, setShow] = useState(false);
	const defaultValue = {
		semester: "",
		year: "",
		first_date: "",
		first_days: "",
		middle_date: "",
		middle_days: "",
		middle_last_date: "",
		middle_last_days: "",
		last_date: "",
		last_days: "",
	};

	const [values, setValues] = useState(defaultValue);

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
	};

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
					<div className="row ">
						<div className="col-sm-6">
							<Form.Group className="mb-3" controlId="first_date">
								<Form.Label>Monev Awal Semester</Form.Label>
								<Form.Control
									value={values.first_date}
									name="first_date"
									type="date"
									onChange={handleChange}
								/>
							</Form.Group>
						</div>
						<div className="col-sm-6">
							<Form.Group className="mb-3">
								<Form.Label>Waktu Pelaksanaan</Form.Label>
								<StislaInput
									name="first_days"
									type="number"
									end="Hari"
									value={values.first_days}
									onChange={handleChange}
								/>
							</Form.Group>
						</div>
					</div>
					<div className="row ">
						<div className="col-sm-6">
							<Form.Group
								className="mb-3"
								controlId="middle_date"
							>
								<Form.Label>Monev Tengah Semester</Form.Label>
								<Form.Control
									value={values.middle_date}
									name="middle_date"
									type="date"
									onChange={handleChange}
								/>
							</Form.Group>
						</div>
						<div className="col-sm-6">
							<Form.Group className="mb-3">
								<Form.Label>Waktu Pelaksanaan</Form.Label>
								<StislaInput
									name="middle_days"
									type="number"
									end="Hari"
									value={values.middle_days}
									onChange={handleChange}
								/>
							</Form.Group>
						</div>
					</div>
					<div className="row ">
						<div className="col-sm-6">
							<Form.Group
								className="mb-3"
								controlId="middle_last_date"
							>
								<Form.Label>Monev Sebelum UAS</Form.Label>
								<Form.Control
									value={values.middle_last_date}
									name="middle_last_date"
									type="date"
									onChange={handleChange}
								/>
							</Form.Group>
						</div>
						<div className="col-sm-6">
							<Form.Group className="mb-3">
								<Form.Label>Waktu Pelaksanaan</Form.Label>
								<StislaInput
									name="middle_last_days"
									type="number"
									end="Hari"
									value={values.middle_last_days}
									onChange={handleChange}
								/>
							</Form.Group>
						</div>
					</div>
					<div className="row ">
						<div className="col-sm-6">
							<Form.Group
								className="mb-3"
								controlId="last_date"
							>
								<Form.Label>Monev Setelah UAS</Form.Label>
								<Form.Control
									value={values.last_date}
									name="last_date"
									type="date"
									onChange={handleChange}
								/>
							</Form.Group>
						</div>
						<div className="col-sm-6">
							<Form.Group className="mb-3">
								<Form.Label>Waktu Pelaksanaan</Form.Label>
								<StislaInput
									name="last_days"
									type="number"
									end="Hari"
									value={values.last_days}
									onChange={handleChange}
								/>
							</Form.Group>
						</div>
					</div>
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
