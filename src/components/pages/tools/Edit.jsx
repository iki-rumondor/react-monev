import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { fetchData, postData } from "../../../services/api";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";

export default function Edit({ uuid }) {
	const { setIsLoading } = useLoading();
	const [show, setShow] = useState(false);
	const [values, setValues] = useState({
		condition: "",
		available: false,
		note: "",
	});

	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
		loadHandler();
	};

	const loadHandler = async () => {
		try {
			const res = await fetchData("practical-tools/" + uuid);
			setValues({
				condition: res.data.condition,
				available: res.data.available,
				note: res.data.note,
			});
		} catch (error) {
			toast.error(error.message);
		}
	};

	const postHandler = async () => {
		handleClose();
		try {
			setIsLoading(true);
			const res = await postData("practical-tools/" + uuid, "PUT", values);
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
						Ubah
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
