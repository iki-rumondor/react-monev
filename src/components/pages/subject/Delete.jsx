import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { fetchData, postData } from "../../../services/api";
import toast from "react-hot-toast";
import useLoading from "../../hooks/useLoading";

export default function DeleteSubject({ uuid }) {
	const { setIsLoading } = useLoading();
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const postHandler = async () => {
		handleClose();
		try {
			setIsLoading(true);
			const res = await postData("subjects/" + uuid, "DELETE");
			toast.success(res.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Dropdown.Item
				className="text-danger"
				href="#"
				onClick={handleShow}
			>
				Hapus
			</Dropdown.Item>

			<Modal
				show={show}
				onHide={handleClose}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title>Hapus Tipe Penilaian</Modal.Title>
				</Modal.Header>
				<Modal.Body>Tekan Hapus Untuk Melanjutkan</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="danger" onClick={postHandler}>
						Hapus
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
