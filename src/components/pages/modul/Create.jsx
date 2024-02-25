import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { fetchAPI, postAPI } from "../../utils/Fetching";

export default function Create({ academic_year_uuid }) {
	const { isSuccess, setIsLoading, setIsSuccess } = useLoading();
	const [show, setShow] = useState(false);
	const [labs, setLabs] = useState(null);
	const [subjects, setSubjects] = useState(null);
	const defaultValue = {
		available: false,
		note: "",
		laboratory_uuid: "",
		subject_uuid: "",
		academic_year_uuid: academic_year_uuid,
	};

	const [values, setValues] = useState(defaultValue);

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const postHandler = async () => {
		handleClose();
		try {
			setIsSuccess(false);
			setIsLoading(true);
			const res = await postAPI("/api/practical-modules", "POST", values);
			toast.success(res.message);
			setIsSuccess(true);
			setValues(defaultValue);
		} catch (error) {
			toast.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const loadHandler = async () => {
		try {
			const res = await fetchAPI("/api/laboratories");
			setLabs(res.data);
			const s_res = await fetchAPI(
				`/api/subjects/tables/practical_modules/years/${academic_year_uuid}`
			);
			setSubjects(s_res.data);
		} catch (error) {
			toast.error(error);
		}
	};

	useEffect(() => {
		loadHandler();
	}, [isSuccess]);

	return (
		<>
			<Button className="mb-3" onClick={handleShow}>
				Lengkapi Data
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
					<Form.Group className="mb-3" controlId="subject">
						<Form.Label>Mata Kuliah</Form.Label>
						<Form.Control
							as="select"
							name="subject_uuid"
							value={values?.subject_uuid}
							onChange={handleChange}
						>
							<option value="" disabled>
								Pilih Mata Kuliah
							</option>
							{subjects &&
								subjects.map((item, idx) => {
									if (item.practical) {
										return (
											<option key={idx} value={item.uuid}>
												{item.name}
											</option>
										);
									}
								})}
						</Form.Control>
					</Form.Group>
					<Form.Group controlId="labs" className="mb-3">
						<Form.Label>Laboratorium</Form.Label>
						<Form.Control
							as="select"
							value={values.laboratory_uuid}
							onChange={(e) =>
								setValues({
									...values,
									laboratory_uuid: e.target.value,
								})
							}
						>
							<option value="" disabled>
								Pilih Laboratorium
							</option>
							{labs &&
								labs.map((item, idx) => (
									<option key={idx} value={item.uuid}>
										{item.name}
									</option>
								))}
						</Form.Control>
					</Form.Group>

					<Form.Group controlId="ketersediaan" className="mb-3">
						<Form.Label>Ketersediaan</Form.Label>
						<Form.Control
							as="select"
							value={values.available}
							onChange={(e) =>
								setValues({
									...values,
									available: e.target.value === "true",
								})
							}
						>
							<option value="true">Tersedia</option>
							<option value="false">Tidak Tersedia</option>
						</Form.Control>
					</Form.Group>

					<Form.Group controlId="note" className="mb-3">
						<Form.Label>Keterangan</Form.Label>
						<Form.Control
							as="textarea"
							rows={"3"}
							value={values.note}
							onChange={(e) =>
								setValues({
									...values,
									note: e.target.value,
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
}
