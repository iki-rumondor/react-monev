import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";
import { fetchAPI, postAPI } from "../../utils/Fetching";

export default function Create({ academic_year_uuid }) {
	const { isSuccess, setIsLoading, setIsSuccess } = useLoading();
	const [subjects, setSubjects] = useState(null);
	const [show, setShow] = useState(false);
	const defaultValue = {
		condition: "",
		available: false,
		note: "",
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
			const res = await postAPI("/api/practical-tools", "POST", values);
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
			const s_res = await fetchAPI(
				`/api/subjects/tables/practical_tools/years/${academic_year_uuid}`
			);
			setSubjects(s_res?.data);
		} catch (error) {
			toast.error(error);
		}
	};

	useEffect(() => {
		loadHandler();
		if (!values.available) {
			setValues({
				...values,
				condition: "",
			});
		} else {
			setValues({
				...values,
				condition: "BAIK",
			});
		}
	}, [isSuccess, values.available]);

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
					<Form.Group controlId="ketersediaan" className="mb-3">
						<Form.Label>Ketersediaan</Form.Label>
						<Form.Control
							as="select"
							value={values.available}
							onChange={(e) => {
								setValues({
									...values,
									available: e.target.value == "true",
								});
							}}
						>
							<option value="false">Tidak Tersedia</option>
							<option value="true">Tersedia</option>
						</Form.Control>
					</Form.Group>
					{values.available && (
						<Form.Group controlId="condition" className="mb-3">
							<Form.Label>Kondisi</Form.Label>
							<Form.Control
								as="select"
								value={values.condition}
								onChange={(e) =>
									setValues({
										...values,
										condition: e.target.value,
									})
								}
							>
								<option>RUSAK</option>
								<option>BAIK</option>
							</Form.Control>
						</Form.Group>
					)}

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
