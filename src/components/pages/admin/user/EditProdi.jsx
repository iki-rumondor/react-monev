import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { fetchData, postData } from "../../../services/api";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";

export default function EditProdi({ uuid }) {
	const { setIsLoading } = useLoading();
	const [show, setShow] = useState(false);
	const [jurusan, setJurusan] = useState([]);
	const [values, setValues] = useState({
		name: "",
		head: "",
		major_uuid: "",
	});

	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
		loadJurusan();
		loadProdi();
	};

	const loadJurusan = async () => {
		try {
			const res = await fetchData("majors");
			setJurusan(res.data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const loadProdi = async () => {
		try {
			const res = await fetchData("departments/" + uuid);
			setValues({
				name: res.data.name,
				head: res.data.head,
				major_uuid: res.data.major.uuid,
			});
		} catch (error) {
			toast.error(error.message);
		}
	};

	const postHandler = async () => {
		handleClose();
		try {
			setIsLoading(true);
			const res = await postData("departments/" + uuid, "PUT", values);
			toast.success(res.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Dropdown.Item className="text-warning" href="#" onClick={handleShow}>Edit</Dropdown.Item>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Edit Program Studi</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group className="mb-3" controlId="name">
						<Form.Label>Nama Program Studi</Form.Label>
						<Form.Control
							value={values.name}
							type="text"
							onChange={(e) =>
								setValues({
									...values,
									name: e.target.value,
								})
							}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="kaprodi">
						<Form.Label>Nama Koordinator Program Studi</Form.Label>
						<Form.Control
							value={values.head}
							type="text"
							onChange={(e) =>
								setValues({
									...values,
									head: e.target.value,
								})
							}
						/>
					</Form.Group>
					<Form.Group controlId="jurusan">
						<Form.Label>Jurusan</Form.Label>
						<Form.Control
							value={values.major_uuid}
							as="select"
							onChange={(e) =>
								setValues({
									...values,
									major_uuid: e.target.value,
								})
							}
						>
							<option disabled value={""}>
								Pilih Jurusan
							</option>
							{jurusan.length > 0 &&
								jurusan.map((item, idx) => (
									<option value={item.uuid} key={idx}>
										{item.name}
									</option>
								))}
						</Form.Control>
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
