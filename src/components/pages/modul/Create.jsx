import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { fetchData, postData } from "../../../services/api";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";

export default function Create({ subject_uuid, academic_year_uuid }) {
	const { setIsLoading } = useLoading();
	const [show, setShow] = useState(false);
	const [labs, setLabs] = useState(null);
	const [values, setValues] = useState({
		available: false,
		note: "",
		laboratory_uuid: "",
		subject_uuid: subject_uuid,
		academic_year_uuid: academic_year_uuid,
	});

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const postHandler = async () => {
		handleClose();
		try {
			setIsLoading(true);
			const res = await postData("practical-modules", "POST", values);
			toast.success(res.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const loadHandler = async () => {
		try {
			const res = await fetchData("laboratories");
			setLabs(res.data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		loadHandler();
	}, []);

	return (
		<>
			<Dropdown.Item
				className="text-primary"
				href="#"
				onClick={handleShow}
			>
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
							<option value="" disabled>Pilih Laboratorium</option>
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
