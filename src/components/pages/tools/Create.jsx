import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { postData } from "../../../services/api";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";

export default function Create({ subject_uuid, academic_year_uuid }) {
	const { setIsLoading } = useLoading();
	const [show, setShow] = useState(false);
	const [values, setValues] = useState({
		condition: "",
		available: false,
		note: "",
		subject_uuid: subject_uuid,
		academic_year_uuid: academic_year_uuid,
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const postHandler = async () => {
		handleClose();
		try {
			setIsLoading(true);
			const res = await postData("practical-tools", "POST", values);
			toast.success(res.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!values.available){
			setValues({
				...values,
				condition: ""
			})
		}else{
			setValues({
				...values,
				condition: "RUSAK"
			})
		}

	}, [values.available])

	return (
		<>
			<Dropdown.Item href="#" onClick={handleShow}>
				Lengkapi Data
			</Dropdown.Item>

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
					<Form.Group controlId="ketersediaan" className="mb-3">
						<Form.Label>Ketersediaan</Form.Label>
						<Form.Control
							as="select"
							value={values.available}
							onChange={(e) =>
								setValues({
									...values,
									available: e.target.value == "true",
								})
							}
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
