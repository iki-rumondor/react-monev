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
		nama: "",
		kaprodi: "",
		jurusan: "",
	});

	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
		loadJurusan();
		loadProdi();
	};

	const loadJurusan = async () => {
		try {
			const res = await fetchData("jurusan");
			setJurusan(res.data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	const loadProdi = async () => {
		try {
			const res = await fetchData("prodi/" + uuid);
			setValues({
				nama: res.nama,
				kaprodi: res.kaprodi,
				jurusan: res.jurusan.id.toString(),
			});
		} catch (error) {
			toast.error(error.message);
		}
	};

	const postHandler = async () => {
		handleClose();
		try {
			setIsLoading(true);
			const res = await postData("prodi/" + uuid, "PUT", values);
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
							value={values.nama}
							type="text"
							placeholder="Masukkan Nama Program Studi"
							onChange={(e) =>
								setValues({
									...values,
									nama: e.target.value,
								})
							}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="kaprodi">
						<Form.Label>Nama Ketua Program Studi</Form.Label>
						<Form.Control
							value={values.kaprodi}
							type="text"
							placeholder="Masukkan Nama Ketua Program Studi"
							onChange={(e) =>
								setValues({
									...values,
									kaprodi: e.target.value,
								})
							}
						/>
					</Form.Group>
					<Form.Group controlId="jurusan">
						<Form.Label>Jurusan</Form.Label>
						<Form.Control
							value={values.jurusan}
							as="select"
							onChange={(e) =>
								setValues({
									...values,
									jurusan: e.target.value,
								})
							}
						>
							<option disabled value={""}>
								Pilih Jurusan
							</option>
							{jurusan.length > 0 &&
								jurusan.map((item, idx) => (
									<option value={item.id} key={idx}>
										{item.nama}
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
