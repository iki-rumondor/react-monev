import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { fetchData, postData } from "../../../services/api";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";

export const CreateAssessmentQuestion = () => {
	const { setIsLoading } = useLoading();
	const [show, setShow] = useState(false);
	const [type, setType] = useState(null);
	const [values, setValues] = useState({
		question: "",
		type_uuid: "",
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const loadHandler = async () => {
		try {
			const res = await fetchData("assessments/type");
			setType(res.data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const postHandler = async () => {
		handleClose();
		try {
			setIsLoading(true);
			const res = await postData("assessments/question", "POST", values);
			toast.success(res.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadHandler();
	}, []);

	return (
		<>
			<Button className="mb-3" variant="primary" onClick={handleShow}>
				Tambah Pertanyaan
			</Button>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Tambah Pertanyaan</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="type_uuid">
						<Form.Label>Tipe Penilaian</Form.Label>
						<Form.Control
							value={values.type_uuid}
							as="select"
							onChange={(e) =>
								setValues({
									...values,
									type_uuid: e.target.value,
								})
							}
						>
							<option disabled value={""}>
								Pilih Tipe Penilaian
							</option>
							{type &&
								type.map((item, idx) => (
									<option value={item.uuid} key={idx}>
										{item.type}
									</option>
								))}
						</Form.Control>
					</Form.Group>
					<Form.Group controlId="question">
						<Form.Label>Pertanyaan</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							value={values.question}
							placeholder="Tuliskan Pertanyaan"
							onChange={(e) =>
								setValues({
									...values,
									question: e.target.value,
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
};
